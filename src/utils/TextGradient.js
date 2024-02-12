import React from 'react';
import {Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const GradientText=props=>{
    return(
        <MaskedView maskElement={<Text {...props} />}>
        <LinearGradient
        colors={['#e36f1e','#eb1a22' ]}>
        <Text {...props} style={[props.style, {opacity: 0}]} />
      </LinearGradient>
      </MaskedView>
    )
}

export default GradientText;