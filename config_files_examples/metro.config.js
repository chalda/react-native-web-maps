const { getDefaultConfig } = require('@react-native/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.watchFolders = [path.resolve(__dirname, '../path/to/web-maps')];

const ALIASES = {
  'react-native': 'react-native-web',
  'react-native-maps': path.resolve(__dirname, '../path/to/web-maps'),
  react: path.resolve(__dirname, 'node_modules/react'),
  'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
};

config.resolver.extraNodeModules = {
  'react-native-maps': path.resolve(__dirname, '../path/to/web-maps'),
  react: path.resolve(__dirname, 'node_modules/react'),
};

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web') {
    return context.resolveRequest(context, ALIASES[moduleName] || moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
