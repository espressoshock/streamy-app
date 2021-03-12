import { Router } from '@reach/router';

import PlayerPage from './pages/player/PlayerPage';
import SignInPage from './pages/auth/signIn/SignInPage';
import SignUpPage from './pages/auth/signUp/SignUpPage';

import UserContextProvider from './contexts/UserContext';

import './App.css';

function App() {
  const user = null;
  return user ? (
    <UserContextProvider>
      <PlayerPage />
    </UserContextProvider>
  ) : (
    <UserContextProvider>
      <Router>
        <SignUpPage path="signUp" />
        <SignInPage path="/" />
      </Router>
    </UserContextProvider>
  );
}

export default App;
