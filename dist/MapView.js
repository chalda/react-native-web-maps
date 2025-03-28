"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var api_1 = require("@react-google-maps/api");
var isFunction_1 = __importDefault(require("lodash/isFunction"));
var libraries = [
    "core",
    "maps",
    "geocoding",
    "marker",
    "geometry",
    "journeySharing",
    "drawing",
    "visualization",
];
var MapView = function (props) {
    var region = props.region, initialRegion = props.initialRegion, onRegionChange = props.onRegionChange, onPress = props.onPress, googleMapsApiKey = props.googleMapsApiKey, options = props.options, provider = props.provider, zoom = props.zoom;
    var _a = (0, react_1.useState)(null), center = _a[0], setCenter = _a[1];
    var _b = (0, react_1.useState)(null), currentZoom = _b[0], setCurrentZoom = _b[1];
    var mapRef = (0, react_1.useRef)(null);
    // @ts-ignore
    var _c = (0, api_1.useJsApiLoader)({
        // @ts-ignore
        googleMapsApiKey: googleMapsApiKey,
        libraries: libraries,
    }), isLoaded = _c.isLoaded, loadError = _c.loadError;
    var handleMapMounted = function (map) {
        mapRef.current = map;
        props.onMapReady && props.onMapReady();
    };
    var getCamera = function () {
        var _a, _b, _c, _d;
        if (mapRef.current && (0, isFunction_1.default)(mapRef.current.getZoom)) {
            return {
                zoom: mapRef.current.getZoom(),
                center: (_a = mapRef.current.getCenter()) === null || _a === void 0 ? void 0 : _a.toJSON(),
                heading: mapRef.current.getHeading(),
            };
        }
        else {
            return {
                zoom: 15,
                center: (_c = (_b = mapRef.current) === null || _b === void 0 ? void 0 : _b.getCenter()) === null || _c === void 0 ? void 0 : _c.toJSON(),
                heading: (_d = mapRef.current) === null || _d === void 0 ? void 0 : _d.getHeading(),
            };
        }
    };
    var animateCamera = function (camera) {
        setCurrentZoom(camera.zoom);
        setCenter(camera.center);
    };
    var animateToRegion = function (coordinates) {
        setCenter({ lat: coordinates.latitude, lng: coordinates.longitude });
    };
    var onDragEnd = function () {
        var onRegionChangeComplete = props.onRegionChangeComplete;
        if (mapRef.current && onRegionChangeComplete) {
            var center_1 = mapRef.current.getCenter();
            // @ts-ignore
            onRegionChangeComplete({
                // @ts-ignore
                latitude: center_1.lat(), // @ts-ignore
                longitude: center_1.lng(), // @ts-ignore
            });
        }
    };
    var googleMapProps = center
        ? { center: center }
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
        return react_1.default.createElement("div", null, "Error loading maps");
    }
    if (!isLoaded) {
        return react_1.default.createElement("div", null, "Loading Maps");
    }
    return (
    // @ts-ignore
    react_1.default.createElement(api_1.GoogleMap, __assign({ onLoad: handleMapMounted }, googleMapProps, { 
        // @ts-ignore
        region: region, onDragStart: onRegionChange, onIdle: onDragEnd, zoom: zoom, 
        // @ts-ignore
        onClick: onPress, options: options, 
        // @ts-ignore
        mapContainerStyle: styles.map })));
};
var styles = react_native_1.StyleSheet.create({
    map: __assign({}, react_native_1.StyleSheet.absoluteFillObject),
});
exports.default = MapView;
