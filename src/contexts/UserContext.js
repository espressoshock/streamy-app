import React, { Component, createContext } from 'react';
import FirebaseService from '../services/FirebaseService';

export const UserContext = createContext();

class UserContextProvider extends Component {
  state = {
    user: null,
    firebaseService: null,
    selectedAudiobook: {
      chapters: [],
    },
    audiobooks: [],
    selectedChapter: '',
  };
  constructor() {
    super();
    this.firebaseService = null;
  }
  signIn = (email, password) => {
    return this.state.firebaseService.signIn(email, password);
  };
  createUser = (username, email, password) => {
    this.state.firebaseService
      .createUser(email, password)
      .then((result) => {
        console.log('success creation', result);
        this.state.firebaseService.updateUsername(result.user, username);
      })
      .catch((err) => {
        console.log('error', err);
      });
  };
  selectAudioook = (audiobook) => {
    this.fetchChapters(audiobook._id).then((chapters) => {
      this.mergeAudiobookChapters(audiobook, chapters.chapters);
      this.setState({ selectedAudiobook: audiobook });
    });
  };
  selectChapter = (chapter) => {
    this.setState({ selectedChapter: chapter });
  };
  componentDidMount = () => {
    this.setState({ firebaseService: new FirebaseService() }, () => {
      this.state.firebaseService.auth.onAuthStateChanged((userAuth) => {
        if (this.state.firebaseService.auth.currentUser) {
          this.setState({ user: userAuth });
          this.fetchAudioBooks().then((audiobooks) => {
            console.log('audiobooks:', audiobooks);
            this.setState({ audiobooks: audiobooks.data });
            this.selectAudioook(audiobooks.data[0]);
          });
        }
      });
    });
  };
  async fetchAudioBooks() {
    const response = await fetch('http://localhost:3001/audiobooks/');
    const audiobooks = await response.json();
    return audiobooks;
  }
  async fetchChapters(audiobookID) {
    const response = await fetch(
      'http://localhost:3001/audiobooks/' + audiobookID + '/chapters'
    );
    const chapters = await response.json();
    return chapters;
  }
  mergeAudiobookChapters = (audiobook, chapters) => {
    for (let i = 0; i < audiobook.chapters.length; i++)
      audiobook.chapters[i] = chapters[i];
    return audiobook;
  };
  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          signIn: this.signIn,
          createUser: this.createUser,
          selectAudiobook: this.selectAudioook,
          selectChapter: this.selectChapter,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
