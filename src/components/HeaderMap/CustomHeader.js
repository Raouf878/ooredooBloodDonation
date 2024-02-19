import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken('pk.eyJ1IjoicmFvdWY5ODgiLCJhIjoiY2xzbjZod3JnMDB0NTJxbzkwZm9oMXZvdCJ9.hZVOTvYRd5kEwvQqRILm3g');
import {GOOGLE_KEY} from '@env'


export const CustomHeader = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      
      />
      </View>
      
   
   
  
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 10, // Adjust as needed
      paddingRight: 10,
      marginTop:15,
      zIndex:0
    },
    input: {
      flex: 1,
      height: 40,
      marginLeft: 10, // Adjust as needed
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'gray',
      paddingLeft: 10,
    },
    page: {
      flex: 1,
  
     
    },
  
    containerr: {
      height: 300,
  
      width: 300,
    },
  
    map: {
      flex: 1,
      zIndex:4
    },
  });