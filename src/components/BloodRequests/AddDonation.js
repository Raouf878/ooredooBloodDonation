import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { RubikMediumFont } from '../../utils/Fontexporter';
import BloodTypePicker from '../BloodPicker/BloodPicker';
import { useSelector } from 'react-redux';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { db,initializeApp } from '../../../FirebaseConfig';
import { getUserSearchLon, getUserSrachLat } from '../../redux/slices/Location';
import showToast from '../../utils/ToastMessage'
import CustomButton from '../Buttons/GradientButton';
import { selectUserId } from '../../redux/slices/Credentials';
import { GeoPoint } from 'firebase/firestore';
import {addDoc, collection,query, where, onSnapshot,getDocs} from 'firebase/firestore'
import { ActivityIndicator } from 'react-native';
import BloodRequest from '../../screens/BloodRequest';
import {geohashForLocation} from 'geofire-common';
import { SafeAreaView } from 'react-native-safe-area-context';
import getCompatibleBloodTypes from '../../utils/BloodCompt';
import * as Notifications from 'expo-notifications';


const AddDonation = () => {
 
  const [selectedBloodType, setSelectedBloodType] = useState(null);
  const [name,setName]=useState('')
  const isFontLoaded = RubikMediumFont();
  const userlon = useSelector(getUserSearchLon);
  const userlat = useSelector(getUserSrachLat);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [hash,setHash]=useState('')
  const [loading, setLoading] = useState(false);
  const userid=useSelector(selectUserId)
  const [CompatibleBloodTypes,setCompatibleBloodType]=useState([])
  const [bloodrequest,setBloodrequests]=useState([])
  const [AllPushTokens,setAllPushTokens]=useState([])
  
  
  const sendNotificationToAll = async () => {
    try {
      const comptValues=await getCompatibleBloodTypes(selectedBloodType)
      console.log(comptValues);
      const querySnapshot = await getDocs(query(collection(db, 'UsersData'), where('bloodType', 'in', comptValues)));
     console.log(querySnapshot);
      // Extract push tokens from the documents
      const pushTokens = [];
      querySnapshot.forEach((doc) => {
        const pushToken = doc.data().PushToke;
        console.log(pushToken);
        if (pushToken) {
          pushTokens.push(pushToken);
        }
      });
  
      // Prepare notification message
      const message = {
        title: 'Notification Title',
        body: 'Notification Body',
        data:{
          lon:userlon,
          lat:userlat,
        }

      };
  
      // Send notifications to each push token
      for (const pushToken of pushTokens) {
        await sendPushNotification(pushToken, message);
      }
  
      console.log('Notifications sent successfully to all push tokens');
    } catch (error) {
      console.error('Error sending notifications:', error);
    }
  };
  
  const sendPushNotification = async (pushToken, message) => {
    try {
      // Prepare notification object
      const notification = {
        to: pushToken,
        sound: 'default',
        title: message.title,
        body: message.body,
        data:message.data
      };
  
      // Send notification
      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification),
      });
  
      console.log('Notification sent successfully to:', pushToken);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };
  const SaveDataFireBase =  async() => {
    
    if(selectedBloodType && userlat && userlon &&  name ){
      setLoading(true)

      
    
      
await addDoc(collection(db,'BloodRequests'),{
  lat:userlat,
  lon:userlon,
  NeededBloodType: selectedBloodType,
  PatientName: name,
  UserId: userid,
  Status:'Waiting',
  LocaHash:hash,
  DonatedUser:'',
  Description:'heeeeeeeeeeeeeeeeeeeelo',
 

  
}).then(()=>{
  showToast('Request sent successfully')
  setName('')
  sendNotificationToAll()
  
 
  setLoading(false)
 
})
.catch((error)=>{
  console.log(error);
  showToast('error while adding user')
})
  
  


    }
    else{
      showToast('Please fill out all the fields');

    }
  }
  

  
 
 

  useEffect(() => {
    (async () => {
     
      if(userlat && userlon){
        try {
          const newhash=geohashForLocation([userlon,userlat])
        setHash(newhash)
          console.log(newhash);
   
           let geocode = await Location.reverseGeocodeAsync({
             latitude: userlat,
             longitude: userlon,
           });
   
           // Convert address object to string
           const formattedAddress = `${geocode[0].formattedAddress}`;
           setAddress(formattedAddress);
           // Assuming the first result is the most accurate
         } catch (error) {
           console.error('Error getting location:', error);
           setErrorMsg('Error getting location');
         }
      }else{
        return null;
      }
     
    })();
  });

  return (
    
    <View style={styles.container}>
      <View >
      <View  >
        <Text style={{ fontFamily: 'Rubik-Medium', fontSize: 20, textAlign: 'center' }}>Please fill out the patient information</Text>
        <Text style={{ fontFamily: 'Rubik-Medium', fontSize: 10, textAlign: 'center', color: 'grey' }}>To update the status of your previous orders, hold click their marker</Text>
      </View>
      <View>
        <TextInput placeholder="Enter your first name" style={styles.input} value={name}onChangeText={(text) => setName(text)} />
        <TextInput placeholder="Pick your address" style={styles.input} value={address}  /> 
        <BloodTypePicker data={itemData} selectedBloodType={selectedBloodType} onSelectBloodType={setSelectedBloodType} />
      </View>
      <View style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      { loading ? <ActivityIndicator size="large" color="#0000ff"/>
      :<> 
      <CustomButton
                  buttonText="Send Request"
                  colors={['#e36f1e', '#eb1a22']}
                  buttonStyle={styles.signup}
                  textStyle={styles.bloodtext}
                  onPress={SaveDataFireBase} // Pass togglePopup function as onPress prop
                />
                </>}
                </View>
                </View>
    </View>
    
  );
}

export default AddDonation;

const itemData = [
  { type: 'A+' },
  { type: 'A-' },
  { type: 'B+' },
  { type: 'B-' },
  { type: 'O+' },
  { type: 'O-' },
  { type: 'AB+' },
  { type: 'AB-' },
];

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'white',
    
    padding: 10,
  },
  input: {
    width: '100%',
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    fontFamily: 'Rubik-Medium',
  },
  bloodtext:{
    fontFamily:'Rubik-Medium'
  },
  signup:{
    width:'50%',
    
  }
});
