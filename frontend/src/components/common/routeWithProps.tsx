import React from 'react';
import { Route } from 'react-router-dom';

type RouteProps = {
  component: any; // rendered component
  componentProps?: any; // properties passed to the component
  [propName: string]: any; // route properties
};

const RouteWithProps = ({
  component: Component,
  componentProps = {},
  ...routeProps
}: RouteProps) => {
  return (
    <Route
      {...routeProps}
      render={(props) => <Component {...props} {...componentProps} />}
    />
  );
};

export default RouteWithProps;
