import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../context/auth-context';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuthContext();

  return (
    <Route {...rest} component={(props) => (
      user ? (
        <Component {...props} />
      ) : (
        <Redirect to='/account/' />
      )
    )} />
  )
};

export default PrivateRoute;