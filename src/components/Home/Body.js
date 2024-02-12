import { StyleSheet, Text, View, Image, TouchableOpacity,ImageBackground } from 'react-native';
import React from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import GradientText from '../../utils/TextGradient';
import { useFonts } from "expo-font";
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';
import Svg, { Line, Rect } from 'react-native-svg';
const bloodImg = require('../../assets/images/Donations/Blood donation-amico.png');
const DonationsImg = require('../../assets/images/Donations/injury_3359179.png');
const ooredooimage = require('../../assets/images/ooredoo.png');
const ContributeMoney=require('../../assets/images/Donations/donate_7440975.png')
const blooodrequest=require('../../assets/images/Donations/sos_7440980.png')

import MoneyDonation from '../../screens/MoneyDonation'

const Body = () => {
  const navigation=useNavigation();
  
  const getDashboardData=async()=>{


  }
  const [fontsLoaded] = useFonts({
    "Rubik-Medium2": require("../../assets/fonts/Rubik-static/Rubik-Medium.ttf"),
    
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.requestContainer}>
        <View >
        <GradientText style={styles.Hello}>
            Hello,
        </GradientText>
          <Text style={{fontFamily:'Rubik-Medium2'}}>Please check new blood requests</Text>
          <GradientText style={{fontFamily:'Rubik-Medium2'}}>
            Donation requests {'>'}
        </GradientText>
        </View>
        <View style={styles.imageContainer}>
          <Image source={bloodImg} style={styles.bloodImg} />
        </View>
        </TouchableOpacity>
      <View style={{paddingTop:10, display:'flex',flexDirection:'row',justifyContent:'space-between' }}>
      <TouchableOpacity style={styles.LineTwoBodyBlock}>
        <LinearGradient
           colors={['#eb1a22','#e36f1e']} style={{height:'100%',borderRadius:15}}>
            
        <View style={styles.redContainerFlex}>
          {/* 
        <View>
          <Image source={DonationsImg} style={styles.DonationsImg}></Image>
        </View>
        */}
        <View style={{justifyContent:'center',alignItems:'flex-start',padding:7}}>
          {/*this section is for red container text */}
          <Text style={{fontFamily:'Rubik-Medium2', fontSize:34, color:'white',}}>+</Text>
          <Text style={{fontFamily:'Rubik-Medium2',fontSize:18, color:'white'}}>Need Blood?</Text>
          <Text style={{fontFamily:'Rubik-Medium2'}}>Make a request for nearby donors {'>'}</Text>
        </View>
        </View>
        </LinearGradient>
        </TouchableOpacity>
        
        
        <TouchableOpacity style={[styles.LineTwoBodyBlock,{backgroundColor:'white'}]} onPress={()=>navigation.navigate(MoneyDonation)}>
        <View style={{justifyContent:'center',alignItems:'flex-start',padding:7}}>
        
          {/*this section is for red container text */}
          <Image source={ContributeMoney} style={styles.contributeImage}></Image>
          <GradientText style={{fontFamily:'Rubik-Medium2',fontSize:18, color:'black'}}>Donate Money</GradientText>
          <Text style={{fontFamily:'Rubik-Medium2'}}>we need your funding for some projects {'>'}</Text>
        </View>
        </TouchableOpacity>
        
        {/* Additional Views */}
      </View>
      <View>
       {/* Additional Views for the nearby requests */}
       
      
       
       
      </View>
    </View>
  );
};

export default Body;

const styles = StyleSheet.create({
  additionalContainer: {
    marginTop:-125,
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth:1,
    borderColor:'black', 
  },
  contributeImage:{
    width:55,
    height:55,
    

  },
  container: {
    flex: 1,
    
    
    
  },
  bloodImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  Hello:{
    fontSize:25,
    fontFamily:'Rubik-Medium2'

  },
  requestContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth:1,
    borderColor:'black', 
  },
  imageContainer: {
    width: 100,
    height: 90,
  },
  LineTwoBodyBlock:{
    width:'49%',
    borderRadius:15,
    minHeight:100,
    maxHeight:'48%',
    backgroundColor:'black',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth:1,
    borderColor:'black',
    
  },
  DonationsImg:{
    height:60,
    width:'full',
    resizeMode:'contain',
    

  },
  redContainerFlex:{
    display:'flex',
    flexDirection:'column',
   
  },
  
});