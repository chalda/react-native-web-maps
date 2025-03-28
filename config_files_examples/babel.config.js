module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],

    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '^react-native$': 'react-native-web',
            '^react-native-maps$': 'react-native-web-maps',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
