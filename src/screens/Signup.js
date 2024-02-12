import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc';
import React from 'react'
import WelcomeTitle from '../components/signupage/WelcomeTitle';
import Createaccount from '../components/signupage/Createaccount';

const Signup = () => {
  return (
    <SafeAreaView style={[(tw`h-full w-full p-4`),{backgroundColor:'#f8e4e4'}]}>
    <WelcomeTitle/>
    <Createaccount/>
    </SafeAreaView>
  )
}

export default Signup

const styles = StyleSheet.create({
})