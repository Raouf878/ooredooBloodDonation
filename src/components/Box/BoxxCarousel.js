import React from 'react';
import { Text, View,TouchableOpacity,StyleSheet} from 'react-native';
import { Box, IconButton,CloseIcon, Icon } from 'native-base';
import { Badge, HStack } from 'native-base';
import { RubikMediumFont, RubikLightFont } from '../../utils/Fontexporter';
import TruncatedText from '../../utils/TruncatedText';
import CustomButton from '../Buttons/GradientButton';


const Boxx = ({data,CancelText,buttonStyle,textStyle,ButtonOnpress,ButtonColors} ) => {
  RubikMediumFont();
  RubikLightFont()
  return (
      
        <Box maxW="100%"
        maxH="auto"
          key={data.id}
          
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
                Patient name: {data.PatientName}
              </Text>
              <Text style={{ fontFamily: 'Rubik-Medium', fontSize: 16 }}>Needed blood type: {data.NeededBloodType}</Text>
              <View>
                <TruncatedText style={{fontFamily:'Rubik-Light'}} text={data.Description} maxLength={60}/>
              </View>
              
              <View style={{ flex:1,flexDirection: 'column',  }}>
                <View style={{width:'100%', flex:1,flexDirection:'row'}}>
                <Text style={{ fontFamily: 'Rubik-Medium' }}>Status: </Text>
                <Badge colorScheme={data.Status === 'Finished' ? 'green' : 'red'} style={{ borderRadius: 5, flex: 1 }}>
                  {data.Status}
                </Badge>
                </View>
                <View  >
            {data.Status !== 'Finished' && ( // Render cancel donation button only if status is not 'Finished'
              <>
                <CustomButton
                  buttonText={CancelText}
                  colors={ButtonColors}
                  buttonStyle={buttonStyle}
                  textStyle={textStyle}
                  onPress={ButtonOnpress}
                  />
                
              </>
            )}
          </View>
              </View>
            </View>
          </View>
         
          
        </Box>
     
  
  );
};





const styles = StyleSheet.create({
  bloodtext:{
    fontFamily:'Rubik-Medium'
  },
  signup:{
    marginTop:10
    
    
  }
})


export default Boxx;