import React,{useState} from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Assuming you're using Expo for Linear Gradient

const CustomButton = ({ buttonText, colors, buttonStyle, textStyle,onPress }) => {
  
  return (
    <TouchableOpacity style={[styles.buttonContainer, buttonStyle]} onPress={onPress}>
      <LinearGradient colors={colors} style={styles.buttonGradient}>
        <Text style={[styles.buttonText, textStyle]}>{buttonText}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default CustomButton;