import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HStack,Skeleton,VStack,Center } from 'native-base'

const BloodrequestsSkeleton = () => {
  return (
    <View style={{ position: 'absolute', bottom: 0, backgroundColor: 'white', width: '100%', height: '25%', borderTopLeftRadius: 15, borderTopRightRadius: 15,padding:25 }}>
       <Center w="100%">
      <HStack w="100%" maxW="95%" borderWidth="1" space={8} rounded="md" _dark={{
      borderColor: "coolGray.500"
    }} _light={{
      borderColor: "coolGray.200"
    }} p="4">
        <Skeleton flex="1" h="130" rounded="md" startColor="coolGray.100" />
        <VStack flex="3" space="4">
          <Skeleton startColor="amber.300" />
          <Skeleton.Text />
          <HStack space="2" alignItems="center">
            <Skeleton size="5" rounded="full" />
            <Skeleton h="3" flex="2" rounded="full" />
            <Skeleton h="3" flex="1" rounded="full" startColor="indigo.300" />
          </HStack>
        </VStack>
      </HStack>
    </Center>
    </View>
  )
}

export default BloodrequestsSkeleton

const styles = StyleSheet.create({})