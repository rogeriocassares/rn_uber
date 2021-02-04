import React, { Component } from 'react';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class Search extends Component {
    render() {
        return (
            <GooglePlacesAutocomplete 
                placeHolder="Para onde?"
                // placeHolderTextColor="#333"
                // onPress={() => {}}
                // query={{
                //     key: "AIzaSyDxqJ2H3IaRe9zaSiGnCKUoUBb5QTymMZ8",
                //     language: "pt"
                // }}
                // textInpuProps={{
                //     autoCapitalize: "none",
                //     autoCorrect: false
                // }}
                // fetchDetails
                // enablePoweredByContainer={false}
                />
        );
    };
}



