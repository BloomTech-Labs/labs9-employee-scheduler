import React, { Component } from 'react';
import fire from '../config/fire';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  login = e => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <form>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            onChange={this.handleChange}
            name="email"
            placeholder="email"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={this.handleChange}
            name="password"
            placeholder="password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
