import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { useFonts } from "expo-font";


const WelcomeTitle = () => {
    
        const [fontsLoaded] = useFonts({
          "Rubik-Medium": require("../../assets/fonts/Rubik-static/Rubik-Medium.ttf"),
        });
        if (!fontsLoaded) {
            return <Text>Loading...</Text>;
          }
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/Blood/logo.png')} style={styles.image}></Image>
      <Text style={styles.instructions}>Welcome On Board Hero</Text>
    </View>
  )
}

export default WelcomeTitle

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
        marginTop: 20,
        fontSize: 20,
        textAlign: 'center',
        fontFamily:'Rubik-Medium',
    
      },

})