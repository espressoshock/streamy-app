import React, { Component } from 'react';
import './SignInPage.css';

class SignInPage extends Component {
  state = {};
  render() {
    return (
      <div className="signIn-page">
        <div className="wrapper">
          <div className="bold-logo"></div>
          <h2 className="hero-title">
            Enjoy free audiobooks anywhere, anytime with streamy on-demand!
          </h2>
          <div className="signIn-hero-button"></div>
          <footer>
            <p>*the authentication window will open up in a new window</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default SignInPage;
