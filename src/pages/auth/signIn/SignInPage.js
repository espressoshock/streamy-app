import React, { Component } from 'react';
import { Link } from '@reach/router';
import { UserContext } from '../../../contexts/UserContext';
import './SignInPage.css';

class SignInPage extends Component {
  static contextType = UserContext;

  state = {
    email: '',
    password: '',
    valid: true,
  };

  componentDidMount() {
    console.log('context', this.context);
  }

  signIn = () => {
    console.log('data', this.state.email, this.state.password);
    this.context
      .signIn(this.state.email, this.state.password)
      .then((result) => {
        console.log('success creation', result);
        this.setState({ valid: true });
      })
      .catch((err) => {
        console.log('error', err);
        this.setState({ valid: false });
      });
  };
  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  render() {
    return (
      <div className="signIn-page">
        <div className="wrapper">
          <div className="bold-logo"></div>
          <div className="dark-card">
            <h1>Welcome back!</h1>
            <h2>Happy to see you again!</h2>
            <div
              className={`error-message ${!this.state.valid ? 'visible' : ''}`}
            >
              Invalid email or password!
            </div>
            <form action="" onSubmit={(e) => e.preventDefault()}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={(e) => this.setState({ email: e.target.value })}
                placeholder="example@email.com"
                required
              />
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={(e) => this.setState({ password: e.target.value })}
                placeholder="••••••••••••••"
                required
                pattern=".{6,}"
                title="Minimum 6 chars"
              />
              <div className="login-link">
                Need an account?
                <Link to="signUp" className="link">
                  {' '}
                  Register
                </Link>
              </div>
              <input
                type="submit"
                name=""
                className="action-button"
                value="Sign in"
                onClick={this.signIn}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignInPage;
