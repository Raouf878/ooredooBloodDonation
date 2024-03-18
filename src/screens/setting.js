import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Settings from '../components/settings/setting'
import { SafeAreaView } from 'react-native-safe-area-context'

const Setting = () => {
  return (
    <SafeAreaView>
      <Settings/>
      </SafeAreaView>
  )
}

export default Setting

const styles = StyleSheet.create({})