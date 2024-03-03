import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TruncatedText = ({ text, maxLength }) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const truncatedText = showFullText ? text : text.slice(0, maxLength) + '...';
  const buttonText = showFullText ? 'Show Less' : 'Show More';

  return (
    <View style={{zIndex:50}}>
      <Text style={styles.description}>{truncatedText}</Text>
      {text.length > maxLength && (
        <TouchableOpacity onPress={toggleText}>
          <Text style={styles.toggleButton}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    toggleButton: {
        color: 'grey',
        textDecorationLine: 'underline',
        marginTop: 5,
        marginBottom:5
        
      },
    
  description:{
    maxWidth:'100%',
    fontFamily:'Rubik-Light'
    }
});

export default TruncatedText;