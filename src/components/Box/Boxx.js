import React from 'react';
import { Text, View,TouchableOpacity } from 'react-native';
import { Box, NativeBaseProvider, IconButton,CloseIcon, Icon } from 'native-base';
import { Badge, HStack } from 'native-base';
import { RubikMediumFont, RubikLightFont } from '../../utils/Fontexporter';
import TruncatedText from '../../utils/TruncatedText';


const App = ({ data },CancelStyle,CancelText) => {
  RubikMediumFont();
  RubikLightFont()
  return (
    <>
      {data.map((item) => (
        <Box maxW="100%"
        maxH="auto"
          key={item.id}
          bg={{
            linearGradient: {
              colors: ['white', 'white'],
            },
          }}
          py="5"
          px='5'
          
          rounded="lg"
          _text={{ fontSize: 'md', fontWeight: 'bold', color: 'white', alignSelf: 'flex-start' }}
          style={{
            borderWidth: 1,
            
            borderColor: 'black',
            borderRadius: 8,
            marginBottom: 10,
            elevation: 5,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
          }}
        >
          <View >
            <View>
              <Text style={{ fontFamily: 'Rubik-Medium', fontSize: 16 }}>
                Patient name: {item.data.PatientName}
              </Text>
              <Text style={{ fontFamily: 'Rubik-Medium', fontSize: 16 }}>Blood type: {item.data.NeededBloodType}</Text>
              <View>
                <TruncatedText style={{fontFamily:'Rubik-Light'}} text={item.data.Description} maxLength={60}/>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Rubik-Medium' }}>Status: </Text>
                <Badge colorScheme={item.data.Status === 'Finished' ? 'green' : 'red'} style={{ borderRadius: 5, flex: 1 }}>
                  {item.data.Status}
                </Badge>
              </View>
            </View>
          </View>
          <View space={2} style={{ position: 'absolute', right: 10, bottom: 5,}}>
            {item.data.Status !== 'Finished' && ( // Render cancel donation button only if status is not 'Finished'
              <>
                <TouchableOpacity style={CancelStyle}>
                  <Text style={{fontFamily:'Rubik-Medium'}}>{CancelText} </Text>
                  </TouchableOpacity>
                
              </>
            )}
          </View>
        </Box>
      ))}
    </>
  );
};

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const Boxx = ({ data }) => {
  return (
    <NativeBaseProvider config={config}>
      <App data={data} />
    </NativeBaseProvider>
  );
};

export default Boxx;
