import React, { Component } from 'react';
import { Link } from '@reach/router';
import { UserContext } from '../../../contexts/UserContext';
import './SignUpPage.css';

class SignUpPage extends Component {
  static contextType = UserContext;
  state = {
    username: '',
    email: '',
    password: '',
  };
  signUp = () => {
    console.log(
      'datas',
      this.state.username,
      this.state.email,
      this.state.password
    );
    this.context.createUser(
      this.state.username,
      this.state.email,
      this.state.password
    );
  };
  render() {
    return (
      <div className="signUp-page">
        <div className="wrapper">
          <div className="bold-logo"></div>
          <div className="dark-card">
            <h1>Create an account</h1>
            <h2>Register and enjoy free audiobooks!</h2>
            <form action="" onSubmit={(e) => e.preventDefault()}>
              <label>Username</label>
              <input
                type="text"
                name="username"
                onChange={(e) => this.setState({ username: e.target.value })}
                placeholder="Mario"
                required
                pattern=".{5,}"
                title="Minimum 5 chars"
              />
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
              <input
                type="submit"
                name=""
                className="action-button"
                value="Sign in"
                onClick={this.signUp}
              />
              <div className="login-link">
                Already have an account?
                <Link to="/" className="link">
                  {' '}
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
