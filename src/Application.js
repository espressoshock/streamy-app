import React, { Component } from 'react';
import { Router } from '@reach/router';

import PlayerPage from './pages/player/PlayerPage';
import SignInPage from './pages/auth/signIn/SignInPage';
import SignUpPage from './pages/auth/signUp/SignUpPage';
import AddAudiobookPage from './pages/admin-tools/add-audiobook/AddAudiobookPage';

import { UserContext } from './contexts/UserContext';

class Application extends Component {
  static contextType = UserContext;
  componentDidMount() {
    console.log('app context', this.context);
  }
  state = {};
  render() {
    return this.context.user ? (
      <Router>
        <PlayerPage path="/player" default />
        <AddAudiobookPage path="/add" />
      </Router>
    ) : (
      <Router>
        <SignUpPage path="signUp" />
        <SignInPage path="/" default />
      </Router>
    );
  }
}

export default Application;
