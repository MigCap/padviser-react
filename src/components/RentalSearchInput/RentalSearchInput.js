import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './RentalSearchInput.scss'

const mapStateToProps = state => {
  return {
    rentals: state.rentals
  };
};

class RentalSearchInput extends Component {
  constructor() {
    super();

    this.state = {
      rentals: [],
      filteredRentals: []
    };

    this.searchInput = React.createRef();
  }

  componentDidMount() {
    this.props.rentals &&
      this.props.rentals.length > 0 &&
      this.setState({
        rentals: this.props.rentals,
        search: ''
      });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filteredRentals: nextProps.rentals
    });
  }

  handleInputChange = e => {
    this.setState({
      search: e.target.value.toLowerCase()
    });

    // const { search, rentals } = this.state;

    // const filterCategoryRentals = rentals.filter(
    //   rental => rental.category.toLowerCase() === search
    // );

    // console.log(filterCategoryRentals);
  };

  handleSearch(e) {
    const { history } = this.props;
    const city = this.searchInput.current.value;

    city ? history.push(`/rentals/${city}/products`) : history.push('/rentals');

    // e.preventDefault();
    // const { search, rentals } = this.state;

    // const filterCategoryRentals = rentals && rentals.filter(
    //   rental => rental.category === search
    // );

    // console.log(filterCategoryRentals);

    // const { history, rentals } = this.props;
    // const city = this.searchInput.current.value;
    // const search = this.searchInput.current.value;
    // console.log(search);
    // city ? history.push(`/rentals/${city}/products`) : history.push('/rentals');
    // const filteredArray = rentals.filter(rental => {
    //   let value = Object.values(rental);
    //   console.log(value);
    //   const categoryToLc = rental.category.toLowerCase();
    //   const searchToLc = search.toLowerCase();
    // });
  }

  render() {
    return (
      <form className="form-inline bwm-form-wrapper">
        <input
          className="form-control bwm-search"
          ref={this.searchInput}
          type="search"
          placeholder='Try "New York" or "Audio" or "Projector"'
          aria-label="Search"
        />
        <button
          onClick={() => this.handleSearch()}
          className="btn btn-outline-success btn-bwm-search"
          type="submit">
          Search{' '}
          <i className="fa fa-search" />
        </button>
      </form>
    );
  }
}

export default withRouter(connect(mapStateToProps)(RentalSearchInput));
