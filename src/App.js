import { Router } from '@reach/router';

import PlayerPage from './pages/player/PlayerPage';
import SignInPage from './pages/auth/signIn/SignInPage';
import SignUpPage from './pages/auth/signUp/SignUpPage';
import './App.css';

function App() {
  const user = null;
  return user ? (
    <PlayerPage />
  ) : (
    <Router>
      <SignUpPage path="signUp" />
      <SignInPage path="/" />
    </Router>
  );
}

export default App;
