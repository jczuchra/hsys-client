import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LoginPage, CreateAccountPage } from './views/index';

// export const protectedRoutes = (isAuthenticated) =>
//   isAuthenticated && (
//     <React.Fragment>
//       <Route path='/assets'>
//         <div>Im loggedin in</div>
//       </Route>
//     </React.Fragment>
//   );

// export const publicRoutes = (isAuthenticated) =>
//   isAuthenticated && (
//       <Route path='/createAccount'>
//         <CreateAccountPage />
//       </Route>
//       <Route path='/login'>
//         <LoginPage />
//       </Route>
//   );

export const PrivateRoute = ({ isAuthenticated, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export const LoginRoute = ({ isAuthenticated, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
