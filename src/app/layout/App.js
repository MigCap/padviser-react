import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from '../../components/header/Header';
import RentalListing from '../../components/rental/rental-listing/RentalListing';
import RentalSearchListing from '../../components/rental/rental-listing/RentalSearchListing';
import RentalDetail from '../../components/rental/rental-detail/RentalDetail';
import RentalCreate from '../../components/rental/rental-create/RentalCreate';
import Login from '../../components/login/Login';
import Register from '../../components/register/Register';

import ProtectedRoute from '../../components/shared/auth/ProtectedRoute';
import LoggedInRoute from '../../components/shared/auth/LoggedInRoute';

import * as actions from '../actions';

import './App.css';

const store = require('../reducers').init();

class App extends Component {
  componentWillMount() {
    this.checkAuthState();
  }

  checkAuthState() {
    store.dispatch(actions.checkAuthState());
  }

  logoutUser() {
    store.dispatch(actions.logout());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Header logoutUser={this.logoutUser} />
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
                <Route
                  exact
                  path="/rentals/:city/products"
                  component={RentalSearchListing}
                />
                <ProtectedRoute
                  exact
                  path="/rentals/new"
                  component={RentalCreate}
                />
                <ProtectedRoute
                  exact
                  path="/rentals/:id"
                  component={RentalDetail}
                />
                <Route exact path="/login" component={Login} />
                <LoggedInRoute exact path="/register" component={Register} />
              </Switch>
            </div>
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
