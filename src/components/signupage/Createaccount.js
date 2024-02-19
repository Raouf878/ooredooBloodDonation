import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image,ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import showToast from '../../utils/ToastMessage';
import { setUserid } from '../../redux/slices/Credentials';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { db } from '../../../FirebaseConfig';
import { useFonts } from "expo-font";
import BloodTypePicker from '../BloodPicker/BloodPicker'// Import the BloodTypePicker component
import ooredooimage from '../../assets/images/ooredoo.png';
import Login from '../../screens/Login'

const Createaccount = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts({
    'Rubik-Medium': require('../../assets/fonts/Rubik-static/Rubik-Medium.ttf'),
  });

  const [selectedBloodType, setSelectedBloodType] = useState(null);
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const Signup = async () => {
    if (email && password && selectedBloodType && firstname && lastname && phonenumber) {
      setLoading(true);
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        dispatch(setUserid(response.user.uid));

        if (response) {
          await setDoc(doc(db, 'UsersData', response.user.uid), {
            bloodType: selectedBloodType,
            FirstName: firstname,
            LastName: lastname,
            PhoneNumber: phonenumber,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      showToast('Please fill out all the fields');
    }
  };

  return (
    <View>
      <TextInput placeholder="Enter your first name" style={styles.input} onChangeText={(text) => setFirstname(text)} />
      <TextInput placeholder="Enter your last name" style={styles.input} onChangeText={(text) => setLastname(text)} />
      <TextInput placeholder="Enter your email" style={styles.input} onChangeText={(text) => setEmail(text)} />
      <TextInput placeholder="Enter your password" style={styles.input} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
      <TextInput placeholder="Enter your phone number" style={styles.input} onChangeText={(text) => setPhonenumber(text)} />

      <BloodTypePicker data={itemData} selectedBloodType={selectedBloodType} onSelectBloodType={setSelectedBloodType} />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TouchableOpacity style={styles.signupContainer} onPress={Signup}>
            <LinearGradient colors={['#e36f1e', '#eb1a22']} style={styles.signupButton}>
              <Text style={[styles.bloodText, { fontSize: 20 }]}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={[styles.footerText, { textAlign: 'center', paddingTop: 10 }]}>
            Already Have an account{' '}
            <Text style={{ color: 'black', textDecorationLine: 'underline' }} onPress={() => navigation.navigate(Login)}>
              Login
            </Text>
          </Text>
        </>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered By</Text>
        <Image source={ooredooimage} style={styles.ooredooImage} />
      </View>
    </View>
  );
};

export default Createaccount;

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
  input: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    fontFamily: 'Rubik-Medium',
  },
  ooredooImage: {
    width: 90,
    height: 30,
    margin: -10,
  },
  signupContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signupButton: {
    height: 40,
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  footerText: {
    fontFamily: 'Rubik-Medium',
    color: 'grey',
    fontSize: 14,
  },
});
