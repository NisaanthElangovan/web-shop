import React, {Component} from 'react';
import './App.css';
import Layout from './containers/Layout/Layout';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Chat from './components/Chat/Chat';
import jwt_decode from 'jwt-decode';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);
    this.requireLogin = this
      .requireLogin
      .bind(this);
  }

  requireLogin() {
    let token = sessionStorage.getItem('main.token');
    if (token) {
      try {
        let decoded = jwt_decode(token);
        console.log('decoded', decoded);
        let expiryDateTime = moment.unix(decoded.exp)
        console.log('expiryDateTime', expiryDateTime);
        if (expiryDateTime._d >= new Date()) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.log('e', e.message);
        return false;
      }
    }
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Layout}/>
          <Route
            exact
            path='/chat'
            render={(props) => (this.requireLogin()
            ? (<Chat {...props}/>)
            : (<Redirect to='/'/>))}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;