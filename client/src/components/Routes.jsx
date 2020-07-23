import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from './sessions/Login';
import Logout from './sessions/Logout';
import Home from './pages/Home';
import Rooms from './rooms/Index';

function Routes ({user, setUser}) {
  return (
    <Switch>
      <Route exact path="/login" render={
        renderProps => <Login
          {...renderProps}
          setUser={setUser}
        />
      }/>
      <Route exact path="/logout" render={
        renderProps => <Logout
          {...renderProps}
          setUser={setUser}
        />
      }/>


      <Route exact path="/" component={Home}/>
      <Route exact path="/rooms/" component={Rooms}/>
    </Switch>
  );
}
export default Routes;