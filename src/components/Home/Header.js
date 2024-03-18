import { StyleSheet, Text, View, Image,Permissions,ActivityIndicator, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font';
import { useDispatch,useSelector } from 'react-redux';
import { setUserLat,setUserLon } from '../../redux/slices/Location';
import CircleSkeleton from '../Skeletons/CircleSkeleton';
import { Avatar } from "native-base";
import { selectedFirstName,selectUserLoading,selectLoadingStates,setLoadingState } from '../../redux/slices/Credentials';
import Setting from '../../screens/setting';
import { useNavigation } from '@react-navigation/native';

const profileimage = require('../../assets/images/Profile_Picture.png');

const Header = () => {
 const dispatch=useDispatch();
 const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "Rubik-Medium": require("../../assets/fonts/Rubik-static/Rubik-Medium.ttf"),
    "Rubik-Light": require("../../assets/fonts/Rubik-static/Rubik-Light.ttf"),
   
    
  });
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const name=useSelector(selectedFirstName)
  const loadingStates = useSelector(selectLoadingStates);
const userloading=useSelector(selectUserLoading)

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
        setUserLat(dispatch(setUserLat(locationData.coords.latitude)))
        setUserLon(dispatch(setUserLon(locationData.coords.longitude)))
        let geocode = await Location.reverseGeocodeAsync({
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
        });

        setAddress(geocode[0]);
        dispatch(setLoadingState({ index: 0, loadingState: true }));
      } catch (error) {
        console.error('Error getting location:', error);
        setErrorMsg('Error getting location');
      }
    })();
  }, []);

  return (
    <View style={styles.headerContainer}>
      <View >
      <Text style={{fontFamily:'Rubik-Medium', fontSize:22}}>Location</Text>
      <Text style={{fontFamily:'Rubik-Light'}}>{address.city}, {address.subregion}, {address.region}, {address.country}</Text>
      </View>
     
      {userloading ? (
  <CircleSkeleton/>
) : (
  <TouchableOpacity onPress={()=>navigation.navigate(Setting)}>
  <Avatar bg="indigo.500" mr="1" onPress={{}}>
    {name && name.length >= 2 ? (
      name[0] + name[1]
    ) : (
      name && name[0]
    )}
    
  </Avatar>
  </TouchableOpacity>
)}
      
      
      
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
       alignItems:'center',
       justifyContent:'space-between',
       marginBottom:25,
       
        
      }
})