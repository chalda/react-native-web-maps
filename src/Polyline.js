import React, { Component } from 'react';
import { Polyline } from '@react-google-maps/api';

class MapViewPolyline extends Component {
  render() {
    return <Polyline {...this.props} />;
  }
}

export default MapViewPolyline;
