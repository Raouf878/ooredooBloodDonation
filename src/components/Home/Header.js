import { StyleSheet, Text, View, Image,Permissions} from 'react-native'
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { add } from '@shopify/react-native-skia';

const profileimage = require('../../assets/images/Profile_Picture.png');

const Header = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let locationData = await Location.getCurrentPositionAsync({});
        setLocation(locationData);

        // Reverse geocoding
        let geocode = await Location.reverseGeocodeAsync({
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
        });

        setAddress(geocode[0]);
        console.log(geocode[0]); // Assuming the first result is the most accurate
      } catch (error) {
        console.error('Error getting location:', error);
        setErrorMsg('Error getting location');
      }
    })();
  }, []);

  return (
    <View style={styles.headerContainer}>
      <View>
      <Text style={{}}>Location</Text>
      <Text>{address.formattedAddress}</Text>
      </View>
     
      <Image source={profileimage} style={styles.ooredooimage}></Image>
      
      
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    ooredooimage:{
        width:90,
        height:90,
        borderColor:'black',
        borderWidth:2,
        borderRadius:45,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        
        
    
      },
      headerContainer:{
        
       
       display:'flex',
       flexDirection:'row',
       alignItems:'flex-end',
       justifyContent:'space-between',
        marginBottom:25,
       
        
      }
})