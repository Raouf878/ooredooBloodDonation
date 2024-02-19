import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Map from '../components/BloodRequests/Map'

import { SafeAreaView } from 'react-native-safe-area-context'
import AddDonation from '../components/BloodRequests/AddDonation'

const BloodRequest = () => {
  return (
    <View style={styles.container}>
    <Map/>
    <View style={styles.createRequestContainer}>
      <AddDonation />
    </View>
  </View>
);
  }


export default BloodRequest

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
  mapContainer: {
    flex: 0.65,
    zIndex:4,
     // Map container occupies 65% of the screen's height
  },
  createRequestContainer: {
    flex: 0.35, // CreateRequest container occupies 35% of the screen's height
    position:'absolute',
    height: '35%',
    width:'100%',
    bottom:0
  },
});