import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import { Actionsheet } from "native-base";
import Mapbox, { LineLayer, LocationPuck, ShapeSource } from '@rnmapbox/maps'
import { useSelector } from 'react-redux';
import { getUserLat, getUserLon } from '../../redux/slices/Location';
import { PointAnnotation } from '@rnmapbox/maps';
import { collection, query, where, onSnapshot,updateDoc,doc,getDocs } from 'firebase/firestore'
import { SafeAreaView } from 'react-native-safe-area-context';
import { GeoPoint } from 'firebase/firestore';
import { db } from '../../../FirebaseConfig'
import CustomButton from '../Buttons/GradientButton';
import { Badge } from 'native-base';
import TruncatedText from '../../utils/TruncatedText';
import * as polyline from '@mapbox/polyline'
import { geohashForLocation, geohashQueryBounds, distanceBetween } from 'geofire-common';
import BloodrequestsSkeleton from '../Skeletons/BloodrequestsSkeleton';
import BoxxCarousel from '../Box/BoxxCarousel';
import { Dimensions } from 'react-native';
import { Directions } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { selectUserId, selectedBloodType } from '../../redux/slices/Credentials';
import { selectedFirstName } from '../../redux/slices/Credentials';
import { Button,Platform } from 'react-native';
import * as Device from 'expo-device';
import sendPushNotification from '../../utils/SendNotification';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import {BloodDonorCmpta} from '../../utils/BloodCompt'
const baseUrl = 'https://api.mapbox.com/directions/v5/driving-traffic';

Mapbox.setAccessToken('pk.eyJ1IjoicmFvdWY5ODgiLCJhIjoiY2xzbjZod3JnMDB0NTJxbzkwZm9oMXZvdCJ9.hZVOTvYRd5kEwvQqRILm3g')


const RequestMap=()=>{
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const carouselRef = useRef(null);
  const [trueEffect, setTrueeffect] = useState(false)
  const [bloodrequests, setBloodrequests] = useState([])
  const [northeast, setNortheast] = useState([])
  const [firstPart, setFirstPart] = useState('');
  const [secondPart, setSecondPart] = useState('');
  const [centerlat, setCenterlat] = useState([])
  const [centerlon, setCenterlon] = useState([])
  const userlon = useSelector(getUserLon)
  const [decodedpoints,setdecodedPoints]=useState([])
  const [directions,setDirections]=useState([])
  const userlat = useSelector(getUserLat)
  const [loading, setLoading] = useState(true);
  const [southwest, setSouthwest] = useState([])
  const [coordinates] = useState([userlon, userlat])
  const [userPushToken,setUserPushToken]=useState('')
  const [originaluser,setOriginalUser]=useState([])
  const userid=useSelector(selectUserId)
  const selectedUserFirstName = useSelector(selectedFirstName);
  const userbloodtype=useSelector(selectedBloodType)
const GenerateNearbyRequests = (param) => {
  if (param) {
    setNortheast(new GeoPoint(param.properties.bounds.ne[1], param.properties.bounds.ne[0]))
    setSouthwest(new GeoPoint(param.properties.bounds.sw[1], param.properties.bounds.sw[0]))
    setCenterlat(param.properties.center[1])
    setCenterlon(param.properties.center[0])
    setTrueeffect(true)
  }
}

useEffect(() => {
  if (trueEffect) {
    GetUserRequests();
    
  }
}, [trueEffect]);

const GetUserRequests = async() => {
  const comptValues=await BloodDonorCmpta(userbloodtype)
  const radiusInM = 50 * 1000;
  const bounds = geohashQueryBounds([centerlat, centerlon], radiusInM);
  const promises = [];
  for (const b of bounds) {
    const q = query(
      collection(db, 'BloodRequests'),where('Status','==','Waiting'),where('DonatedUser',"==",""),where('UserId','!=',userid),where('NeededBloodType','in',comptValues));
    promises.push(onSnapshot(q, (snapshot) => {
      const matchingDocs = []
      snapshot.forEach((doc) => {
        const lat = doc.get('lat')
        const lng = doc.get('lon')
        const distanceInKm = distanceBetween([lat, lng], [centerlat, centerlon]);
        const distanceInM = distanceInKm * 1000;
     if (distanceInM <= radiusInM) {
          const request={
            id:doc.id,
            data:doc.data()
          }   
          matchingDocs.push(request);
        }
      });
      setBloodrequests(matchingDocs);
      console.log(matchingDocs);
      console.log(matchingDocs.length);
      setActiveIndex(0)
      setLoading(false);
    }));
  }
  return () => promises.forEach(unsubscribe => unsubscribe());
}



const handleAnnotationSelect = async (feature) => {
  console.log(feature.properties.id);
  const parts = feature.properties.id.split('/'); // Split the ID string by '/'
  if (parts.length === 2) { // Ensure there are two parts
    const firstPart = parts[0];
    setFirstPart(firstPart); // Set the first part
    setSecondPart(parts[1]); // Set the second part
    ShowPopUP();
console.log();
    try {
     const usserid=bloodrequests[parts[1]].data.UserId
      const q=query(collection(db,'UsersData'),where('__name__','==',usserid))
      await getDocs(q)
      .then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          setOriginalUser(doc.data())
          
        })
      })
      
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  } else {
    console.error('Invalid ID format:',  feature.properties.id);
  }
}
const ShowPopUP = () => {
  setShowActionSheet(true);
};

