import React , { Component } from 'react';
// import { View } from 'react-native';
import { PermissionsAndroid, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import Search from '../Search';

export default class Map extends Component {
    state = {
        region: null,
    };

    async componentDidMount() {
        Geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                this.setState({
                    region: {
                        latitude, 
                        longitude, 
                        latitudeDelta: 0.0143,
                        longitudeDelta: 0.0134 
                    } 
                })
            }, //success Callback
            () => {}, //error Callback
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000,
                
            }
        )

    }

    render() {
        const { region } = this.state;

        return (
            <View style={{ flex: 1 }} >
                <MapView
                    style = {{ flex: 1 }}
                    region = {region}
                    onMapReady={() => {
                        if (Platform.OS === 'android') {
                            PermissionsAndroid.request(
                                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                            )
                        }
                    }}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    loadingEnabled
                />
                <Search />
            </View>
        );
    }
}