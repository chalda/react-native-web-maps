import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE, MapViewProps, Polyline } from 'react-native-maps';

import { Location } from '../types';

type MapContentProps = {
  locations: Location[];
};

const googleMapsApiKey = Constants.expoConfig.extra?.googleMapsApiKey;

const initialRegion: MapViewProps['region'] = {
  latitude: 40.6782,
  longitude: -73.9442,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const MapContent: React.FC<MapContentProps> = ({ locations }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={initialRegion}
        zoom={5}
        {...(Platform.OS === 'web' && { googleMapsApiKey })}>
        <Polyline
          coordinates={locations.map((location) => ({
            latitude: location.latitude,
            longitude: location.longitude,
          }))}
          strokeColor="red"
          strokeWidth={4}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapContent;
