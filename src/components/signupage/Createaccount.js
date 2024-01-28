import { StyleSheet, Text, TextInput, TouchableOpacity, View ,FlatList, Button,Image, ActivityIndicator} from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from "expo-font";
import { useState } from 'react';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
const ooredooimage = require('../../assets/images/ooredoo.png');



const Createaccount = () => {
  const [fontsLoaded] = useFonts({
    "Rubik-Medium": require("../../assets/fonts/Rubik-static/Rubik-Medium.ttf"),
   
    
  });
  if (!fontsLoaded) {
      return <Text>Loading...</Text>;
    }
   
    const [selectedBloodType, setSelectedBloodType] = useState(null);
    const [email,setEmail]=useState('');
    const [firstname,setFirstname]=useState('');
    const [lastname,setLastname]=useState('');
    const [password,setPassword]=useState('');
    const [phonenumber,setPhonenumber]=useState('');
    const [loading, setLoading]=useState(false);
    const auth=FIREBASE_AUTH;


    const Signup=async()=>{
      setLoading (true);
      try {
        const response = await createUserWithEmailAndPassword(auth,email,password)
        console.log(response);
        
      } catch (error) {
        console.log(error);
        
      }
      finally{
        setLoading(false)

      }
    }
  return (
    
    <View>
      <TextInput placeholder='Enter your first name' style={styles.input} onChangeText={(text)=>setFirstname(text)}></TextInput>
      <TextInput placeholder='Enter your last name' style={styles.input} onChangeText={(text)=>setLastname(text)}></TextInput>
      <TextInput placeholder='Enter your email' style={styles.input} onChangeText={(text)=>setEmail(text)}></TextInput>
      <TextInput placeholder='Enter your password' style={styles.input}onChangeText={(text)=>setPassword(text)} secureTextEntry={true}></TextInput>
      <TextInput placeholder='Enter your phone number' style={styles.input}onChangeText={(text)=>setPhonenumber(text)}></TextInput>
      
      <View>
        <Text style={{fontFamily:'Rubik-Medium', paddingTop:15}}>Please Choose a Blood Type : {selectedBloodType}</Text>
        <View>
        <FlatList
        data={itemData}
        numColumns={4}
        
        renderItem={({item})=>(
          
          <TouchableOpacity
      style={{ width: '25%' }}
      onPress={() => setSelectedBloodType(item.type === selectedBloodType ? null : item.type)}
    >
      <LinearGradient
        colors={['#eb1a22', '#e36f1e']}
        style={[
          styles.bloodcontainer,
          {
            borderColor: item.type === selectedBloodType ? 'black' : 'transparent',
            
          },
        ]}
      >
        <Text style={styles.bloodtext}>{item.type}</Text>
      </LinearGradient>
    </TouchableOpacity>
        )}
    
      />
        </View>
      </View>
      { loading ? <ActivityIndicator size="large" color="#0000ff"/>
      :<> 
      <TouchableOpacity style={styles.Signupcontainer} onPress={Signup}>
      <LinearGradient
           colors={['#e36f1e','#eb1a22' ]} style={styles.signup}>
        <Text style={[styles.bloodtext, { fontSize: 20 }]}>Sign Up</Text>
        </LinearGradient>
      </TouchableOpacity>
      </>}
      <View style={styles.footer}>
        <Text style={styles.footer_text}>Powered By</Text>
        <Image
        source={ooredooimage} style={styles.ooredooimage}></Image>
      </View>
    </View>
  )
}

const itemData=[
  {
    type:'A+'
  },
  {
    type:'A-'
  },
  {
    type:'B+'
  },
  {
    type:'B-'
  },
  {
    type:'O+'
  },
  {
    type:'O-'
  },
  {
    type:'AB+'
  },
  {
    type:'AB-'
  }

]

export default Createaccount

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
  bloodcontainer:{
    backgroundColor:'white',
    borderRadius:5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:5,
    marginRight:5,
    marginTop:5,
    borderWidth:2,

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
    justifyContent:'center',
    alignItems:'center',
    marginTop:25,
    
    
    
  },
  footer_text:{
    fontFamily:'Rubik-Medium',
    color:'grey',
    fontSize:14,
    
  }
})