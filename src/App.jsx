import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './shared/context/auth.context';

import { HOME, LOGIN, ROOT, SAVEPOST } from './routes';
import Home from './modules/Home';
import Login from './modules/Login';

import './styles/global-styles.css';
import { SavePost } from './modules/SavePost';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route
            exact
            path={ROOT}
            render={() => {
              return <Redirect to={LOGIN} />;
            }}
          />
          <Route exact path={HOME} component={Home} />
          <Route exact path={LOGIN} component={Login} />
          <Route exact path={SAVEPOST} component={SavePost} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
