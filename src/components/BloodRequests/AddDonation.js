import { StyleSheet, Text, View,TextInput } from 'react-native'
import React,{useState} from 'react'
import {RubikMediumFont} from '../../utils/Fontexporter'
import BloodTypePicker from '../BloodPicker/BloodPicker';

const AddDonation = () => {
  const [firstname, setFirstname] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState(null);
  const isFontLoaded = RubikMediumFont();
  const Geocode=()=>{
    try{
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
    <View style={styles.container}>
    <View >
      <Text style={{fontFamily:"Rubik-Medium",fontSize:20,textAlign:'center'}}>Please fill out the patient information</Text>
      <Text style={{fontFamily:"Rubik-Medium",fontSize:10,textAlign:'center',color:'grey'}}>To update the status of your previous orders, hold click their marker</Text>
    </View>
    <View >
    <TextInput placeholder="Enter your first name" style={styles.input} onChangeText={(text) => setFirstname(text)} />
    <TextInput placeholder="Pick your address" style={styles.input} onChangeText={(text) => setFirstname(text)} />
    <BloodTypePicker data={itemData} selectedBloodType={selectedBloodType} onSelectBloodType={setSelectedBloodType} />
    </View>
    </View>
  )
}

export default AddDonation 
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
    container:{
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        backgroundColor:'white',
        height:'100%',
        padding:10
        
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
    }
})
