import React from 'react';
import {Route, Switch } from 'react-router-dom';
import SignIn from '../../User/Body/SignIn';
import SignOut from '../../User/Body/SignOut';
import Home from './Home';

function Body(props) {
  return (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/sign-in" component={SignIn} />
      <Route exact path="/sign-out" component={SignOut} />
    </Switch>
  );
}

export default Body;