import React from 'react';
import { useFonts } from 'expo-font';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Popup = ({ visible, onClose, onSelectOption }) => {
    const [fontsLoaded] = useFonts({
        "Rubik-Medium": require("../../assets/fonts/Rubik-static/Rubik-Medium.ttf"),
        "Rubik-Light": require("../../assets/fonts/Rubik-static/Rubik-Light.ttf"),

        
       
        
      });
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.popup}>
            
            <Text style={{fontFamily:'Rubik-Medium', fontSize:18}}>Please Choose payment Method</Text>
            
          <TouchableOpacity onPress={() => onSelectOption('CIB/DAHABIA')}>
            <Text style={styles.paymentoption}>CIB/DAHABIA</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectOption('VISA')}>
            <Text style={styles.paymentoption}>VISA</Text>
          </TouchableOpacity>
          {/* Add more options as needed */}
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    
    
    
  },
  closeButton: {
    marginTop: 10,
    textAlign: 'center',
    color: 'grey',
    fontFamily:'Rubik-Medium'
  },
  paymentoption:{
    fontFamily:'Rubik-Light', 
    fontSize:16, 
    padding:5
  }
});

export default Popup;