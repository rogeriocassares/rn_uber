# Maps in React-Native

Module created for React Native to include Maps in the App (IOS/Android). This is a **Native Map App View**

# 1. Initialize a new React-Native Project

## 1.1. Create a new React-Native Project

```bash
export REACT_NATIVE_PROJECTS_PATH=$HOME/React-Native/
cd $REACT_NATIVE_PROJECTS_PATH

# Init a new React-Native Project
npx react-native init rn_maps
cd rn_maps
code .
```

## 1.2. Modify default files

- Delete `./eslintrc.js` file from the top level directory 
- Delete `./App.js` file from the top level directory
- Create a `./src/` folder from the top level directory
- Create a `./src/index.js` file to be the `entrypoint` instead of `App.js` file
- In `./index.js`, modify the following line to match `./src` instead of `./App`

```js
// Modify this:
...
import App from './App';
...

//To match this:
import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

- In `./src/index.js`, create a `funcional` `component` to generate a default `App`

```js
import React from 'react';
import {View} from 'react-native';

// import { Container } from './styles';

export default function App() {
  return (
  <View />
  );
}
```

## 1.3. Launch Android Specific Emulator (optional)

Launch the `Android Emulator` installed from `android-studio`

- With the `android-studio` and `Android SDK` correctly installed, launch from an external `Terminal` from anywhere ant type the following command line to start `android-studio`:`


```bash
studio.sh
```

![image-20210113162218535](/home/roger/.config/Typora/typora-user-images/image-20210113162218535.png)



- Then select `Configure --> AVD Manager`

![](/home/roger/.config/Typora/typora-user-images/image-20210113162400453.png)



- The `Andorid Virtual Dvice Manager` shall be opened. The select specific `Android Emulator` version and press the `Play` button under the `Actions` column

![image-20210113162522851](/home/roger/.config/Typora/typora-user-images/image-20210113162522851.png)

- The `Android Emulator` shall boot as the following Picture:

![image-20210113163108775](/home/roger/.config/Typora/typora-user-images/image-20210113163108775.png)



- After the boot, there was a Main Screen Android and the `Android Emulator` is ready to work. 

![image-20210113163511153](/home/roger/.config/Typora/typora-user-images/image-20210113163511153.png)

The command line to check the attached `Android Emulator` device is

```bash
adb devices
----
List of devices attached
emulator-5554	device
```

This list above shows the a device named `emulator-5554` is attached to the `adb devices` list

> *Note: `adb devices` are binded to the `8081` `localhost` port. So anything that attempts to connect at this port or another `Android Emulator` device shall not be run and failed because the port had already been bound to this application.*



## 1.4. Start the React-Native Project App

- Open the terminal inside the `Visual Code IDE` typing `Ctrl + ` `

- Execute the following command to start the `package.json` dependencies and the `App`:

```bash
yarn start
```

- Then, split the terminal and start the default`Android Emulator` installed from `android-studio`:

```bash
yarn react-native run-android
```

At this point, the `Android Emulator` shall be successfully build and the `App` shall be correctly installed with a `blank screen` because there is no component yet inside the `App`.

![image-20210113164721598](/home/roger/.config/Typora/typora-user-images/image-20210113164721598.png)



# 2. React-Native App Development

## 2.1. Import react-native-maps and add it to the project

From: https://github.com/react-native-maps/react-native-maps

Description: React Native Map components for iOS + Android

- To add `react-native-module` in the dependencies of the `package.json` file in the project, go to the top level project directory and `add` the module with `yarn add` command line:

```bash
export REACT_NATIVE_PROJECTS_PATH=$HOME/React-Native/
cd $REACT_NATIVE_PROJECTS_PATH/maps

yarn add react-native-maps

yarn add react-native-geolocation-service

yarn add react-native-google-places-autocomplete

```

## 2.2. Check App Permissions in AndroidManifest.xml file

- For Android: check the "INTERNET" permission line and add "ACCESS_FINE_LOCATION" permission line in `./android/app/src/main/AndroidManifest.xml`

```xml
<uses-permission android:name="android.permission.INTERNET" />

