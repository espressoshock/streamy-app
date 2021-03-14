import React, { Component } from 'react';
import './AudioPlayerControls.css';

class AudioPlayerControls extends Component {
  state = {};
  render() {
    return (
      <div className="audio-player-controls">
        <div className="button-controls">
          <div
            className={`control playback-control ${
              this.props.playState === 1 ? 'pause-control' : 'play-control'
            }`}
            onClick={this.props.onPlayStateChange}
          ></div>
          <div className="control prev-control"></div>
          <div className="control audiotrack-pager">
            <div className="current-audiotrack">02</div>
            <div className="separator">/</div>
            <div className="audiotrack-length">40</div>
          </div>
          <div className="control next-control"></div>
        </div>
      </div>
    );
  }
}

export default AudioPlayerControls;
