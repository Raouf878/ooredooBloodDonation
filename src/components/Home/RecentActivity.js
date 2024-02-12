import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
const ooredooimage = require('../../assets/images/ooredoo.png');


const RecentActivity = () => {
  return (
    <View>
        
       
        <View style={styles.footer}>
        <Text style={styles.footer_text}>Powered By</Text>
        <Image
        source={ooredooimage} style={styles.ooredooimage}></Image>
      </View>
    </View>
  )
}

export default RecentActivity

const styles = StyleSheet.create({
    footer:{
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center',
        marginTop:25,
        
        
        
      },
      text:{
        fontSize:24,
        color:'white',
        fontFamily:'Rubik-Medium2'

      },
      footer_text:{
        fontFamily:'Rubik-Medium',
        color:'grey',
        fontSize:14,
        
      },
      ooredooimage:{
        width:90,
        height:30,
        marginTop: -10,
        
    
      },
      footerQuote:{
        padding:10,
        backgroundColor:'#7354d3',
        height:80,
        display:'flex',
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
        
      }
})