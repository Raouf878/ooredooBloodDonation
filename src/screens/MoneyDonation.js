import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, FlatList,ScrollView, ProgressBarAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
const DATA = [
  {
    id: '1',
    title: 'Project 1',
    description: 'Description for Project 1',
   
    totalAmount: 10000,
    donatedAmount: 5000,
  },
  {
    id: '2',
    title: 'Project 2',
    description: 'Description for Project 2',
    
    totalAmount: 15000,
    donatedAmount: 500,
  },
  // Add more projects here if needed
];

const renderItem = ({ item }) => (
  <View style={styles.card}>
   
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.description}>{item.description}</Text>
    <Text style={styles.donationText}>Donated: ${item.donatedAmount} / ${item.totalAmount}</Text>
    <ProgressBarAndroid
      styleAttr="Horizontal"
      indeterminate={false}
      progress={item.donatedAmount / item.totalAmount}
    />
    <Button title="Donate" onPress={() => {/* Add donation logic */}} />
  </View>
);

const MoneyDonation = () => {
  
  return (
    <SafeAreaView style={{padding:10}}>
      <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.backText}>Back</Text>
      <Text style={styles.titleText}>Donations Projects</Text>
      <Text style={styles.descriptionText}>Please check the full list of projects and donate using your dahabia card.</Text>
      {DATA.map(item => (
        <View key={item.id}>
          {renderItem({ item })}
        </View>
      ))}
    </ScrollView>
    </SafeAreaView>
  );
}

export default MoneyDonation

const styles = StyleSheet.create({
  container:{
    marginTop:15,
    display:'flex',
    flexDirection:'column',
    
    
  },
  card:{
    borderWidth:1,
    borderColor:'black',
    padding:10,
    marginTop:8,
    borderRadius:15,
  }
  
})