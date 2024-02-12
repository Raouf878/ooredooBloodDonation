import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, FlatList, ProgressBarAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
    donatedAmount: 7500,
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

const donationcards = () => {
  const navigation=useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.titleText}>Donations Projects</Text>
      <Text style={styles.descriptionText}>Please check the full list of projects and donate using your dahabia card.</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default donationcards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backText: {
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  descriptionText: {
    marginBottom: 20,
  },
  card: {
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  description: {},
  donationText: {},
});
