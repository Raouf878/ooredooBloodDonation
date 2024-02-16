import { StyleSheet, Text, TextInput, TouchableOpacity, View ,Image, ActivityIndicator} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc'
import showToast from '../../utils/ToastMessage'
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from "expo-font";
import { useState } from 'react';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch,useSelector } from 'react-redux';
import { setUserid } from '../../redux/slices/Credentials';

import Signup from '../../screens/Signup';

const ooredooimage = require('../../assets/images/ooredoo.png');



const Loginaccount = () => {
  const [fontsLoaded] = useFonts({
    "Rubik-Medium": require("../../assets/fonts/Rubik-static/Rubik-Medium.ttf"),
   
    
  });
  
  const auth=FIREBASE_AUTH;
  const navigation=useNavigation();
  const dispatch=useDispatch();

  const Signin=async()=>{
    
    if (email,password){
      setLoading(true);
      try {
          const response=await signInWithEmailAndPassword(auth,email,password)
          
          dispatch(setUserid(response.user.uid))
          
      } catch (error) {
        showToast('Please check your email or password')
          
      }
      finally{
          setLoading(false)
      }

    }else{
      showToast('Please fill out all the fields')

    }
   
  }
  
   

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loading, setLoading]=useState(false);
    


    
  return (
    
    <View>
      <TextInput placeholder='Enter your email' style={styles.input} onChangeText={(text)=>setEmail(text)}></TextInput>
      <TextInput placeholder='Enter your password' style={styles.input}onChangeText={(text)=>setPassword(text)} secureTextEntry={true}></TextInput>
      { loading ? <ActivityIndicator size="large" color="#0000ff"/>
      :<> 
      <TouchableOpacity style={styles.Signupcontainer} onPress={Signin}>
      <LinearGradient
           colors={['#e36f1e','#eb1a22' ]} style={styles.signup}>
        <Text style={[styles.bloodtext, { fontSize: 20 }]}>Login</Text>
        </LinearGradient>
      </TouchableOpacity>
      </>}
      <Text style={[styles.footer_text, {textAlign:'center', paddingTop:10}]}>Don't have an account yet? <Text style={{color:'black', textDecorationLine:'underline'}} onPress={()=>navigation.navigate(Signup)}>Register</Text></Text>
      <View style={styles.footer}>
        <Text style={styles.footer_text}>Powered By</Text>
        <Image
        source={ooredooimage} style={styles.ooredooimage}></Image>
      </View>
    </View>
  )
}


export default Loginaccount

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 20,
    backgroundColor:'white',
    borderRadius:5,
    fontFamily:'Rubik-Medium',
    
  },
  ooredooimage:{
    width:90,
    height:30,
    marginTop: -10,
    

  },
 
  signup:{
    height:40,
    width:'50%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,

  },
  Signupcontainer:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:10,
  },
  bloodtext:{
    color:'white',
    fontFamily:'Rubik-Medium',
    fontSize:26,
  },
  footer:{
    display:'flex',
    justifyContent:'flex-end',
    alignItems:'center',
    marginTop:25,
    
    
    
  },
  footer_text:{
    fontFamily:'Rubik-Medium',
    color:'grey',
    fontSize:14,
    
  }
})