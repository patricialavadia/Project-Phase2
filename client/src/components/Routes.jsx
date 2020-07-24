import React from "react";
import { Route, Switch } from "react-router-dom";
import { Fragment } from 'react';
import { toast } from 'react-toastify';
import Login from './sessions/Login';
import Logout from './sessions/Logout';
import Home from './pages/Home';
import Rooms from './rooms/Index';
import NewRooms from './rooms/New';
import EditRooms from './rooms/Edit';
import ShowRooms from './rooms/Show';
import BookRooms from './rooms/BookRooms';
import Reservation from './bookings/Index';
import ShowReservation from './bookings/Show';
import EditReservation from './bookings/Edit';
import Register from './users/New';

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
      <Route exact path="/users/new" component={Register}/>
      {user ? (
        <Fragment>
            <Route exact path="/rooms" render={
              renderProps => <Rooms
              {...renderProps}
                user={user}
            />
              }/>

            <Route exact path="/bookings" render={
              renderProps => <Reservation
              {...renderProps}
                user={user}
            />
            }/>      

            <Route exact path="/rooms/new" component={NewRooms}/>
            <Route exact path="/rooms/edit" component={EditRooms}/>
            <Route exact path="/rooms/show" component={ShowRooms}/>
            <Route exact path="/rooms/bookRooms" component={BookRooms}/>
            <Route exact path="/bookings/show" component={ShowReservation}/>
            <Route exact path="/bookings/edit" component={EditReservation}/>

        </Fragment>
          ) : (
            toast("Please Sign in first before you can view and perform an action.", {type: toast.TYPE.ERROR})
          )} 	
          
    </Switch>
  );
}
export default Routes;