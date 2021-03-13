import React, { Component } from 'react';
import { Router } from '@reach/router';

import PlayerPage from './pages/player/PlayerPage';
import SignInPage from './pages/auth/signIn/SignInPage';
import SignUpPage from './pages/auth/signUp/SignUpPage';

import { UserContext } from './contexts/UserContext';

class Application extends Component {
  static contextType = UserContext;
  componentDidMount() {
    console.log('app context', this.context);
  }
  state = {};
  render() {
    return this.context.user ? (
      <PlayerPage />
    ) : (
      <Router>
        <SignUpPage path="signUp" />
        <SignInPage path="/" />
      </Router>
    );
  }
}

export default Application;
