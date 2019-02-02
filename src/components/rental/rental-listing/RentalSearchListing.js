import React, { Component } from 'react';
import { connect } from 'react-redux';
import RentalList from './RentalList';
import { toUpperCase } from '../../../app/helpers';

import * as actions from '../../../app/actions/rentals-action';

const mapStateToProps = state => {
  return {
    rentals: state.rentals
  };
};

class RentalSearchListing extends Component {
  constructor() {
    super();

    this.state = {
      searchedCity: ''
    };
  }

  componentDidMount() {
    this.searchRentalsByCity();
  }

  componentDidUpdate(prevProps) {
    const currentUrlParam = this.props.match.params.city;
    const prevUrlParam = prevProps.match.params.city;

    if (currentUrlParam !== prevUrlParam) {
      this.searchRentalsByCity();
    }
  }

  searchRentalsByCity() {
    const searchedCity = this.props.match.params.city;
    this.setState({
      searchedCity
    });
    this.props.dispatch(actions.fetchRentals(searchedCity));
  }

  renderTitle() {
    const { errors, data } = this.props.rentals;
    const { searchedCity } = this.state;
    let title = '';

    if (errors.length > 0) {
      title = errors[0].detail;
    }

    if (data.length > 0) {
      title = `Your Gear in '${toUpperCase(searchedCity)}' `;
    }

    return <h1 className="page-title main-color">{title}</h1>;
  }

  render() {
    return (
      <div className="container pt-5">
        <section id="rentalListing">
          {this.renderTitle()}
          <RentalList rentals={this.props.rentals.data} />
        </section>
      </div>
    );
  }
}

export default connect(mapStateToProps)(RentalSearchListing);
