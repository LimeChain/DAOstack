import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';

import sheet from '../Styles/sheet';
import colors from '../Styles/colors';
import {SF_OFFICE_COORDINATE} from '../Utils/index';

import Page from './common/Page';
import BaseExamplePropTypes from './common/BaseExamplePropTypes';

const layerStyles = {
  background: {
    backgroundColor: colors.primary.blue,
  },
  water: {
    fillColor: [
      'interpolate',
      ['exponential', 1],
      ['zoom'],
      1,
      colors.secondary.green,
      8,
      colors.secondary.orange,
      10,
      colors.secondary.red,
      18,
      colors.secondary.yellow,
    ],
  },
};

class YoYo extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  constructor(props) {
    super(props);

    this.state = {
      zoomLevel: 2,
    };
  }

  componentDidMount() {
    this.cameraLoop();
  }

  cameraLoop() {
    requestAnimationFrame(async () => {
      const nextZoomLevel = this.state.zoomLevel === 12 ? 2 : 12;
      this.setState({zoomLevel: nextZoomLevel});
      setTimeout(() => this.cameraLoop(), 2000);
    });
  }

  render() {
    return (
      <Page {...this.props}>
        <MapboxGL.MapView
          ref={ref => (this.map = ref)}
          style={sheet.matchParent}
          styleURL={MapboxGL.StyleURL.Dark}
        >
          <MapboxGL.Camera
            zoomLevel={this.state.zoomLevel}
            centerCoordinate={SF_OFFICE_COORDINATE}
          />

          <MapboxGL.VectorSource>
            <MapboxGL.BackgroundLayer
              id="background"
              style={layerStyles.background}
            />
            <MapboxGL.FillLayer id="water" style={layerStyles.water} />
          </MapboxGL.VectorSource>
        </MapboxGL.MapView>
      </Page>
    );
  }
}

export default YoYo;
