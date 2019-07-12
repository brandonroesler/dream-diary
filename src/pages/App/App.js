import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
// import LoginPage from '../LoginPage/LoginPage';
// import userService from '../../utils/userService';
// import tokenService from '../../utils/tokenService';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header-footer'>D R E A M &nbsp;&nbsp;&nbsp; D I A R Y</header>
        <Switch>
          <Route exact path='/' render={() =>
            <HomePage />
          } />
          <Route exact path='/login' render={() =>
            <LoginPage />
          }/>
          <Route exact path='/signup' render={() =>
            <SignupPage />
          }/>
        </Switch>
      </div>
    )
  };
};

export default App;
