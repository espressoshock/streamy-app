import React, { Component, createContext } from 'react';
import FirebaseService from '../services/FirebaseService';

export const UserContext = createContext();

class UserContextProvider extends Component {
  state = {
    user: null,
    firebaseService: null,
    selectedAudiobook: '',
    audiobooks: [],
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
    this.setState({ selectedAudiobook: audiobook });
  };

  componentDidMount = () => {
    this.setState({ firebaseService: new FirebaseService() }, () => {
      this.state.firebaseService.auth.onAuthStateChanged((userAuth) => {
        if (this.state.firebaseService.auth.currentUser) {
          this.setState({ user: userAuth });
          this.fetchAudioBooks().then((audiobooks) => {
            console.log('audiobooks:', audiobooks);
            this.setState({ audiobooks: audiobooks.data });
            this.setState({ selectedAudiobook: audiobooks.data[0] });
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
  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          signIn: this.signIn,
          createUser: this.createUser,
          selectAudiobook: this.selectAudioook,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
