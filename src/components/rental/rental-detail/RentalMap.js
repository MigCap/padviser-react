import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MapWithGeocode } from 'components/map/GoogleMap';

import * as actions from '../../../app/actions';

class RentalMap extends Component {
  reloadMapFinish() {
    this.props.dispatch(actions.reloadMapFinish());
  }

  render() {
    const {
      location,
      map: { isReloading }
    } = this.props;
    return (
      <MapWithGeocode
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBE37NT1YgBbMCvFKbOheaO3tNWQLF-MKM&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `360px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        location={location}
        isReloading={isReloading}
        mapLoaded={() => this.reloadMapFinish()}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    map: state.map
  };
}

export default connect(mapStateToProps)(RentalMap);
