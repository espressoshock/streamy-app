import React, { Component } from 'react';
import './AudioPlayerControls.css';
import Slider from '@material-ui/core/Slider';

class AudioPlayerControls extends Component {
  state = {};
  render() {
    return (
      <div className="audio-player-controls">
        {/*    <div className="control-progress-bar-wrapper">
          <div className="start-timecode">00:01:07</div>
          <div className="control-progress-bar">
            <Slider
              aria-labelledby="continuous-slider"
              defaultValue={50}
              step={1}
              min={0}
              max={100}
              className="audio-progressbar"
            />
          </div>
          <div className="end-timecode">00:02:04</div>
        </div> */}
        <div className="button-controls">
          <div className="control pause-control"></div>
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
