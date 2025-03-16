import React, { useState, useRef } from "react";
import { View, StyleSheet } from "react-native-web";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import isFunction from "lodash/isFunction";

import Marker from "./Marker";
import Polyline from "./Polyline";
import Callout from "./Callout";
const libraries = [
    "core",
    "maps",
    "geocoding",
    "marker",
    "geometry",
    "journeySharing",
    "drawing",
    "visualization",
];

const MapView = (props) => {
    const {
        region,
        initialRegion,
        onRegionChange,
        onPress,
        options,
        defaultZoom,
        PROVIDER,
    } = props;
    const containerStyle = props.style || styles.container;

    const [center, setCenter] = useState(null);
    const [zoom, setZoom] = useState(null);
    const mapRef = useRef(null);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: PROVIDER,
        libraries,
    });

    const handleMapMounted = (map) => {
        mapRef.current = map;
        props.onMapReady && props.onMapReady();
    };

    const getCamera = () => {
        debugger;
        if (mapRef && mapRef.current && isFunction(mapRef.current.getZoom)) {
            return {
                zoom: mapRef.current.getZoom(),
                center: mapRef.current.getCenter(),
                heading: mapRef.current.getHeading(),
            };
        } else {
            return {
                zoom: 15,
                center: mapRef.current.getCenter(),
                heading: mapRef.current.getHeading(),
            };
        }
    };

    const animateCamera = (camera) => {
        setZoom(camera.zoom);
        setCenter(camera.center);
    };

    const animateToRegion = (coordinates) => {
        setCenter({ lat: coordinates.latitude, lng: coordinates.longitude });
    };

    const onDragEnd = () => {
        const { onRegionChangeComplete } = props;
        if (mapRef.current && onRegionChangeComplete) {
            const center = mapRef.current.getCenter();
            onRegionChangeComplete({
                latitude: center.lat(),
                longitude: center.lng(),
            });
        }
    };

    const googleMapProps = center
        ? { center }
        : region
        ? {
              center: {
                  lat: region.latitude,
                  lng: region.longitude,
              },
          }
        : {
              defaultCenter: {
                  lat: initialRegion.latitude,
                  lng: initialRegion.longitude,
              },
          };
    const calculatedZoom =
        zoom ||
        (region && region.latitudeDelta
            ? Math.round(Math.log(360 / region.latitudeDelta) / Math.LN2)
            : initialRegion && initialRegion.latitudeDelta
            ? Math.round(Math.log(360 / initialRegion.latitudeDelta) / Math.LN2)
            : 15);
    googleMapProps["zoom"] = zoom ? zoom : calculatedZoom;

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading Maps</div>;
    }

    return (
        <View style={containerStyle}>
            <GoogleMap
                onLoad={handleMapMounted}
                // containerElement={
                //     <div style={{ height: "100%", width: "100%" }} />
                // }
                // mapElement={<div style={{ height: "100%", width: "100%" }} />}
                {...googleMapProps}
                onDragStart={onRegionChange}
                onIdle={onDragEnd}
                zoom={calculatedZoom}
                onClick={onPress}
                options={options}
                style={styles.map}
            ></GoogleMap>
        </View>
    );
};
//                {props.children}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export { Marker, Polyline, Callout };
export default MapView;

// onZoomChanged={() => {
//     if (
//         mapRef &&
//         mapRef.current &&
//         isFunction(mapRef.current.getZoom)
//     ) {
//        // setZoom(mapRef.current.getZoom());
//     }
// }}
