import { StyleSheet, Text, View,Image } from 'react-native'
import React,{useState} from 'react'
import 'expo-dev-client';
import Mapbox from '@rnmapbox/maps';
import { PointAnnotation } from '@rnmapbox/maps';
import{useSelector} from 'react-redux'
import { getUserLat,getUserLon } from '../../redux/slices/Location';
const marker=require('../../assets/images/Blood/travel_10875705.png')


Mapbox.setAccessToken('pk.eyJ1IjoicmFvdWY5ODgiLCJhIjoiY2xzbjZod3JnMDB0NTJxbzkwZm9oMXZvdCJ9.hZVOTvYRd5kEwvQqRILm3g');

const Map = () => {
 
  const userlon=useSelector(getUserLon)
  const userlat=useSelector(getUserLat)
  const[drag,setDrag]=useState('')
  const [coordinates] = useState([userlon, userlat]);
  
  return (
    <View style={styles.container}>
        <Mapbox.MapView
          style={styles.map}
          rotateEnabled={false}
          scaleBarEnabled={false}
          onRegionDidChange={(result) =>console.log(result.geometry.coordinates)}
          

          
         
        >
          <Mapbox.Camera zoomLevel={15} centerCoordinate={coordinates} animationMode='flyTo'  animationDuration={4500}/>
         
           
        </Mapbox.MapView>
        <View style={styles.markerContainer}>
        <View style={styles.marker} >
        <Image style={{width:40,height:40}}source={marker}></Image>
          </View>
        
      </View>
    </View>
        
        
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    position: 'absolute',
    top: '46%',
    left: '46%',
    zIndex: 2, // Make sure it's above the map
  },
  marker: {
    width: 40,
    height: 40,
     // Example background color
    borderRadius: 20,
  },
});
export default Map;