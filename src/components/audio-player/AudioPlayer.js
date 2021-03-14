import React, { Component } from 'react';
import { UserContext } from '../../contexts/UserContext';
import AudioPlayerControls from '../audio-player-controls/AudioPlayerControls';
import Slider from '@material-ui/core/Slider';

import './AudioPlayer.css';

class AudioPlayer extends Component {
  static contextType = UserContext;
  state = {
    trackDuration: '00:00:00',
    buffered: 0,
    seekable: 0,
    playState: 0, //0: pause, 1: play
    currentPlayingTime: 0, //use currentTime in secs
  };
  constructor(props) {
    super(props);
    this.audioElRef = React.createRef();
    this.sliderElRef = React.createRef();
  }
  componentDidMount() {
    this.initAudioListeners();
    console.log('slider', this.sliderElRef.current);
  }
  initAudioListeners = () => {
    if (this.audioElRef.current.readyState > 0)
      this.setState({ trackDuration: this.audioElRef.current.duration });
    else {
      this.audioElRef.current.addEventListener('loadedmetadata', () => {
        this.setState({ trackDuration: this.audioElRef.current.duration });
        /*  this.setState({
          buffered: this.audioElRef.current.buffered.end(
            this.audioElRef.current.buffered.length - 1
          ),
        });
        this.setState({
          seekable: this.audioElRef.current.seekable.end(
            this.audioElRef.current.seekable.length - 1
          ),
        }); */
      });
      this.audioElRef.current.addEventListener('timeupdate', () => {
        this.setState({
          currentPlayingTime: Math.floor(this.audioElRef.current.currentTime),
        });
      });
    }
  };
  handlePlayStateChange = (e) => {
    console.log('play state change');
    if (this.state.playState === 0) {
      this.audioElRef.current.play();
      this.setState({ playState: 1 });
    } else {
      this.audioElRef.current.pause();
      this.setState({ playState: 0 });
    }
  };
  handleSliderChange = (value) => {
    this.audioElRef.current.currentTime = value;
    this.setState({ currentPlayingTime: value });
  };
  handlePlaybackSpeedChange = (speed) => {
    if (this.audioElRef.current !== null)
      this.audioElRef.current.playbackRate = speed;
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
          src={this.context.getSelectedAudiotrackURI()}
          preload="metadata"
          loop
          ref={this.audioElRef}
        ></audio>
        <div className="control-progress-bar-wrapper">
          <div className="start-timecode">
            {this.timecodeConverter(this.state.currentPlayingTime)}
          </div>
          <div className="control-progress-bar">
            <Slider
              aria-labelledby="continuous-slider"
              defaultValue={0}
              value={this.state.currentPlayingTime}
              step={1}
              min={0}
              max={Math.floor(this.state.trackDuration)}
              className="audio-progressbar"
              onChange={(e, value) => this.handleSliderChange(value)}
              ref={this.sliderElRef}
            />
          </div>
          <div className="end-timecode">
            {this.timecodeConverter(this.state.trackDuration)}
          </div>
        </div>
        <AudioPlayerControls
          onPlayStateChange={(e) => this.handlePlayStateChange()}
          playState={this.state.playState}
          onPlaybackSpeedChange={(e) => this.handlePlaybackSpeedChange(e)}
        />
      </div>
    );
  }
}

export default AudioPlayer;
