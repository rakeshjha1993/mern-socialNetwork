import React, { Component } from "react";

// Loading Components
import NavBar from './Components/layout/Navbar';
import Footer from './Components/layout/Footer';
import Landing from './Components/layout/Landing';
import Login  from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import DashBoard from './Components/dashboard/Dashboard';
import PrivateRoute from './Components/common/privateRoute';
import CreateProfile from "./Components/create-profile/CreateProfile";
// Loading Modules Elements
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';

// Loading React-Redux Elements
import store from './store';
import "./App.css";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";




// Check for the token
if(localStorage.jwtToken) {
  //Set Auth token header auth
  setAuthToken(localStorage.jwtToken);

  // Decode token and get user Info and Exp

  const decoded = jwt_decode(localStorage.jwtToken);

  // Set user and is authenticated
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() /1000;
  if(decoded.exp < currentTime) {
    
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
     window.location.href = "/login"
  }
}



class App extends Component {
  render() {
    return (
      <Provider store = {store}>
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/" component= { Landing } />
          <div className="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={DashBoard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/create-profile" component= {CreateProfile} />
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
