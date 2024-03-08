import { StyleSheet, Text, View, Image, TouchableOpacity,Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import 'expo-dev-client'
import Mapbox from '@rnmapbox/maps'
import { PointAnnotation } from '@rnmapbox/maps'
import { useSelector } from 'react-redux'
import { selectUserId } from '../../redux/slices/Credentials'
import { useDispatch } from 'react-redux'
import { getUserLat, getUserLon, getUserSearchLon, getUserSrachLat, setUserSearchLat, setUserSearchLon } from '../../redux/slices/Location'
import { addDoc,doc, collection, query,deleteDoc, where, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../../FirebaseConfig'
import { Actionsheet,Button } from "native-base";
import { RubikMediumFont,RubikLightFont } from '../../utils/Fontexporter'
import TruncatedText from '../../utils/TruncatedText'
import CustomButton from '../Buttons/GradientButton'



const marker = require('../../assets/images/Blood/travel_10875705.png')

Mapbox.setAccessToken('pk.eyJ1IjoicmFvdWY5ODgiLCJhIjoiY2xzbjZod3JnMDB0NTJxbzkwZm9oMXZvdCJ9.hZVOTvYRd5kEwvQqRILm3g')

const Map = () => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const userid = useSelector(selectUserId)
  const [firstPart, setFirstPart] = useState('');
  const [secondPart, setSecondPart] = useState('');
  const userlon = useSelector(getUserLon)
  const userlat = useSelector(getUserLat)
  const dispatch = useDispatch()
  const [bloodrequests, setBloodrequests] = useState([])
  const [coordinates] = useState([userlon, userlat])
  RubikMediumFont()
  RubikLightFont()

  useEffect(() => {
    const unsubscribe = GetUserRequests()
    return () => {
      unsubscribe()
    }
  }, [])

  function Dispatchvalues(param) {
    dispatch(setUserSearchLon(param.properties.center[0]))
    dispatch(setUserSearchLat(param.properties.center[1]))
  }

  const GetUserRequests = () => {
    const q = query(collection(db, "BloodRequests"), where("UserId", "==", `${userid}`))
    return onSnapshot(q, (querySnapshot) => {
      const requests = []
      querySnapshot.forEach((doc) => {
        const requestData = {
          id: doc.id,
          data: doc.data()
        };
        requests.push(requestData);
      })
      setBloodrequests(requests)
      console.log(requests);
      
     
    })
  }
  const handleAnnotationSelect = (feature) => {
  console.log(feature.properties);
    const parts = feature.properties.id.split('/'); // Split the ID string by '/'
    if (parts.length === 2) { // Ensure there are two parts
      setFirstPart(parts[0]); // Set the first part
      setSecondPart(parts[1]);
      ShowPopUP() // Set the second part
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
  const DelteUser=async()=>{
    const documentId = firstPart
    console.log(documentId);
    const documentRef = doc(db,'BloodRequests',documentId)
    try {
      await deleteDoc(documentRef);
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }}
    const founddonor=async()=>{
      const documentId = firstPart
      console.log(documentId);
      const documentRef = doc(db,'BloodRequests',documentId)
      const newData={
        Status:'Finished'
      }
      try {
        await updateDoc(documentRef,newData);
        console.log("Document successfully updated!");
      } catch (error) {
        console.error("Error updating document: ", error);
      }}
      const Cancel=async()=>{
        const documentId = firstPart
        console.log(documentId);
        const documentRef = doc(db,'BloodRequests',documentId)
        const newData = {
          DonatedUser:''
        };
        try {
          await updateDoc(documentRef, newData);
          console.log("Document successfully updated!");
        } catch (error) {
          console.error("Error updating document: ", error);
        }}

  return (
    <View style={styles.container}>
      <Mapbox.MapView
        style={styles.map}
        rotateEnabled={false}
        scaleBarEnabled={false}
        pitchEnabled={false}
        onMapIdle={(result) => Dispatchvalues(result)}
        onDidFinishLoadingMap={() => GetUserRequests()}
      >
        <Mapbox.Camera zoomLevel={15} centerCoordinate={coordinates} animationMode='flyTo' animationDuration={4500} />
        {bloodrequests.map((request, index) => (
          <PointAnnotation
            key={request.id}
            id={`${request.id}/${index}`}
            coordinate={[request.data.lon, request.data.lat]}
            onSelected={handleAnnotationSelect}
            
           
        /> ))}
      </Mapbox.MapView>
      <View style={styles.markerContainer}>
        <View style={styles.marker} >
          <Image style={{ width: 40, height: 40 }} source={marker}></Image>
        </View>
      </View>
      <>
      

     
      <Actionsheet isOpen={showActionSheet} onClose={HidePopUP}>
          <Actionsheet.Content>
          <View>
            <Text style={{fontFamily:'Rubik-Medium', fontSize:22}}>Donation Details</Text>
            <Text style={{fontFamily:'Rubik-Light'}}>Patient Name: {bloodrequests[secondPart]?.data?.PatientName}</Text>
            <Text style={{fontFamily:'Rubik-Light'}}>Description:</Text>
            <TruncatedText text={'My daught had an accident so i really need your help to get blood for her'} maxLength={60}/>
            <Text style={{fontFamily:'Rubik-Medium', fontSize:22}}>Potential Donors</Text>
            <View style={{borderWidth:1,borderColor:'black',borderRadius:15,height:100,padding:7}}>
              <Text style={{fontFamily:'Rubik-Light'}}>Name:Abdelkader belmehdi</Text>
              <Text style={{fontFamily:'Rubik-Light'}}>Phone Number:0795960972</Text>
              <Text style={{fontFamily:'Rubik-Light'}}>Blood Type:A+ <Text style={{color:'grey'}}>(compatible)</Text></Text>
              <TouchableOpacity onPress={Cancel}><Text style={{textAlign:'right', fontFamily:'Rubik-Medium'}}>Cancel Donor</Text></TouchableOpacity>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:14}}>
            <CustomButton
                  buttonText="Delete"
                  colors={['#FF0000', '#B22222']}
                  buttonStyle={styles.signup}
                  textStyle={styles.bloodtext}
                  onPress={DelteUser}
                  />
                  <CustomButton
                  buttonText="Found Donor "
                  colors={['#50C878', '#2AAA8A']}
                  buttonStyle={styles.signup}
                  textStyle={styles.bloodtext}
                  onPress={founddonor}
                  />
            </View>
           

          </View>
          
          
          
          
        </Actionsheet.Content>
         
      </Actionsheet>
    </>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    position: 'absolute',
    top: '46%',
    left: '46%',
    zIndex: 2,
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  bloodtext:{
    fontFamily:'Rubik-Medium'
  },
  signup:{
    width:180,
    marginRight:5
    
  }
})
export default Map
