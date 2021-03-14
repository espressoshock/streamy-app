import React, { Component } from 'react';
import AudiobookPreview from '../../components/audiobook-preview/AudiobookPreview';
import AudioBookDescription from '../../components/audiobook-description/AudiobookDescription';
import ChapterList from '../../components/chapter-list/ChapterList';
import AudioPlayer from '../../components/audio-player/AudioPlayer';

import { UserContext } from '../../contexts/UserContext';
import './PlayerPage.css';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class PlayerPage extends Component {
  static contextType = UserContext;
  state = {
    anchorEl: null,
  };

  handleABookSelection = (audiobook) => {
    console.log('clicked', audiobook);
    this.context.selectAudiobook(audiobook);
    this.setState({ selectedAudiobook: audiobook });
  };
  isABSelected = (audiobook) => {
    return this.context.selectedAudiobook._id === audiobook._id;
  };
  handlePlayingTrackChange = (e) => {
    this.context.selectChapter(e);
    console.log('track clicked', e);
  };
  componentDidMount() {}
  openMenu = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };
  closeMenu = (e) => {
    this.setState({ anchorEl: null });
  };
  render() {
    return (
      <div className="player-page">
        <div className="wrapper">
          <div className="shelf">
            <div className="header">
              <div className="account-dr-wrapper">
                <div
                  className="pointer username"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={(e) => {
                    this.openMenu(e);
                  }}
                >
                  {this.context.user.displayName}
                </div>
                <div
                  className="pointer chev-down"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={(e) => {
                    this.openMenu(e);
                  }}
                ></div>

                <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  keepMounted
                  open={Boolean(this.state.anchorEl)}
                  onClose={(e) => {
                    this.closeMenu(e);
                  }}
                >
                  <MenuItem onClick={this.closeMenu}>Add audiotrack</MenuItem>
                  <MenuItem onClick={this.closeMenu}>Logout</MenuItem>
                </Menu>
              </div>
            </div>
            <div className="selector">
              <div className="select-item active">Audiobooks</div>
              <div className="select-item">Favorites</div>
            </div>
            <div className="audiobook-list">
              {this.context.audiobooks.map((audiobook, key) => {
                return (
                  <AudiobookPreview
                    coverUrl={audiobook.coverURL}
                    title={audiobook.title}
                    author={audiobook.author}
                    audiobookID={audiobook._id}
                    selected={
                      this.context.selectedAudiobook._id === audiobook._id
                    }
                    onClicked={(e) => {
                      this.handleABookSelection(audiobook);
                    }}
                  />
                );
              })}
              <div className="end-spacer"></div>
            </div>
          </div>
          <div className="drawer">
            <div className="book-description">
              <AudioBookDescription
                coverUrl={this.context.selectedAudiobook.coverURL}
                title={this.context.selectedAudiobook.title}
                author={this.context.selectedAudiobook.author}
                description={this.context.selectedAudiobook.description}
                genre={this.context.selectedAudiobook.genre}
                language={this.context.selectedAudiobook.language}
              />
            </div>
            <div className="chapter-list">
              <ChapterList
                onTrackChange={(e) => {
                  this.handlePlayingTrackChange(e);
                }}
              />
            </div>
          </div>
          <div className="audio-player">
            <AudioPlayer />
          </div>
        </div>
      </div>
    );
  }
}

export default PlayerPage;
