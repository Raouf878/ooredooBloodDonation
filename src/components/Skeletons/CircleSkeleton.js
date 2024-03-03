import { StyleSheet, Text, View } from 'react-native'
import { HStack,Skeleton,VStack,Center } from 'native-base'
import React from 'react'

const CircleSkeleton = () => {
  return (
    <View style={{ width:'100%', height:'50'}}>
       <Center w="100%">
       
       <Skeleton size="60" rounded="full" />
        
    </Center>
    </View>
  )
}

export default CircleSkeleton

const styles = StyleSheet.create({})