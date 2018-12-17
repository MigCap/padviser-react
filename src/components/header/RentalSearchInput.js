import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class RentalSearchInput extends Component {
  constructor() {
    super();

    this.searchInput = React.createRef();
  }

  handleSearch() {
    const { history } = this.props;
    const city = this.searchInput.current.value;

    city ? history.push(`/rentals/${city}/products`) : history.push('/rentals');
  }

  render() {
    return (
      <form className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2 bwm-search"
          ref={this.searchInput}
          type="search"
          placeholder='Try "New York"'
          aria-label="Search"
        />
        <button
          onClick={() => this.handleSearch()}
          className="btn btn-outline-success my-2 my-sm-0 btn-bwm-search"
          type="submit">
          Search
        </button>
      </form>
    );
  }
}

export default withRouter(RentalSearchInput);
