import { StyleSheet, Text, View, Image, TouchableOpacity,ImageBackground,ActivityIndicator,ScrollView } from 'react-native';
import { addDoc, collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../../../FirebaseConfig'
import React, { useEffect,useState } from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import GradientText from '../../utils/TextGradient';
import { useFonts } from "expo-font";
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';
import Svg, { Line, Rect } from 'react-native-svg';
import { selectedFirstName,setFirstName,selectUserLoading,selectLoadingStates,setLoadingState } from '../../redux/slices/Credentials';
import { useDispatch,useSelector } from 'react-redux';
import HomeSkeleton from '../Skeletons/HomeSkeleton';



import { fetchUserData } from '../../redux/thunks/userHomeThunks';
const bloodImg = require('../../assets/images/Donations/Blood donation-amico.png');
const DonationsImg = require('../../assets/images/Donations/injury_3359179.png');
const ooredooimage = require('../../assets/images/ooredoo.png');
const ContributeMoney=require('../../assets/images/Donations/donate_7440975.png')
const blooodrequest=require('../../assets/images/Donations/sos_7440980.png')
import BloodRequest from '../../screens/BloodRequest';
import BloodRequestNearby from '../../screens/BloodRequestNearby';
import { RubikMediumFont,RubikLightFont } from '../../utils/Fontexporter'

import { selectUserId } from '../../redux/slices/Credentials';


import MoneyDonation from '../../screens/MoneyDonation'
import  Boxx  from '../Box/Boxx';


const Body = () => {

  RubikMediumFont();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selectedUserIdd = useSelector(selectUserId);
  const selectedUserFirstName = useSelector(selectedFirstName);
  const [bloodrequests, setBloodrequests] = useState([])
  const userloading=useSelector(selectUserLoading)
const [DonationDataLoading,setDonationdataloading]=useState(true)

  useEffect(() => {
    
    dispatch(fetchUserData(selectedUserIdd));
  }, [dispatch, selectedUserIdd]);
  

  useEffect(() => {
    const q = query(collection(db, "BloodRequests"), where("DonatedUser", "==", `${selectedUserIdd}`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const requests = [];
      querySnapshot.forEach((doc) => {
        const requestData = {
          id: doc.id,
          data: doc.data()
        };
        requests.push(requestData);
      });
      setBloodrequests(requests);
      console.log(requests);
      setDonationdataloading(false)
    });
  
    // Cleanup function
    return () => unsubscribe();
  }, []); // Empty dependency array to ensure it runs only once on component mount
  

  console.log('raouf',selectedUserFirstName);
  console.log(selectedUserIdd);
 
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.requestContainer} onPress={()=>navigation.navigate(BloodRequestNearby)}>
        <View >
        { userloading ? <HomeSkeleton/>
      :<> 
        <GradientText style={styles.Hello}>
            Hello,{selectedUserFirstName}
        </GradientText>
        </>}
          <Text style={{fontFamily:'Rubik-Medium'}}>Please check new blood requests</Text>
          <GradientText style={{fontFamily:'Rubik-Medium'}}>
            Donation requests {'>'}
        </GradientText>
        </View>
        <View style={styles.imageContainer}>
          <Image source={bloodImg} style={styles.bloodImg} />
        </View>
        </TouchableOpacity>
      <View style={{paddingTop:10, display:'flex',flexDirection:'row',justifyContent:'space-between' }}>
      <TouchableOpacity style={styles.LineTwoBodyBlock} onPress={()=>navigation.navigate(BloodRequest)}>
        <LinearGradient
           colors={['#eb1a22','#e36f1e']} style={{height:150,borderRadius:15}}>
            
        <View style={styles.redContainerFlex}>
          {/* 
        <View>
          <Image source={DonationsImg} style={styles.DonationsImg}></Image>
        </View>
        */}
        <View style={{flex:1,justifyContent:'center',alignItems:'flex-start',padding:7,position:'absolute'}}>
          {/*this section is for red container text */}
          <Text style={{fontFamily:'Rubik-Medium', fontSize:34, color:'white',}}>+</Text>
          <Text style={{fontFamily:'Rubik-Medium',fontSize:18, color:'white'}}>Need Blood?</Text>
          <Text style={{fontFamily:'Rubik-Medium'}}>Make a request for nearby donors {'>'}</Text>
        </View>
        </View>
        </LinearGradient>
        </TouchableOpacity>
        
        
        <TouchableOpacity style={[styles.LineTwoBodyBlock,{backgroundColor:'white'}]} onPress={()=>navigation.navigate(MoneyDonation)}>
        <View style={{flex:1,justifyContent:'center',alignItems:'flex-start',padding:7}}>
        
          {/*this section is for red container text */}
          <Image source={ContributeMoney} style={styles.contributeImage}></Image>
          <GradientText style={{fontFamily:'Rubik-Medium',fontSize:18, color:'black'}}>Donate Money</GradientText>
          <Text style={{fontFamily:'Rubik-Medium'}}>we need your funding for some projects {'>'}</Text>
        </View>
        </TouchableOpacity>
        
        {/* Additional Views */}
      </View>
      <View style={{borderWidth:1,borderColor:'black',flex:1,borderRadius:15,marginTop:15}}>
        <View style={{margin:8}}>
        <Text style={{fontFamily:'Rubik-Medium',fontSize:24}}>Recent Donations</Text>
       
        </View>

        <ScrollView>
        { DonationDataLoading ? <ActivityIndicator size="small" color="grey" />
      :<> 
        <View style={{padding:10}}>
        <Boxx data={bloodrequests} CancelStyle={{flex:1,flexDirection:'row'}} CancelText={'Cancel Donation X'}/>
        
        </View>
        </>}
        </ScrollView>
        
       
       
      
       
       
      </View>
    </View>
  );
};

export default Body;

const styles = StyleSheet.create({
  additionalContainer: {
    marginTop:-125,
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth:1,
    borderColor:'black', 
  },
  contributeImage:{
    width:55,
    height:55,
    

  },
  container: {
    flex: 1,
    
    
    
    
  },
  bloodImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  Hello:{
    fontSize:25,
    fontFamily:'Rubik-Medium'

  },
  requestContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth:1,
    borderColor:'black', 
  },
  imageContainer: {
    width: 100,
    height: 90,
  },
  LineTwoBodyBlock:{
    width:'49%',
    borderRadius:15,
    minHeight:150,
    maxHeight:'48%',
    backgroundColor:'black',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth:1,
    borderColor:'black',
    
  },
  DonationsImg:{
    height:60,
    width:'full',
    resizeMode:'contain',
    

  },
  redContainerFlex:{
    display:'flex',
    flexDirection:'column',
    
   
  },
  
});