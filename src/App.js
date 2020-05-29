import React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { MainPage, LoginPage, CreateAccountPage } from './views/index';
import { useCookies } from 'react-cookie';
import { PrivateRoute, LoginRoute } from './routes';

const App = () => {
  const [cookies] = useCookies();
  const isAuthenticated = cookies['refresh-token'];
  return (
    <IntlProvider>
      <div className='App'>
        <Router>
          <Navbar isAuthenticated={isAuthenticated} />
          <Switch>
            <LoginRoute isAuthenticated={isAuthenticated} path='/createAccount'>
              <CreateAccountPage />
            </LoginRoute>
            <LoginRoute isAuthenticated={isAuthenticated} path='/login'>
              <LoginPage />
            </LoginRoute>
            <PrivateRoute isAuthenticated={isAuthenticated} path='/assets'>
              <div>Im loggedin in</div>
            </PrivateRoute>
            <Route path='/'>
              <MainPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </IntlProvider>
  );
};

export default App;
