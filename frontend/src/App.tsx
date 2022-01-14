import React from 'react';

//Import modules
import { Router, Switch, Route } from 'react-router-dom';

//Import utilities
import { createBrowserHistory, History } from 'history';
import config from './config';

//Import contexts
import { ApiProvider } from './contexts/apiContext';
import { AppProvider, useAppContext } from './contexts/appContext';

// Import css
import Theme from './styles/theme';
import './App.css';

// Import routes
import RouteWithProps from './components/common/routeWithProps';
import Route404 from './views/Route404';

const AppProviderWrapper = () => {
  const { mode } = useAppContext();
  const { links } = useAppContext();
  const history: History = createBrowserHistory();

  return (
    <Theme mode={mode}>
      <Router history={history}>
        <ApiProvider host={config.api.HOST}>
          <Switch>
            {links.map((link, index) => (
              <RouteWithProps
                key={index}
                path={link.pathname}
                exact={link.exact}
                component={link.component}
              />
            ))}
            <Route component={Route404} />
          </Switch>
        </ApiProvider>
      </Router>
    </Theme>
  );
};

function App() {
  return (
    <AppProvider>
      <AppProviderWrapper />
    </AppProvider>
  );
}

function AppWrapper() {
  return (
    <div className='App'>
      <App />
    </div>
  );
}

export default AppWrapper;
