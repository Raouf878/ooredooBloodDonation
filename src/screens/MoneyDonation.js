import React, { useState } from 'react';

import { useFonts } from 'expo-font';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, FlatList,ScrollView, ProgressBarAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/Buttons/GradientButton'
import TruncatedText from '../utils/TruncatedText'
const YoutubeLogo=require('../assets/images/Blood/youtube.png')
CerifiedLogo=require('../assets/images/Blood/quality.png')
const Gaza=require('../assets/images/Blood/gaza.jpg')
import Popup from '../components/popup/paymentpop';

const DATA = [
  {
    id: '1',
    title: 'Emergency Relief for Gaza',
    description: 'The Big Heart Foundation has initiated an emergency relief program to aid Palestinians affected by the ongoing war in Gaza.',
   
    totalAmount: 10000,
    donatedAmount: 5000,
  },
  
  
];




const MoneyDonation = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setPopupVisible(false);
  };

  
 
  const [fontsLoaded] = useFonts({
    "Rubik-Medium2": require("../assets/fonts/Rubik-static/Rubik-Medium.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-static/Rubik-Light.ttf"),
    
  });
  
  return (
    <SafeAreaView style={{paddingLeft:10,paddingRight:10,backgroundColor:'white'}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titleText}>Donations Projects</Text>
        <Text style={styles.descriptionText}>Please check the full list of projects and donate using your dahabia card.</Text>
        {DATA.map(item => (
          <View key={item.id}>
            <View style={styles.card}>
              <Image source={require('../assets/images/Blood/gaza.jpg')} style={{resizeMode:'cover', width:'auto'}} />
              <Text style={styles.donationText}>${item.donatedAmount} / ${item.totalAmount}</Text>
              <ProgressBarAndroid
                color='#000000'
                styleAttr="Horizontal"
                indeterminate={false}
                progress={item.donatedAmount / item.totalAmount}
              />
              <View style={styles.youtube}>
                <View style={styles.youtubelogo}>
                  <Text style={styles.show}>Show on youtube</Text>
                  <Image source={require('../assets/images/Blood/youtube.png')} style={{width:20,height:20,marginLeft:10}} />
                </View>
                <View style={styles.youtubelogo}>
                  <Image source={require('../assets/images/Blood/quality.png')} style={{width:20,height:20,marginRight:10,marginBottom:15}} />
                  <Text style={{fontFamily:'Rubik-Medium'}}>تبرع مصرح به</Text>
                </View>
              </View>
              <View style={styles.DescriptionView}>
                <Text style={{fontFamily:'Rubik-Medium', fontSize:18}}>{item.title}</Text>
                <TruncatedText text={item.description} maxLength={60} />
                <CustomButton
                  buttonText="Donate"
                  colors={['#e36f1e', '#eb1a22']}
                  buttonStyle={styles.signup}
                  textStyle={styles.bloodtext}
                  onPress={togglePopup} // Pass togglePopup function as onPress prop
                />
              </View>
            </View>
          </View>
        ))}
        <Popup
          visible={popupVisible}
          onClose={togglePopup}
          onSelectOption={handleSelectOption}
        />
        {selectedOption !== '' && <Text>You selected: {selectedOption}</Text>}
      { /* <Text style={{textAlign:'center',fontFamily:'Rubik-Medium',color:'grey',}}>Swipe Right for more projects</Text>*/}
      </ScrollView>
    </SafeAreaView>
  );
}

export default MoneyDonation

const styles = StyleSheet.create({
  container:{
    marginTop:0,
    display:'flex',
   
    flexDirection:'column',
    
    
  },
  show:{
    fontFamily:'Rubik-Medium',
    textDecorationLine:'underline'

  },
  youtube:{
    display:'flex',
    flexDirection:'row',
    justifyContent: 'space-between'

  },
  youtubelogo:{
    display:'flex',
    flexDirection:'row',
    justifyContent: 'space-between'
    

  },
  card:{
    borderWidth:3,
    borderColor:'black',
    padding:10,
    marginTop:8,
    borderRadius:15,
  },
  titleText:{
    fontSize:24,
    fontFamily:'Rubik-Medium2'


  },
  descriptionText:{
    fontFamily:'Rubik-Light',
    color:'grey',
    
  },
  donationText:{
    textAlign:'center',
    fontFamily:'Rubik-Medium'
  },
  Progress:{
    borderRadius:15,

  },
  DescriptionView:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between'
  },
  DonateButton:{
    borderRadius:45,
    border:1,
    borderColor:'black',
    fontFamily:'Rubik-Medium',
  },
  bloodtext:{
  fontFamily:'Rubik-Medium'
},

  
})