import React from "react";
import { TouchableOpacity } from "react-native-web";
import { InfoWindow } from "@react-google-maps/api";

const MapViewCallout = ({ onPress, hideCallout, children, ...rest }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <InfoWindow onCloseClick={hideCallout} {...rest}>
                {children}
            </InfoWindow>
        </TouchableOpacity>
    );
};

export default MapViewCallout;
