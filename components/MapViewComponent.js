import { StyleSheet} from 'react-native'
import React from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useState } from 'react';
import { useEffect } from 'react';

const MapViewComponent = (props) => {

    const { coordinate, setCoordinate } = props

    // console.log('LAT LNG ===>>', lat, lng)

    // const [coordinate, setCoordinate] = useState({
    //     latitude: 21.7679,
    //     longitude: 78.8718,
    //     latitudeDelta: 20,
    //     longitudeDelta: 20,
    // })

    console.log('coordinate',coordinate)

    // const updateCordinates = () => {
    //     setCoordinate({
    //         ...coordinate, latitude: lat, longitude: lng
    //     })
    // }

    // useEffect(() => {
    //     if (lat !== '...' && lng !== '...') {
    //         setCoordinate({
    //             ...coordinate, latitude: lat, longitude: lng
    //         })
    //     }
    // }, [lat, lng])

    let { latitude, longitude } = coordinate

    return (
        <MapView style={styles.map}
            initialRegion={coordinate}
            showsUserLocation={true}
            showsMyLocationButton={true}
            onPress={(e) => {
                setCoordinate(e.nativeEvent.coordinate)
            }}
            provider={PROVIDER_GOOGLE}
            followsUserLocation={true}
            showsCompass={true}
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}
        // onRegionChange={}
        >
            <Marker
                coordinate={{
                    latitude,
                    longitude
                }}
                title='test'
                description='des'
            />
        </MapView>
    )
}

export default MapViewComponent;

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject
    }
})