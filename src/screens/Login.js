import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import tw from 'twrnc';
import React from 'react'
import WelcomeLogin from '../components/LoginPage/WelcomeLogin';
import Loginaccount from '../components/LoginPage/Loginaccount';

const Login = () => {
  return (
    <SafeAreaView style={[(tw`h-full w-full p-4`),{backgroundColor:'#f8e4e4'}]}>
    <WelcomeLogin/>
    <Loginaccount/>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
})