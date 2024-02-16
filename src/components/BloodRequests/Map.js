import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CustomHeader } from '../HeaderMap/CustomHeader'
import Mapbox from '@rnmapbox/maps';
Mapbox.setAccessToken('pk.eyJ1IjoicmFvdWY5ODgiLCJhIjoiY2xzbjZtdGVqMDE0MDJscDlzbWl5ejE1bCJ9.J0gqgHQUt7suFKp8L2C7OQ');

const Map = () => {
  return (
    <View style={styles.page}>
    <View style={styles.container}>
      <Mapbox.MapView style={styles.map} />
    </View>
  </View>
  )
}

export default Map

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 300,
    width: 300,
  },
  map: {
    flex: 1
  }
})