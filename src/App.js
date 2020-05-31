import React from 'react';
import { useCookies } from 'react-cookie';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { LoginRoute, PrivateRoute } from './routes';
import {
  CreateAccountPage,
  LoginPage,
  MainPage,
  AssetsPage,
  CreateAsset,
  EditAsset,
} from './views/index';

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
              <AssetsPage />
            </PrivateRoute>
            <PrivateRoute isAuthenticated={isAuthenticated} path='/createAsset'>
              <CreateAsset />
            </PrivateRoute>
            <PrivateRoute isAuthenticated={isAuthenticated} path='/editAsset'>
              <EditAsset />
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
