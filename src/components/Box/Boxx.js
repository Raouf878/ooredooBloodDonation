import React from 'react';
import { Text, View,TouchableOpacity,StyleSheet} from 'react-native';
import { Box, NativeBaseProvider, IconButton,CloseIcon, Icon } from 'native-base';
import { Badge, HStack } from 'native-base';
import { addDoc, collection, query, where, onSnapshot,doc,updateDoc } from 'firebase/firestore'
import { RubikMediumFont, RubikLightFont } from '../../utils/Fontexporter';
import { db } from '../../../FirebaseConfig';
import TruncatedText from '../../utils/TruncatedText';
import CustomButton from '../Buttons/GradientButton';

const onButtonPress=async(data)=>{
  const documentId = data
  console.log(documentId);
  const documentRef = doc(db,'BloodRequests',documentId)
  const newData = {
    DonatedUser:''
  };
  try {
    await updateDoc(documentRef, newData);
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }}
const Boxx = ({data,CancelText,buttonStyle,textStyle,ButtonColors} ) => {
  RubikMediumFont();
  RubikLightFont()
  
  return (
    <>
      {data.map((item) => (
        <Box maxW="100%"
        maxH="auto"
        
          key={item.id}
          bg={'white'}
          py="5"
          px='5'
          
          rounded="lg"
          _text={{ fontSize: 'md', fontWeight: 'bold', color: 'white', alignSelf: 'flex-start' }}
          style={{
            borderWidth: 1,
            
            borderColor: 'black',
            borderRadius: 8,
            marginBottom: 10,
            
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
              
              <View style={{ flex:1,flexDirection: 'column',  }}>
                <View style={{width:'100%', flex:1,flexDirection:'row'}}>
                <Text style={{ fontFamily: 'Rubik-Medium' }}>Status: </Text>
                <Badge colorScheme={item.data.Status === 'Finished' ? 'green' : 'red'} style={{ borderRadius: 5, flex: 1 }}>
                  {item.data.Status}
                </Badge>
                </View>
                <View  >
            {item.data.Status !== 'Finished' && ( // Render cancel donation button only if status is not 'Finished'
              <>
                <CustomButton
                  buttonText={CancelText}
                  colors={ButtonColors}
                  buttonStyle={buttonStyle}
                  textStyle={textStyle}
                  onPress={() => onButtonPress(item.id)}
                  />
                
              </>
            )}
          </View>
              </View>
            </View>
          </View>
         
          
        </Box>
      ))}
    </>
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
