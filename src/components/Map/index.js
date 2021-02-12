import React , { Component, Fragment } from 'react';
import { PermissionsAndroid, Platform, Text, View, Image } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

import Search from '../Search';
import Directions from '../Directions';
import Details from '../Details';

import { getPixelSize } from '../../utils';

import markerImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';

import { 
    Back,
    LocationBox, 
    LocationText, 
    LocationTimeBox, 
    LocationTimeText, 
    LocationTimeTextSmall 
    } from './styles' 

Geocoder.init('AIzaSyAKmAuVwbZG4H9-msa3CVvbNVm6Jx4Bltg');

export default class Map extends Component {
    state = {
        region: null,
        destination: null,
        duration: null,
        location: null,
    };

    async componentDidMount() {
        Geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude } }) => {
                const response = await Geocoder.from({ latitude, longitude });
                const address = response.results[0].formatted_address;
                const location = address.substring(0, address.indexOf(','));
                console.log(address);
                this.setState({
                    location,
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


    handleLocationSelected = ( data, { geometry } ) => {  // This is a function
        const { location: {lat: latitude, lng: longitude } } = geometry; // JavaScript Destructuration
  
        this.setState({
            destination: {
                latitude,
                longitude,
                title: data.structured_formatting.main_text,
            }
        })

        console.log(`State after handleLocationSelected ${JSON.stringify(this.state)}`);
  
    }

    handleBack = () => {
        this.setState({ destination: null });
         console.log(this.state);
    }

    render() {
        const { region, destination, duration, location } = this.state;

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
                    ref={el => this.mapView = el}
                >
                            <Directions
                                origin={region}
                                destination={destination}
                                onReady={result => {
                                    // console.log(resul t);
                                    this.setState({ duration: Math.floor(result.duration) });
                                    console.log(`RESULT.COORDINATES: ${JSON.stringify(result.coordinates)}`);

                                    this.mapView.fitToCoordinates(
                                        result.coordinates, 
                                        {
                                            edgePadding: {
                                                right: getPixelSize(50),
                                                left: getPixelSize(50),
                                                bottom: getPixelSize(350),
                                                top: getPixelSize(100),
                                            },
                                            animated: true,
                                        }
                                    );
                                }}
                            />
                    

                 
                </MapView>

                {/* <Search onLocationSelected={this.handleLocationSelected} /> */}

                { destination ? (
                    <Fragment>
                    <Back onPress={this.handleBack}>
                        <Image source={backImage} />
                    </Back>
                    <Details /> 
                    </Fragment>
                    ) : ( 
                        <Search onLocationSelected={this.handleLocationSelected} /> 
                    ) }
            </View>
        );
    }
}