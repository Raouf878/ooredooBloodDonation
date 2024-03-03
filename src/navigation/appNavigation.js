import { NavigationContainer } from "@react-navigation/native";
 import { createNativeStackNavigator } from "@react-navigation/native-stack";
 import { onAuthStateChanged } from "firebase/auth";
 import { useDispatch,useSelector } from "react-redux";
import{FIREBASE_AUTH} from '../../FirebaseConfig'
 import { setUserid } from "../redux/slices/Credentials";
 import {selectUserId} from "../redux/slices/Credentials";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import MoneyDonation from "../screens/MoneyDonation";
import BloodRequest from "../screens/BloodRequest";
import BloodRequestNearby from "../screens/BloodRequestNearby";
import { CustomHeader } from "../components/HeaderMap/CustomHeader";


const Stack=createNativeStackNavigator();

export default function AppNavigation(){
    const credentials=useSelector(selectUserId)
    const dispatch=useDispatch()
    
    onAuthStateChanged(FIREBASE_AUTH,u=>{
        console.log(u.uid);
        dispatch(setUserid(u.uid));
    })
    if(credentials){
        return (
            <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen options={{headerShown:false}} name="Home" component={Home}/>
                <Stack.Screen  name="MoneyDonation" options={{title:'',
             headerShadowVisible: false,}} component={MoneyDonation}/>
                <Stack.Screen
        name="BloodRequest"
        component={BloodRequest}
        options={{
          title:'',
          headerTransparent:true
        }}
        
      />
      <Stack.Screen options={{ title:'',
          headerTransparent:true}} name="BloodRequestNearby" component={BloodRequestNearby}/>
                
                
            </Stack.Navigator>
            </NavigationContainer>
        )
    }else{
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                
                <Stack.Screen options={{headerShown:false}} name="Login" component={Login}/>
                <Stack.Screen options={{headerShown:false}} name="Signup" component={Signup}/>

                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}