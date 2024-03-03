import React, { useState, useRef, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Mapbox from '@rnmapbox/maps'
import { useSelector } from 'react-redux';
import { getUserLat, getUserLon } from '../../redux/slices/Location';
import { PointAnnotation } from '@rnmapbox/maps';
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { GeoPoint } from 'firebase/firestore';
import { db } from '../../../FirebaseConfig'
import { Callout } from '@rnmapbox/maps';
import { geohashForLocation, geohashQueryBounds, distanceBetween } from 'geofire-common';
import BloodrequestsSkeleton from '../Skeletons/BloodrequestsSkeleton';

Mapbox.setAccessToken('pk.eyJ1IjoicmFvdWY5ODgiLCJhIjoiY2xzbjZod3JnMDB0NTJxbzkwZm9oMXZvdCJ9.hZVOTvYRd5kEwvQqRILm3g')

const RequestMap = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const [trueEffect, setTrueeffect] = useState(false)
  const [bloodrequests, setBloodrequests] = useState([])
  const [northeast, setNortheast] = useState([])
  const [centerlat, setCenterlat] = useState([])
  const [centerlon, setCenterlon] = useState([])
  const [southwest, setSouthwest] = useState([])
  const userlon = useSelector(getUserLon)
  const userlat = useSelector(getUserLat)
  const [loading, setLoading] = useState(true);

  const [coordinates] = useState([userlon, userlat])

  const GenerateNearbyRequests = (param) => {
    if (param) {
      setNortheast(new GeoPoint(param.properties.bounds.ne[1], param.properties.bounds.ne[0]))
      setSouthwest(new GeoPoint(param.properties.bounds.sw[1], param.properties.bounds.sw[0]))
      setCenterlat(param.properties.center[1])
      setCenterlon(param.properties.center[0])
      setTrueeffect(true)
    }
  }

  useEffect(() => {
    if (trueEffect) {
      const unsubscribe = GetUserRequests();
      return unsubscribe;
    }
  }, [trueEffect]);

  const GetUserRequests = () => {
    const radiusInM = 50 * 1000;
    const bounds = geohashQueryBounds([centerlat, centerlon], radiusInM);
    const promises = [];
    for (const b of bounds) {
      const q = query(
        collection(db, 'BloodRequests'),where('Status','==','Waiting'));
      promises.push(onSnapshot(q, (snapshot) => {
        const matchingDocs = [];
        snapshot.forEach((doc) => {
          const lat = doc.get('lat');
          const lng = doc.get('lon');
          const distanceInKm = distanceBetween([lat, lng], [centerlat, centerlon]);
          const distanceInM = distanceInKm * 1000;
          if (distanceInM <= radiusInM) {
            matchingDocs.push(doc.data());
          }
        });
        setBloodrequests(matchingDocs);
        setLoading(false);
      }));
    }
    return () => promises.forEach(unsubscribe => unsubscribe());
  }
  const renderItem = ({ item, index }) => (
    <View style={{
      backgroundColor: 'floralwhite',
      borderRadius: 5,
      height: 150,
      borderWidth:1,
      borderColor:'black',
      padding: 10,
      marginLeft: 25,
      marginRight: 25,
    }}>
      <Text style={{ fontSize: 30 }}>{item.NeededBloodType}</Text>
      <Text>rae</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', height: '100%', position: 'relative', }}>
        <View style={styles.container}>
          <Mapbox.MapView
            style={styles.map}
            rotateEnabled={false}
            scrollEnabled={false}
            scaleBarEnabled={false}
            pitchEnabled={false}
            zoomEnabled={false}
            onMapIdle={(result) => GenerateNearbyRequests(result)}
          >
            <Mapbox.Camera zoomLevel={12} centerCoordinate={coordinates} animationMode='flyTo' animationDuration={4500} />
            <PointAnnotation
              id="pointAnnotation"
              coordinate={coordinates}
            />
          </Mapbox.MapView>
        </View>
        
        {loading ? (
          <BloodrequestsSkeleton/>
          ) : (
          <View style={{ position: 'absolute', bottom: 0, paddingBottom: 1, backgroundColor: 'white', width: '100%', height: '25%', paddingTop: 'auto', borderTopLeftRadius: 15, borderTopRightRadius: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 35 }}>
            <Carousel
              layout={"default"}
              ref={carouselRef}
              data={bloodrequests}
              sliderWidth={400}
              itemWidth={400}
              renderItem={renderItem}
              onSnapToItem={(index) => setActiveIndex(index)}
            />
          </View>
          )}
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '30%'
  },
  map: {
    flex: 1,
  }
})

export default RequestMap;
