import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
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
      placeholder='where are you?'
      styles={{
        
        textInput:{
            flex: 1,
      height: 40,
      marginLeft: 10, // Adjust as needed
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'gray',
      paddingLeft: 10,

        }
      }}
      query={{
        key:GOOGLE_KEY,
        language:'en',
      }}
      nearbyPlacesAPI='GooglePlacesSearch'
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
      marginTop:15
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
  });