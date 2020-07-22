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
  DevicesPage,
  AddDevice,
  EditDevice,
  ErrorPage,
  DeviceCategoriesPage,
  CategoryPage,
} from './views/index';
import enTranslations from './translations/en.json';
import plTranslations from './translations/pl.json';

const App = () => {
  const [cookies] = useCookies();
  const isAuthenticated = cookies['loggedIn'];
  const lang = navigator.language;
  let messages = enTranslations;
  if (lang === 'pl') {
    messages = plTranslations;
  }
  return (
    <IntlProvider defaultLocale='en' locale={lang} messages={messages}>
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
            <PrivateRoute isAuthenticated={isAuthenticated} path='/devices'>
              <DevicesPage />
            </PrivateRoute>
            <PrivateRoute isAuthenticated={isAuthenticated} path='/addDevice'>
              <AddDevice />
            </PrivateRoute>
            <PrivateRoute isAuthenticated={isAuthenticated} path='/editDevice'>
              <EditDevice />
            </PrivateRoute>
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              path='/deviceCategories'>
              <DeviceCategoriesPage />
            </PrivateRoute>
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              path='/categoryDetails'>
              <CategoryPage />
            </PrivateRoute>
            <Route path='/error'>
              <ErrorPage />
            </Route>
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
