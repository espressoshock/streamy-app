import React, { Component } from 'react';
import './PlayerPage.css';

class PlayerPage extends Component {
  state = {};
  render() {
    return (
      <div className="player-page">
        <div className="wrapper">
          <div className="shelf">
            <div className="header">
              <div className="username">espressoshock</div>
            </div>
          </div>
          <div className="drawer">
            <div className="book-description"></div>
            <div className="chapter-list"></div>
          </div>
          <div className="audio-player"></div>
        </div>
      </div>
    );
  }
}

export default PlayerPage;