<!-- EDIT BEGIN: Allow Pemition for User Location -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<!-- EDIT END -->
```

## 2.3. Specify Google Maps API Key

- For React-Native 0.6+, specify your Google Maps API Key:

  Add your API key to your manifest file (./`android/app/src/main/AndroidManifest.xml`):

```xml
<application>
...
    <!-- EDIT BEGIN: Add to match Google Maps Api Key-->
    <meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value="AIzaSyDxqJ2H3IaRe9zaSiGnCKUoUBb5QTymMZ8"/>
    <uses-library android:name="org.apache.http.legacy" android:required="false"/>
    <!-- EDIT END -->
</application>
```

> *Note: As shown above, `com.google.android.geo.API_KEY` is the recommended metadata name for the API key. A key with this name can be used to authenticate to multiple Google Maps-based APIs on the Android platform, including the Google Maps Android API. For backwards compatibility, the API also supports the name `com.google.android.maps.v2.API_KEY`. This legacy name allows authentication to the Android Maps API v2 only. An application can specify only one of the API key metadata names. If both are specified, the API throws an exception.*
>
> *Source: https://developers.google.com/maps/documentation/android-api/signup*



### 2.3.1.

In  ./android/build.gradle

```gradle
buildscript {
    ext {
        buildToolsVersion = "29.0.2"
        minSdkVersion = 16
        compileSdkVersion = 29
        targetSdkVersion = 29
        // EDIT BEGIN: Detect the presence of libraries
        supportLibVersion = "28.0.0"
        playServicesVersion = "17.0.0"
        androidMapsUtilsVersion = "2.2.0"
        // EDIT END:
    }
	...
...
}
```



### 2.3.2. 

In  ./android/app/build.gradle

```gradle
...
dependencies {
	...
    // EDIT BEGIN: Add lines to take the correct version of Google Services
    implementation(project(':react-native-maps')){
       exclude group: 'com.google.android.gms', module: 'play-services-base'
       exclude group: 'com.google.android.gms', module: 'play-services-maps'
   	}
   	implementation 'com.google.android.gms:play-services-base:17.2.1'
   	implementation 'com.google.android.gms:play-services-maps:17.0.0'
   	// EDIT END
  	...
}
...
```







## 2.4. Write the Main Code

Finally, in `./src/index.js`, write the main code:

```js
import React from 'react';
import {
  Platform,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Switch,
} from 'react-native';
import { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import DisplayLatLng from './examples/DisplayLatLng';
import ViewsAsMarkers from './examples/ViewsAsMarkers';
import EventListener from './examples/EventListener';
import MarkerTypes from './examples/MarkerTypes';
import DraggableMarkers from './examples/DraggableMarkers';
import PolygonCreator from './examples/PolygonCreator';
import PolylineCreator from './examples/PolylineCreator';
import GradientPolylines from './examples/GradientPolylines';
import AnimatedViews from './examples/AnimatedViews';
import AnimatedMarkers from './examples/AnimatedMarkers';
import Callouts from './examples/Callouts';
import Overlays from './examples/Overlays';
import DefaultMarkers from './examples/DefaultMarkers';
import CustomMarkers from './examples/CustomMarkers';
import CachedMap from './examples/CachedMap';
import LoadingMap from './examples/LoadingMap';
import MapBoundaries from './examples/MapBoundaries';
import TakeSnapshot from './examples/TakeSnapshot';
import FitToSuppliedMarkers from './examples/FitToSuppliedMarkers';
import FitToCoordinates from './examples/FitToCoordinates';
import LiteMapView from './examples/LiteMapView';
import CustomTiles from './examples/CustomTiles';
import WMSTiles from './examples/WMSTiles';
import ZIndexMarkers from './examples/ZIndexMarkers';
import StaticMap from './examples/StaticMap';
import MapStyle from './examples/MapStyle';
import LegalLabel from './examples/LegalLabel';
import SetNativePropsOverlays from './examples/SetNativePropsOverlays';
import CustomOverlay from './examples/CustomOverlay';
import MapKml from './examples/MapKml';
import BugMarkerWontUpdate from './examples/BugMarkerWontUpdate';
import ImageOverlayWithAssets from './examples/ImageOverlayWithAssets';
import ImageOverlayWithURL from './examples/ImageOverlayWithURL';
import AnimatedNavigation from './examples/AnimatedNavigation';
import OnPoiClick from './examples/OnPoiClick';
import TestIdMarkers from './examples/TestIdMarkers';
import IndoorMap from './examples/IndoorMap';
import CameraControl from './examples/CameraControl';
import MassiveCustomMarkers from './examples/MassiveCustomMarkers';
import GeojsonMap from './examples/Geojson';

const IOS = Platform.OS === 'ios';
const ANDROID = Platform.OS === 'android';

function makeExampleMapper(useGoogleMaps) {
  if (useGoogleMaps) {
    return example => [
      example[0],
      [example[1], example[3]].filter(Boolean).join(' '),
    ];
  }
  return example => example;
}

type Props = {};
export default class App extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      Component: null,
      useGoogleMaps: ANDROID,
    };
  }

  renderExample([Component, title]) {
    return (
      <TouchableOpacity
        key={title}
        style={styles.button}
        onPress={() => this.setState({ Component })}
      >
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  }

  renderBackButton() {
    return (
      <TouchableOpacity
        style={styles.back}
        onPress={() => this.setState({ Component: null })}
      >
        <Text style={styles.backButton}>&larr;</Text>
      </TouchableOpacity>
    );
  }

  renderGoogleSwitch() {
    return (
      <View>
        <Text>Use GoogleMaps?</Text>
        <Switch
          onValueChange={value => this.setState({ useGoogleMaps: value })}
          style={styles.googleSwitch}
          value={this.state.useGoogleMaps}
        />
      </View>
    );
  }

  renderExamples(examples) {
    const { Component, useGoogleMaps } = this.state;

    return (
      <View style={styles.container}>
        {Component && (
          <Component
            provider={useGoogleMaps ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
          />
        )}
        {Component && this.renderBackButton()}
        {!Component && (
          <ScrollView
            style={StyleSheet.absoluteFill}
            contentContainerStyle={styles.scrollview}
            showsVerticalScrollIndicator={false}
          >
            {IOS && this.renderGoogleSwitch()}
            {examples.map(example => this.renderExample(example))}
          </ScrollView>
        )}
      </View>
    );
  }

  render() {
    return this.renderExamples(
      [
        // [<component>, <component description>, <Google compatible>, <Google add'l description>]
        [StaticMap, 'StaticMap', true],
        [DisplayLatLng, 'Tracking Position', true, '(incomplete)'],
        [ViewsAsMarkers, 'Arbitrary Views as Markers', true],
        [EventListener, 'Events', true, '(incomplete)'],
        [MarkerTypes, 'Image Based Markers', true],
        [DraggableMarkers, 'Draggable Markers', true],
        [PolygonCreator, 'Polygon Creator', true],
        [PolylineCreator, 'Polyline Creator', true],
        [GradientPolylines, 'Gradient Polylines', true],
        [AnimatedViews, 'Animating with MapViews'],
        [AnimatedMarkers, 'Animated Marker Position'],
        [Callouts, 'Custom Callouts', true],
        [Overlays, 'Circles, Polygons, and Polylines', true],
        [DefaultMarkers, 'Default Markers', true],
        [CustomMarkers, 'Custom Markers', true],
        [TakeSnapshot, 'Take Snapshot', true, '(incomplete)'],
        [CachedMap, 'Cached Map'],
        [LoadingMap, 'Map with loading'],
        [MapBoundaries, 'Get visible map boundaries', true],
        [FitToSuppliedMarkers, 'Focus Map On Markers', true],
        [FitToCoordinates, 'Fit Map To Coordinates', true],
        [LiteMapView, 'Android Lite MapView'],
        [CustomTiles, 'Custom Tiles', true],
        [WMSTiles, 'WMS Tiles', true],
        [ZIndexMarkers, 'Position Markers with Z-index', true],
        [MapStyle, 'Customize the style of the map', true],
        [LegalLabel, 'Reposition the legal label', true],
        [SetNativePropsOverlays, 'Update native props', true],
        [CustomOverlay, 'Custom Overlay Component', true],
        [TestIdMarkers, 'Test ID for Automation', true],
        [MapKml, 'Load Map with KML', true],
        [BugMarkerWontUpdate, "BUG: Marker Won't Update (Android)", true],
        [ImageOverlayWithAssets, 'Image Overlay Component with Assets', true],
        [ImageOverlayWithURL, 'Image Overlay Component with URL', true],
        [AnimatedNavigation, 'Animated Map Navigation', true],
        [OnPoiClick, 'On Poi Click', true],
        [IndoorMap, 'Indoor Map', true],
        [CameraControl, 'CameraControl', true],
        [MassiveCustomMarkers, 'MassiveCustomMarkers', true],
        [GeojsonMap, 'Geojson', true],
      ]
        // Filter out examples that are not yet supported for Google Maps on iOS.
        .filter(
          example =>
            ANDROID || (IOS && (example[2] || !this.state.useGoogleMaps))
        )
        .map(makeExampleMapper(IOS && this.state.useGoogleMaps))
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scrollview: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  button: {
    flex: 1,
    marginTop: 10,
    backgroundColor: 'rgba(220,220,220,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  back: {
    position: 'absolute',
    top: 20,
    left: 12,
    backgroundColor: 'rgba(255,255,255,0.4)',
    padding: 12,
    borderRadius: 20,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: { fontWeight: 'bold', fontSize: 30 },
  googleSwitch: { marginBottom: 10 },
});
```

[When the code above is saved, the `App` shall be modified according to this file. 

Note: When a new dependency is installed, the installed `App` in `Android Emulator` must me removed by `uninstalling` it and `reinstalled` again with the command

```bash
yarn react-native run-android
```



Copy the content of example directory from official react-native-maps root repository in GitHub to ./src project directory alongside ./src/index.js file

```bash
export REACT_NATIVE_PROJECTS_PATH=$HOME/React-Native/

cd /tmp
git clone https://github.com/react-native-maps/react-native-maps.git
cd react-native-maps/example
cp -r android $REACT_NATIVE_PROJECTS_PATH/rn_maps/src
cp -r examples $REACT_NATIVE_PROJECTS_PATH/rn_maps/src
cp -r ios $REACT_NATIVE_PROJECTS_PATH/rn_maps/src

```







## 2.5. View the App in the Emulator

The `App` described above shalls look like the Picture bellow:

![image-20210115142640107](/home/roger/.config/Typora/typora-user-images/image-20210115142640107.png)



## 2.6. Deploy the App to Realease and Genarate APK file

From: https://reactnative.dev/docs/signed-apk-android

### 2.6.1.  Generating an upload key

```bash
export REACT_NATIVE_PROJECTS_PATH=$HOME/RCP/RCP-Linux/React-Native/
cd $REACT_NATIVE_PROJECTS_PATH

cd maps

keytool -genkeypair -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### 2.6.2. Setting up Gradle variables

- Place the `my-upload-key.keystore` file under the `./android/app` directory in the project folder.

```bash
mv my-upload-key.keystore ./android/app/
```

- Edit the file `./android/gradle.properties` and add the following lines  (replace `*****` with the correct `keystore password`, `alias` and `key password`),

```bash
# Add my-upload-key.keystore file, upload_store_password and upload_key_password
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

### 2.6.3. Adding signing configuration to the App's Gradle configuration

- The last configuration step that needs to be done is to setup release builds to be signed using `upload key`. Edit the file `./android/app/build.gradle` in the project folder, and add the `signing config`:

```gradle
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
           ...
            signingConfig signingConfigs.release
        }
    }
}
...
```



### 2.6.4. Generating the release APK

Run the following in any  Terminal:

```bash
export REACT_NATIVE_PROJECTS_PATH=$HOME/RCP/RCP-Linux/React-Native/
cd $REACT_NATIVE_PROJECTS_PATH

cd maps/android
./gradlew bundleRelease
```



### 2.6.5. Testing the release build of the App

```bash
export REACT_NATIVE_PROJECTS_PATH=$HOME/RCP/RCP-Linux/React-Native/
cd $REACT_NATIVE_PROJECTS_PATH

cd maps
yarn react-native run-android --variant=release
```



### 2.6.6. APK Released File Location

The generated `APK` file for the release from the App shall be located at:

````bash
/home/roger/RCP/RCP-Linux/React-Native/maps/android/app/build/outputs/apk/release/app-release.apk
````





















