import React, { Component } from 'react';
import { UserContext } from '../../contexts/UserContext';
import AudioPlayerControls from '../audio-player-controls/AudioPlayerControls';
import Slider from '@material-ui/core/Slider';

import './AudioPlayer.css';

class AudioPlayer extends Component {
  static contextType = UserContext;
  state = {
    trackDuration: '00:00:00',
  };
  constructor(props) {
    super(props);
    this.audioElRef = React.createRef();
  }
  componentDidMount() {
    this.initAudioListeners();
  }
  initAudioListeners = () => {
    console.log('audio', this.audioElRef.current);
    this.audioElRef.current.addEventListener('loadedmetadata', () => {
      this.setState({ trackDuration: this.audioElRef.current.duration });
    });
  };
  timecodeConverter = (secs) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${(
      '0' + returnedSeconds
    ).slice(-2)}`;
  };

  render() {
    return (
      <div className="audio-player">
        <audio
          src="http://static.kevvv.in/sounds/callmemaybe.mp3"
          preload="metadata"
          loop
          ref={this.audioElRef}
        ></audio>
        <div className="control-progress-bar-wrapper">
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
          <div className="end-timecode">
            {this.timecodeConverter(this.state.trackDuration)}
          </div>
        </div>
        <AudioPlayerControls />
      </div>
    );
  }
}

export default AudioPlayer;
