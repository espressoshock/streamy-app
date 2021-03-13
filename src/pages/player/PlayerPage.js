import React, { Component } from 'react';
import AudiobookPreview from '../../components/audiobook-preview/AudiobookPreview';
import AudioBookDescription from '../../components/audiobook-description/AudiobookDescription';
import ChapterList from '../../components/chapter-list/ChapterList';
import { UserContext } from '../../contexts/UserContext';
import './PlayerPage.css';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class PlayerPage extends Component {
  static contextType = UserContext;
  state = {
    anchorEl: null,
    audiobooks: null,
    selectedAudiobook: {
      title: '',
      author: '',
    },
    audiobookPreviewOb: null,
  };
  async fetchAudioBooks() {
    const response = await fetch('http://localhost:3001/audiobooks/');
    const audiobooks = await response.json();
    return audiobooks;
  }
  handleABookSelection = (audiobook) => {
    console.log('clicked', audiobook);
    this.context.selectAudiobook(audiobook);
    this.setState({ selectedAudiobook: audiobook });
  };
  isABSelected = (audiobook) => {
    return this.context.selectedAudiobook._id === audiobook._id;
  };
  componentDidMount() {
    this.fetchAudioBooks().then((audiobooks) => {
      console.log('audiobooks:', audiobooks);
      this.setState({ audiobooks: audiobooks });
      const items = [];
      for (const [index, audiobook] of audiobooks.data.entries()) {
        items.push(
          <AudiobookPreview
            coverUrl={audiobook.coverURL}
            title={audiobook.title}
            author={audiobook.author}
            audiobookID={audiobook._id}
            //selected={this.context.selectedAudiobook._id === audiobook._id}
            onClicked={(e) => {
              this.handleABookSelection(audiobook);
            }}
          />
        );
      }
      this.setState({ audiobookPreviewOb: items });
      this.setState({ selectedAudiobook: audiobooks.data[0] });
      this.context.selectAudiobook(audiobooks.data[0]);
    });
  }
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
              {this.state.audiobookPreviewOb}

              {this.state.audiobookPreviewOb}
              {this.state.audiobookPreviewOb}
              {this.state.audiobookPreviewOb}
              {this.state.audiobookPreviewOb}
              <div className="end-spacer"></div>
            </div>
          </div>
          <div className="drawer">
            <div className="book-description">
              <AudioBookDescription
                //coverUrl={this.state.selectedAudiobook.coverURL}
                //title={this.state.selectedAudiobook.title}
                author={this.state.selectedAudiobook.author}
                //description={this.state.selectedAudiobook.description}
              />
            </div>
            <div className="chapter-list">
              <ChapterList />
            </div>
          </div>
          <div className="audio-player"></div>
        </div>
      </div>
    );
  }
}

export default PlayerPage;
