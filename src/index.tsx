import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import ThemeProvider from 'styles/themeProvider';
import GlobalStyles from 'styles/global';
import Layout from 'components/Layout';
import Throbber from 'components/Throbber';

const Overview = lazy(() => import('screens/Overview'));

const RootApp = (
  <Provider store={store}>
    <ThemeProvider>
      <GlobalStyles />
      <Router>
        <Layout>
          <Suspense fallback={<Throbber />}>
            <Switch>
              <Redirect exact from="/" to="/overview" />
              <Route exact path="/overview" component={Overview} />
            </Switch>
          </Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  </Provider>
);

const root = document.getElementById('root');

if (root) ReactDOM.render(RootApp, root);

if (module.hot) module.hot.accept();
