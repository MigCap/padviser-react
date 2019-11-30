import React, { Component, Fragment } from 'react';
import RentalCard from './RentalCard';
class RentalList extends Component {
  constructor(props) {
    super(props);
    const audioRentals = props.rentals && props.rentals.filter(audioRentals => audioRentals.category === 'audio');
    const videoRentals = props.rentals && props.rentals.filter(videoRentals => videoRentals.category === 'video');
    const lightsRentals = props.rentals && props.rentals.filter(lightsRentals => lightsRentals.category === 'lights');

    this.state = {
      audioRentals,
      videoRentals,
      lightsRentals,
    };
  }
  renderRentals() {
    return this.props.rentals.map(rental => {
      return <RentalCard key={rental._id} rental={rental} />;
    });
  }
  renderAudioRentals() {
    return this.state.audioRentals && this.state.audioRentals.map(rental => {
      return <RentalCard key={rental._id} rental={rental} />;
    });
  }
  renderVideoRentals() {
    return this.state.videoRentals && this.state.videoRentals.map(rental => {
      return <RentalCard key={rental._id} rental={rental} />;
    });
  }
  renderLightsRentals() {
    return this.state.lightsRentals && this.state.lightsRentals.map(rental => {
      return <RentalCard key={rental._id} rental={rental} />;
    });
  }
  render() {
    {/* <Fragment>
      <h3 className="text-center audio">AUDIO RENTALS</h3>
      <div className="row">{this.renderAudioRentals()}</div>
      <h3 className="text-center video">VIDEO RENTALS</h3>
      <div className="row">{this.renderVideoRentals()}</div>
      <h3 className="text-center lights">LIGHTS RENTALS</h3>
      <div className="row">{this.renderLightsRentals()}</div>
    </Fragment> */}
    return (
      <div className="row">{this.renderRentals()}</div>
    );
  }
}
export default RentalList;
