import React, { Component } from 'react';
import './AudioPlayerControls.css';
import { UserContext } from '../../contexts/UserContext';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class AudioPlayerControls extends Component {
  static contextType = UserContext;
  state = {
    anchorEl: null,
    playbackSpeed: 1,
  };
  openPlayBackSpeedMenu = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };
  closePlayBackSpeedMenu = (e) => {
    this.setState({ anchorEl: null });
  };
  updatePlaybackSpeed = (playbackSpeed) => {
    this.setState({ playbackSpeed: playbackSpeed });
    this.closePlayBackSpeedMenu();
    this.props.onPlaybackSpeedChange(playbackSpeed);
  };
  goPrevChapter = (e) => {
    this.context.goPrevChapter();
  };
  goNextChapter = (e) => {
    console.log('go next');
    this.context.goNextChapter();
  };
  calculateSelectedChapterNumber() {
    if (this.context.selectedAudiobook !== undefined) {
      let counter = 0;
      for (let i = 0; i < this.context.selectedAudiobook.chapters.length; i++) {
        if (
          this.context.selectedAudiobook.chapters._id ===
          this.selectedChapter._id
        )
          break;

        counter++;
      }
      return counter;
    }
    return '00';
  }
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
          <div
            className={`control prev-control ${
              this.context?.getSelChapterPos() <= 0 ? 'disabled' : ''
            }`}
            onClick={(e) => this.goPrevChapter(e)}
          ></div>
          <div className="control audiotrack-pager">
            <div className="current-audiotrack">
              {('0' + (this.context?.getSelChapterPos() + 1)).slice(-2) ?? '00'}
            </div>
            <div className="separator">/</div>
            <div className="audiotrack-length">
              {('0' + this.context?.getSelTotalChapters()).slice(-2) ?? '00'}
            </div>
          </div>
          <div
            className={`control next-control ${
              this.context?.getSelChapterPos() >=
              this.context?.getSelTotalChapters() - 1
                ? 'disabled'
                : ''
            }`}
            onClick={(e) => this.goNextChapter(e)}
          ></div>
          <div className="playback-speed-wrapper">
            <div
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={(e) => {
                this.openPlayBackSpeedMenu(e);
              }}
            >
              <span className="playbackSpeed-value">
                {this.state.playbackSpeed}
              </span>
              x
            </div>

            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={(e) => {
                this.closePlayBackSpeedMenu(e);
              }}
            >
              <MenuItem onClick={() => this.updatePlaybackSpeed(0.5)}>
                0.5x
              </MenuItem>
              <MenuItem onClick={() => this.updatePlaybackSpeed(0.75)}>
                0.75x
              </MenuItem>
              <MenuItem onClick={() => this.updatePlaybackSpeed(1)}>
                Normal
              </MenuItem>
              <MenuItem onClick={() => this.updatePlaybackSpeed(1.25)}>
                1.25x
              </MenuItem>
              <MenuItem onClick={() => this.updatePlaybackSpeed(1.5)}>
                1.5x
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    );
  }
}

export default AudioPlayerControls;
