import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store/store';
import AppNavigation from './src/navigation/appNavigation';
import { RootSiblingParent } from 'react-native-root-siblings';


function App() {
  window.navigator.userAgent = "ReactNative";
  return (
    <RootSiblingParent>
    <Provider store={store}>
      <AppNavigation />
      </Provider>
      </RootSiblingParent>
   
  );
}

export default App;