import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
// import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';
// import tokenService from '../../utils/tokenService';

class App extends Component {

  constructor() {
    super()
    this.state = {
      user: userService.getUser()
    }
  }

  handleLogout = () => {
    userService.logout();
    this.setState({user: userService.getUser()})
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header-footer'>D R E A M &nbsp;&nbsp;&nbsp; D I A R Y</header>
        <Switch>
          <Route exact path='/' render={() =>
            <HomePage 
              handleLogout={this.handleLogout}
              user={this.state.user}
            />
          } />
          <Route exact path='/login' render={({ history }) => 
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
          <Route exact path='/signup' render={({ history }) => 
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>

        </Switch>
      </div>
    )
  };
};

export default App;
