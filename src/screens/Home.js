import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { selectLoadingStates } from '../redux/slices/Credentials';
import Header from '../components/Home/Header';
import Body from '../components/Home/Body';
import RecentActivity from '../components/Home/RecentActivity';
import CircleSkeleton from '../components/Skeletons/CircleSkeleton';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
          <Header />
          <Body />
          <RecentActivity />
        
      
      
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8, // Adjust padding as needed
  },
});
