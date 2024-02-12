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


const Stack=createNativeStackNavigator();

export default function AppNavigation(){
    const credentials=useSelector(selectUserId)
    const dispatch=useDispatch()
    
    onAuthStateChanged(FIREBASE_AUTH,u=>{
        dispatch(setUserid(u.uid));
    })
    if(credentials){
        return (
            <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen options={{headerShown:false}} name="Home" component={Home}/>
                <Stack.Screen options={{headerShown:false}} name="MoneyDonation" component={MoneyDonation}/>
                
            </Stack.Navigator>
            </NavigationContainer>
        )
    }else{
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                
                <Stack.Screen options={{headerShown:false}} name="Home" component={Login}/>
                <Stack.Screen options={{headerShown:false}} name="Signup" component={Signup}/>

                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}