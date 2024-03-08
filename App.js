import React,{useState,useRef,useEffect} from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store/store'
import AppNavigation from './src/navigation/appNavigation';
import { RootSiblingParent } from 'react-native-root-siblings';
import { NativeBaseProvider, Text, Box,extendTheme } from "native-base";
import { GestureHandlerRootView } from 'react-native-gesture-handler';


function App() {

  window.navigator.userAgent = "ReactNative";
  const theme=extendTheme({
    components:{
      ActionsheetContent:{
        baseStyle:{
          alignItems: 'left',
          

        }
        
      }
    }
  })
  return (
    <RootSiblingParent>
      <NativeBaseProvider theme={theme}>
    <Provider store={store}>
      <GestureHandlerRootView style={{flex:1}}>
      <AppNavigation />
      </GestureHandlerRootView>
      </Provider>
      </NativeBaseProvider>
      </RootSiblingParent>
   
  );
}

export default App;