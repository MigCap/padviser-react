import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
    //console.log(nextProps);
    this.setState({
      filteredRentals: nextProps.rentals
    });
  }

  handleInputChange = e => {
    this.setState({
      search: e.target.value.toLowerCase()
    });

    const { search, rentals } = this.state;

    const filterCategoryRentals = rentals.filter(
      rental => rental.category.toLowerCase() === search
    );

    console.log(filterCategoryRentals);
  };

  handleSearch(e) {
    e.preventDefault();
    const { search, rentals } = this.state;

    const filterCategoryRentals = rentals.filter(
      rental => rental.category === search
    );

    console.log(filterCategoryRentals);

    /* const { history, rentals } = this.props;
    const city = this.searchInput.current.value; */
    // const search = this.searchInput.current.value;
    // console.log(search);
    // city ? history.push(`/rentals/${city}/products`) : history.push('/rentals');
    /* const filteredArray = rentals.filter(rental => {
      let value = Object.values(rental);
      console.log(value);
      const categoryToLc = rental.category.toLowerCase();
      const searchToLc = search.toLowerCase();
    }); */
  }

  render() {
    return (
      <form className="form-inline">
        <input
          className="form-control mr-sm-2 bwm-search"
          ref={this.searchInput}
          type="search"
          placeholder='Try "New York"'
          aria-label="Search"
          onChange={this.handleInputChange}
        />
        <button
          onClick={() => this.handleSearch()}
          className="btn btn-outline-success btn-bwm-search"
          type="submit">
          <i className="fa fa-search" />
        </button>
      </form>
    );
  }
}

export default withRouter(connect(mapStateToProps)(RentalSearchInput));
