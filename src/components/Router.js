import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Users from './Users';
import PrivateChat from './PrivateChat';
import Logout from './Logout';

const MainRouter=()=>(
  <Router>
    <Switch>
      <Route exact path='/users' component={Users}/>
      <Route exact path='/chats/:username' component={PrivateChat}/>
      <Route exact path='/' component={Login} />
      <Route exact path='/logout' component={Logout}/>
    </Switch>
  </Router>
);

export default MainRouter;