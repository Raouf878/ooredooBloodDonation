import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Picker,TextInput } from 'react-native';
import BloodTypePicker from '../BloodPicker/BloodPicker'; // Import your BloodTypePicker component
import CustomButton from '../Buttons/GradientButton';
import { useSelector } from 'react-redux';
import { addDoc,doc, collection, query,deleteDoc, where, onSnapshot, updateDoc } from 'firebase/firestore'
import { FIREBASE_AUTH, db } from '../../../FirebaseConfig'
import { selectedFirstName, selectedLastName, selectedPhoneNumber,selectedBloodType, selectUserId, setUserid } from '../../redux/slices/Credentials';
import { useDispatch } from 'react-redux';
const Settings = () => {
  const [selectedBloodTyp, setSelectedBloodype] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isEditActivated, setIsEditActivated] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const FIRSTNAME=useSelector(selectedFirstName)
  const LASTNAME=useSelector(selectedLastName)
  const PHONENUMBER=useSelector(selectedPhoneNumber)
  const BLOODTYPE=useSelector(selectedBloodType)
  const userid=useSelector(selectUserId)
  const AUTH = FIREBASE_AUTH
  const dispatch=useDispatch()
  // Fetch data from the database
  useEffect(() => {
    // Fetch data from the database and set the state
    // For demonstration purposes, I'm setting dummy values here
    setFirstName(FIRSTNAME);
    setLastName(LASTNAME);
    setEmail('john.doe@example.com');
    setPhoneNumber(PHONENUMBER);
    setSelectedBloodype(BLOODTYPE)

    // Set initial values
    setInitialValues({
      firstName: FIRSTNAME,
      lastName: LASTNAME,
      email: 'john.doe@example.com',
      selectedBloodTyp:BLOODTYPE,
      phoneNumber: PHONENUMBER
    });
  }, []); // Add selectedBloodType to the dependency array

  const handleEditButton = () => {
    // Handle edit button press
    // Here you can update the values in the database
    console.log('Values updated in the database');
    setIsEditActivated(false); // Deactivate edit button
  };

  const handleInputChange = (value, setter, key) => {
    setter(value);
  
    const newValues = {
      firstName,
      lastName,
      email,
      selectedBloodTyp,
      phoneNumber,
      [key]: value,
    };
  
    const isAnyInputEdited = Object.keys(newValues).some(inputKey => {
      return newValues[inputKey] !== initialValues[inputKey];
    });
  
    setIsEditActivated(isAnyInputEdited);
  };
  const anyInputEdited = async() => {
   await AUTH.signOut()
   dispatch(setUserid(null))
  };
  const updateDetails=async()=>{
    
    
    const documentRef = doc(db,'UsersData',userid)
    const newData={
      FirstName:firstName,
      LastName:lastName,
      PhoneNumber:phoneNumber,
      bloodType:selectedBloodTyp
    }
    try {
      await updateDoc(documentRef,newData);
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }}

  return (
    <View style={styles.container}>
    <Text style={{fontFamily:'Rubik-Medium', fontSize:22}}>Edit your personnal details</Text>
      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={(text) => handleInputChange(text, setFirstName, 'firstName')}
      />
      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={(text) => handleInputChange(text, setLastName, 'lastName')}
      />
      <Text style={styles.label}>Blood Type:</Text>
      <BloodTypePicker
  data={itemData}
  selectedBloodType={selectedBloodTyp}
  onSelectBloodType={(selectedType) => {
    setSelectedBloodype(selectedType);
    handleInputChange(selectedType, setSelectedBloodype, 'selectedBloodTyp');
  }}
/>
     
      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={(text) => handleInputChange(text, setPhoneNumber, 'phoneNumber')}
      />
      <TouchableOpacity
        onPress={updateDetails}
        disabled={!isEditActivated}
        style={[styles.button, isEditActivated ? null : styles.disabledButton]}
      >
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={anyInputEdited}
        
        style={styles.button}
      >
        <Text style={styles.buttonText}>Disconnect</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

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
    
    padding: 10,
  },
  
  button: {
    backgroundColor: '#cf142b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop:5
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign:'center',
    fontFamily: 'Rubik-Medium'
  },
  input: {
    width: '100%',
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom:5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    fontFamily: 'Rubik-Medium',
  },
  label:{
    fontFamily: 'Rubik-Light'
  }
});
