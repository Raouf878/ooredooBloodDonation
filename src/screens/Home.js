import { StyleSheet, Text, View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import tw from 'twrnc'
import { selectUserId } from '../redux/slices/Credentials'
import {  useSelector } from 'react-redux'
import Header from '../components/Home/Header'
import Body from '../components/Home/Body'
import RecentActivity from '../components/Home/RecentActivity'



const Home = () => {
  const id=useSelector(selectUserId)
  return (
    <SafeAreaView style={[(tw`h-full w-full p-2 `)/*,{backgroundColor:'#f8e4e4'}*/ ]}>
      <Header/>
      <Body/>
      <RecentActivity/>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})