import React, { Component } from 'react';
import AudiobookPreview from '../../components/audiobook-preview/AudiobookPreview';
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
            <div className="audiobook-list">
              <AudiobookPreview
                coverUrl="https://ia801403.us.archive.org/17/items/lifeofjohnruskin_2103_librivox/lifeofruskin_2103.jpg"
                title="The Life of John Ruskine"
                author="William Gershom"
              />
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
