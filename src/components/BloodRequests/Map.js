import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import 'expo-dev-client';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken('pk.eyJ1IjoicmFvdWY5ODgiLCJhIjoiY2xzbjZod3JnMDB0NTJxbzkwZm9oMXZvdCJ9.hZVOTvYRd5kEwvQqRILm3g');

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

   
  },

  container: {
    height: 300,

    width: 300,
  },

  map: {
    flex: 1,
    zIndex:4
  },
})