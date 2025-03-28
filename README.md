# Working fork of a fork of react-native-web-maps

working as of 3/28/2025, quick readme. will improve later (famous last words).

Took forever to get it working, hope this helps someone.
Fork is a perhaps not applicable anymore as this is basically a complete rewrite of the component
Ive seen a few people looking for a working version of web-maps.

Please PR if you add more gMap components. This repo still only supports MapView, Polyline, Marker

### To setup locally for development and use:

I've commited the /dist folder to repo, so might not need to build at all. Otherwise:

`yarn build` to fetch dependencies and build

DO NOT `npm install`


### Example config files

In config_files_examples folder I've added the configuration files that got this to work for me locally.

You might need to toggle the overrides from react-native-maps to web-maps to build your native apps.

The stack assumes Expo (52), React Native, building for iOS, web, android.

in your package.json
`"react-native-web-maps": "../../chalda/react-native-web-maps"`

this package pins and expects peer deps:

```
    "peerDependencies": {
        "react": "18.3.1",
        "react-dom": "18.3.1",
        "react-native": "0.76.7",
        "react-native-maps": "1.18.0",
        "react-native-web": "0.19.13"
    },
    "dependencies": {
        "@react-google-maps/api": "^2.20.6",
```

it was an absolute pain to dedup and fix dependency hell.

### Usage

There is a caveat of this component compared to the native variant.

You will need to pass the api key as a env variable and add a prop `googleMapsApiKey` for the web version.

Fetching the google maps library code is handeled in this component internally.

See MapContent.tsx in the examples folder.

Note the `const googleMapsApiKey = Constants.expoConfig.extra?.googleMapsApiKey;` at the top.

```
<MapView
    style={styles.map}
    provider={PROVIDER_GOOGLE}
    region={initialRegion}
    zoom={5}
    {...(Platform.OS === 'web' && { googleMapsApiKey })}> //add a prop googleMapsApiKey for web platform
    <Polyline
        coordinates={locations.map((location) => ({
        latitude: location.latitude,
        longitude: location.longitude,
        }))}
        strokeColor="red"
        strokeWidth={4}
    />
</MapView>
```

# ================ Original readme below =====================

# react-native-web-maps

> React Native for Web implementation of react-native-maps

## Getting started

`$ npm install react-native-web-maps --save`

To implement `react-native-web-maps` we're using the `react-google-maps` package:

`$ npm install react-google-maps --save`

Alias the package in your webpack config:

```
resolve: {
    alias: {
        'react-native': 'react-native-web',
        ...
        'react-native-maps': 'react-native-web-maps',
    }
}
```

You need to have a Google Maps Javascript API key to use the map, you can get one [here](https://developers.google.com/maps/documentation/javascript/get-api-key).

Then, you should add this script to your index.html:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=<YOUR_GOOGLE_API_KEY>"></script>
```

## Usage

```javascript
import MapView from "react-native-maps";
```

See the original [documentation](https://github.com/airbnb/react-native-maps).

The supported components are:

- `MapView`
- `MapView.Marker`
- `MapView.Polyline`

`MapView`:

- The officially supported props are:
    - `region`
- The officially supported events are:
    - `onRegionChange`
    - `onRegionChangeComplete`
    - `onPress`

`MapView.Marker`:

- The officially supported props are:
    - `title`
    - `description`
    - `coordinate`

## Examples

See the [storybook](https://react-native-web-community.github.io/react-native-web-maps/storybook/index.html).

## Contributing

PRs are welcome!
