import React, { Component } from 'react';
import Application from './Application';

import UserContextProvider from './contexts/UserContext';

import './App.css';

class App extends Component {
  state = {};
  render() {
    return (
      <UserContextProvider>
        <Application />
      </UserContextProvider>
    );
  }
}

export default App;
