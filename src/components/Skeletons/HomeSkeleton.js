import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HStack,Skeleton,VStack,Center } from 'native-base'
import GradientText from '../../utils/TextGradient'
import { RubikMediumFont } from '../../utils/Fontexporter'

const HomeSkeleton = () => {
    RubikMediumFont()
  return (
    <View style={{backgroundColor:'white', width:'100%', height:'50'}}>
       <Center w="100%">
        <HStack>
            <GradientText style={{ fontSize:25,
    fontFamily:'Rubik-Medium'}}>Hello, </GradientText>
        <Skeleton flex="1" w="40%" h="30" mb="2"   rounded="md" startColor="text.300" />
        </HStack>
    
       
      
    </Center>
    </View>
  )
}

export default HomeSkeleton

const styles = StyleSheet.create({})