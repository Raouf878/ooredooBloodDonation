import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Map from '../components/BloodRequests/Map'
import { SafeAreaView } from 'react-native-safe-area-context'

const BloodRequest = () => {
  return (
    <SafeAreaView>
      <Map/>
    </SafeAreaView>
  )
}

export default BloodRequest

const styles = StyleSheet.create({})