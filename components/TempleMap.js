import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const TempleMap = ({ navigation, templeList, search, name }) => {
  const mapViewRef = useRef(null);
  const [position, setPosition] = useState({
    latitude: 21.7679,
    longitude: 78.8718,
    latitudeDelta: 20,
    longitudeDelta: 20,
  });

  console.log('templeList from map =>', templeList)

  const onMarkClick = id => {
    if (name === 'temple') {
      setTimeout(() => {
        navigation.navigate('templedetail', {
          id: id,
        });
      }, 300);
    } else if (name === 'pujari') {
      setTimeout(() => {
        navigation.navigate('pujariDetail', {
          id: id,
        });
      }, 300);
    }
  };

  return (
    <MapView
      ref={mapViewRef}
      style={{ width: '100%', height: '100%' }}
      provider={PROVIDER_GOOGLE}
      initialRegion={position}
      showsMyLocationButton={true}
      followsUserLocation={true}
      showsCompass={true}
      scrollEnabled={true}
      zoomEnabled={true}
      pitchEnabled={true}
      rotateEnabled={true}
    >
      {templeList?.map(item => (
        <Marker
          key={item?._id}
          title={name === 'temple' ? item?.title : item?.name}
          description={`${item?.location?.city} , ${item?.location?.state}`}
          style={{ width: 26, height: 28 }}
          image={require('../img/srchLogo.png')}
          onPress={() => onMarkClick(item?._id)}
          coordinate={{
            latitude: item?.mapsLatLng?.lat || 0,
            longitude: item?.mapsLatLng?.lng || 0,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0121,
          }}></Marker>
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  srchLogoDiv: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: 30,
    height: 30,
    borderRadius: 110,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 8 },
    shadowOpacity: 1,
    elevation: 6,
    left: '50%',
    top: '50%',
    marginLeft: -55,
    marginTop: -55,
  },
});
export default TempleMap;
