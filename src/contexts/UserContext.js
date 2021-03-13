import React, { Component, createContext } from 'react';
import FirebaseService from '../services/FirebaseService';

export const UserContext = createContext();

class UserContextProvider extends Component {
  state = {
    user: null,
    firebaseService: null,
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
  componentDidMount = () => {
    this.setState({ firebaseService: new FirebaseService() }, () => {
      this.state.firebaseService.auth.onAuthStateChanged((userAuth) => {
        if (this.state.firebaseService.auth.currentUser)
          this.setState({ user: userAuth });
      });
    });
  };
  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          signIn: this.signIn,
          createUser: this.createUser,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