const HidePopUP = () => {
  setShowActionSheet(false);
};

const sendNotification=async()=>{
  console.log(bloodrequests[secondPart]);
  const userid=bloodrequests[secondPart].data.UserId
  
  const q=query(collection(db,'UsersData'),where('__name__', '==',userid))
  await getDocs(q)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setUserPushToken(doc.data().PushToke);
        console.log(doc.data().PushToke);
        const message = {
          title: 'لقد وجدنا متبرع',
          body: ` يريد التبرع ${selectedUserFirstName}` ,
           data:{
            lon:userlon,
            lat:userlat
           }
    
        };
        sendPushNotification(doc.data().PushToke,message)
      });
    })
    .catch((error) => {
      console.error('Error getting documents: ', error);
    });
  

}
const SaveDonation=async()=>{
  setShowActionSheet(false);
const documentId = firstPart;
console.log(documentId);
const documentRef = doc(db,'BloodRequests',documentId)
const newData = {
  DonatedUser:`${userid}`
};
try {
  await updateDoc(documentRef, newData);
  console.log("Document successfully updated!");
  
  sendNotification()
  
  
} catch (error) {
  console.error("Error updating document: ", error);
}
}
return (
  <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', height: '25%', position: 'relative', }}>
      <View style={styles.container}>
        <Mapbox.MapView
          style={styles.map}
          rotateEnabled={false}
          scrollEnabled={false}
          scaleBarEnabled={false}
          pitchEnabled={false}
          
          zoomEnabled={true}
          onMapIdle={(result) => GenerateNearbyRequests(result)}
        >
          <Mapbox.Camera zoomLevel={14} centerCoordinate={coordinates} animationMode="flyTo" animationDuration={4500} minZoomLevel={14}  />

  
       {bloodrequests.map((request, index) => (
        <PointAnnotation
          key={request.id}
          id={`${request.id}/${index}`}
          coordinate={[request.data.lon, request.data.lat]}
          onSelected={handleAnnotationSelect}
          
         
      /> ))}
      
        <LocationPuck/>
        </Mapbox.MapView>
      </View>
      <>
    

   
    <Actionsheet isOpen={showActionSheet} onClose={HidePopUP}>
        <Actionsheet.Content>
        <View>
          <Text style={{fontFamily:'Rubik-Medium', fontSize:22}}>Donation Details</Text>
          <Text style={{fontFamily:'Rubik-Light'}}>Patient Name: {bloodrequests[secondPart]?.data?.PatientName}</Text>
          <Text style={{fontFamily:'Rubik-Light'}}>Phone Number:{originaluser?.PhoneNumber}</Text>
            <Text style={{fontFamily:'Rubik-Light'}}>Blood Type:{bloodrequests[secondPart]?.data?.NeededBloodType} <Text style={{color:'grey'}}>(compatible)</Text></Text>
          <Text style={{fontFamily:'Rubik-Light'}}>Description:</Text>
          <TruncatedText text={bloodrequests[secondPart]?.data?.Description} maxLength={60}/>
         
          <View style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:14}}>
         
                <CustomButton
                buttonText="Donate"
                colors={['#50C878', '#2AAA8A']}
                buttonStyle={styles.signup}
                textStyle={styles.bloodtext}
                onPress={SaveDonation}
                
                />
          </View>
         

        </View>
        
        
        
        
      </Actionsheet.Content>
       
    </Actionsheet>
  </>
    </View>
  </SafeAreaView>
);
};
const styles = StyleSheet.create({
container: {
  flex: 1,
  height: '30%'
},
map: {
  flex: 1,
},
bloodtext:{
  fontFamily:'Rubik-Medium'
},
signup:{
  marginTop:10
  
  
},
})

export default RequestMap;
/*{loading ? (
  <BloodrequestsSkeleton/>
  ) :(
    <ShapeSource id="routeSource" shape={drawLine()}>
      <LineLayer
      id="routeLayer"
      style={{
        lineColor:'black',
        lineWidth:4,
      }}
      />
    </ShapeSource>
    )}     
    
    -----------------------------------------------------------------
   
    
    
    */
























  /*Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
      console.log('edllplsldlspldppsldplpsl');
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token.data;
}
const RequestMap = () => {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();

  

  useEffect(() => {
    
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

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

 
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
    </View>
  );
}

  */