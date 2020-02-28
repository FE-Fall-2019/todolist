import React, { Component } from 'react';
import './App.css';
import { withRouter, Switch, Route } from 'react-router';
import main from './containers/main/main';
import login from './containers/login/login';
import register from './containers/register/register';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Switch>
          <Route
            path="/" exact
            component={main}
          />
          <Route
            path="/login"
            component={login}
          />
          <Route
            path="/register"
            component={register}
          />
        </Switch> 
      </div>
    )
  }
}

export default withRouter(App)