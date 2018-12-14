import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authService from 'app/services/auth-service';

export default function LoggedInRoute(props) {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={props =>
        authService.isAuthenticated() ? (
          <Redirect to={{ pathname: '/rentals' }} />
        ) : (
          <Component {...props} {...rest} />
        )
      }
    />
  );
}
