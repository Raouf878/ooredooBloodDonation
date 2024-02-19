import React from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BloodTypePicker = ({ data, selectedBloodType, onSelectBloodType }) => {
  return (
    <FlatList
      data={data}
      numColumns={4}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{ width: '25%' }}
          onPress={() => onSelectBloodType(item.type === selectedBloodType ? null : item.type)}
        >
          <LinearGradient
            colors={['#eb1a22', '#e36f1e']}
            style={[
              styles.bloodContainer,
              {
                borderColor: item.type === selectedBloodType ? 'black' : 'transparent',
              },
            ]}
          >
            <Text style={styles.bloodText}>{item.type}</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  bloodContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginRight: 5,
    marginTop: 5,
    borderWidth: 2,
  },
  bloodText: {
    color: 'white',
    fontSize: 26,
  },
});

export default BloodTypePicker;