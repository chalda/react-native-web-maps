import React, { useState, useRef } from "react";
import { StyleSheet } from "react-native";

import {
    GoogleMap,
    useJsApiLoader,
    GoogleMapProps as GoogleMapApiProps,
    type Libraries,
} from "@react-google-maps/api";
import isFunction from "lodash/isFunction";
import { MapViewProps } from "react-native-maps";

const libraries: Libraries = [
    "core",
    "maps",
    "geocoding",
    "marker",
    "geometry",
    "journeySharing",
    "drawing",
    "visualization",
];

type CombinedProps = MapViewProps & GoogleMapApiProps;

const MapView: React.FC<CombinedProps> = (props) => {
    const {
        region,
        initialRegion,
        onRegionChange,
        onPress,
        options,
        provider,
        zoom,
    } = props;

    const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(
        null,
    );
    const [currentZoom, setCurrentZoom] = useState<number | null>(null);
    const mapRef = useRef<google.maps.Map | null>(null);

    // @ts-ignore
    const { isLoaded, loadError } = useJsApiLoader({
        // @ts-ignore
        googleMapsApiKey: provider,
        libraries,
    });

    const handleMapMounted = (map: google.maps.Map) => {
        mapRef.current = map;
        props.onMapReady && props.onMapReady();
    };

    const getCamera = () => {
        if (mapRef.current && isFunction(mapRef.current.getZoom)) {
            return {
                zoom: mapRef.current.getZoom(),
                center: mapRef.current.getCenter()?.toJSON(),
                heading: mapRef.current.getHeading(),
            };
        } else {
            return {
                zoom: 15,
                center: mapRef.current?.getCenter()?.toJSON(),
                heading: mapRef.current?.getHeading(),
            };
        }
    };

    const animateCamera = (camera: {
        zoom: number;
        center: google.maps.LatLngLiteral;
    }) => {
        setCurrentZoom(camera.zoom);
        setCenter(camera.center);
    };

    const animateToRegion = (coordinates: {
        latitude: number;
        longitude: number;
    }) => {
        setCenter({ lat: coordinates.latitude, lng: coordinates.longitude });
    };

    const onDragEnd = () => {
        const { onRegionChangeComplete } = props;
        if (mapRef.current && onRegionChangeComplete) {
            const center = mapRef.current.getCenter();
            // @ts-ignore
            onRegionChangeComplete({
                // @ts-ignore
                latitude: center.lat(), // @ts-ignore
                longitude: center.lng(), // @ts-ignore
            });
        }
    };

    const googleMapProps: google.maps.MapOptions = center
        ? { center }
        : region
          ? {
                center: {
                    lat: region.latitude,
                    lng: region.longitude,
                },
            }
          : {
                center: {
                    // @ts-ignore
                    lat: initialRegion.latitude, // @ts-ignore
                    lng: initialRegion.longitude, // @ts-ignore
                },
            };
    googleMapProps["zoom"] = zoom;

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading Maps</div>;
    }

    return (
        // @ts-ignore
        <GoogleMap
            onLoad={handleMapMounted}
            {...googleMapProps}
            // @ts-ignore
            region={region}
            onDragStart={onRegionChange}
            onIdle={onDragEnd}
            zoom={zoom}
            // @ts-ignore
            onClick={onPress}
            options={options}
            // @ts-ignore
            mapContainerStyle={styles.map}
        ></GoogleMap>
    );
};

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default MapView;
