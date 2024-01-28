import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { useFonts } from "expo-font";


const WelcomeLogin = () => {
    
        const [fontsLoaded] = useFonts({
          "Rubik-Medium": require("../../assets/fonts/Rubik-static/Rubik-Medium.ttf"),
        });
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/Blood/logo.png')} style={styles.image}></Image>
      <Text style={styles.instructions}>Login to your account</Text>
    </View>
  )
}

export default WelcomeLogin
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'flex-start',
        alignItems: 'center',
        paddingTop:25,
      },
      image: {
        width: '40%',
        height:'60%',
        resizeMode: 'contain',
      },
      instructions: {
        marginTop: 1,
        fontSize: 20,
        textAlign: 'center',
        fontFamily:'Rubik-Medium',
    
      },

})