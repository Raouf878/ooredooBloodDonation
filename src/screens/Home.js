import React, { useEffect, useState,useRef } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { selectLoadingStates } from '../redux/slices/Credentials';
import Header from '../components/Home/Header';
import Body from '../components/Home/Body';
import { geohashForLocation, geohashQueryBounds, distanceBetween } from 'geofire-common';
import RecentActivity from '../components/Home/RecentActivity';
import { getUserLat,getUserLon } from '../redux/slices/Location';
import CircleSkeleton from '../components/Skeletons/CircleSkeleton';
import * as Notifications from 'expo-notifications';
const Home = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(null);
  const notificationListener = useRef();
  const userLat = useSelector(getUserLat);
  const userLon = useSelector(getUserLon)
  const responseListener = useRef();
  Notifications.setNotificationHandler({
    handleNotification: async (notification) => {
        console.log('Notification received:', notification); // Ensure notification is received

        const shouldShow =shouldShowNotification(notification); // Call shouldShowNotification
        console.log('Should show notification:', shouldShow); // Log the result

        if (shouldShow) {
            // If the notification should be shown, return appropriate settings
            return {
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
            };
        } else {
            // If the notification should not be shown, return appropriate settings
            return {
                shouldShowAlert: false,
                shouldPlaySound: false,
                shouldSetBadge: false,
            };
        }
    },
});
const shouldShowNotification = (notification) => {
  console.log('rghjmlk');
    const radiusInM = 5 * 1000// 100 kilometers
  let isValid=false
    // Assuming notification contains lat and lon properties
    if (!notification || !notification.request || !notification.request.content || !notification.request.content.data) {
      console.log('eeeeeeeeeeeeeeee');
        return false; // Invalid notification format
    }
    const { lat, lon } = notification.request.content.data;
    // Get user's latitude and longitude from Redux state
    // Calculate distance between notification location and user's location
    const bounds = geohashQueryBounds([userLat, userLon], radiusInM);
    console.log('d:f;lmsdfd',bounds);
    // Calculate distance between notification location and user's location
    for (const b of bounds) {
      console.log(userLat);
      const distanceInKm = distanceBetween([lat, lon], [userLat, userLon]);
      const distanceInM = distanceInKm * 1000;
      console.log(distanceInM)
     if (distanceInM <= radiusInM) {
      isValid=true
      console.log("kfdkfldsf");
    }else{
      isValid=false
    }
    

    // Check if the distance is within the radius
  }
  return isValid
};
useEffect(() => {
    
  

  notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    console.log('Notification received:', notification);
    setNotification(notification);
  });

  responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    console.log('Notification response received:', response);
  });

  return () => {
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
  };
}, []);
  return (
    
    <SafeAreaView style={styles.container}>
          <Header />
          <Body />
          <RecentActivity />

    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8, // Adjust padding as needed
  },
});
