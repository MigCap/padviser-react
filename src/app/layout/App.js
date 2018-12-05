import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from '../../components/header/Header';
import RentalListing from '../../components/rental/rental-listing/RentalListing';
import RentalDetail from '../../components/rental/rental-detail/RentalDetail';

import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <Redirect to="/rentals" />;
              }}
            />
            <Route exact path="/rentals" component={RentalListing} />
            <Route exact path="/rentals/:id" component={RentalDetail} />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

export default App;
