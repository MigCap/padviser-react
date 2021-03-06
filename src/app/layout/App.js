import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';
import { ToastContainer, Slide } from 'react-toastify';

import Header from 'containers/Header/Header';
import HomePage from 'containers/Landing/HomeLanding';
import RentalListing from 'containers/Rental/RentalListing';
import RentalSearchListing from 'containers/Rental/RentalSearchListing';
import RentalDetail from 'containers/Rental/RentalDetail';
import RentalCreate from 'containers/Rental/RentalCreate';
import RentalManage from 'components/rental/rental-manage/RentalManage';
import BookingManage from 'containers/Booking/BookingManage';
import UserProfile from 'containers/UserProfile/UserProfile';
import Login from 'components/login/Login';
import Register from 'components/register/Register';

import ProtectedRoute from 'components/shared/auth/ProtectedRoute';
import LoggedInRoute from 'components/shared/auth/LoggedInRoute';

import * as actions from '../actions';

import './App.scss';

const store = require('../reducers').init();

class App extends Component {
  componentDidMount() {
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
      <StripeProvider apiKey="pk_test_g8Ls0iUynbSpzq0f4HQuo3vh">
        <Provider store={store}>
          <BrowserRouter>
            <Fragment>
              <ToastContainer transition={Slide} />
              <Header logoutUser={this.logoutUser} />
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/rentals" component={RentalListing} />
                <ProtectedRoute
                  exact
                  path="/rentals/manage"
                  component={RentalManage}
                />
                <ProtectedRoute
                  exact
                  path="/users/profile"
                  component={UserProfile}
                />
                <ProtectedRoute
                  exact
                  path="/bookings/manage"
                  component={BookingManage}
                />
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
                <Route exact path="/rentals/:id" component={RentalDetail} />
                <Route exact path="/login" component={Login} />
                <LoggedInRoute exact path="/register" component={Register} />
              </Switch>
            </Fragment>
          </BrowserRouter>
        </Provider>
      </StripeProvider>
    );
  }
}

export default App;
