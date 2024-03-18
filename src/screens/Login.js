import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc';
import React from 'react'
import WelcomeLogin from '../components/LoginPage/WelcomeLogin';
import Loginaccount from '../components/LoginPage/Loginaccount';


const Login = () => {
  return (
    <SafeAreaView style={{height:'100%',padding:10}}>
    <WelcomeLogin/>
    <Loginaccount/>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
})