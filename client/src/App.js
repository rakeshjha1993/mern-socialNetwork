<<<<<<< HEAD
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
=======
import React, { Component } from "react";
import NavBar from './Components/layout/Navbar';
import Footer from './Components/layout/Footer';
import Landing from './Components/layout/Landing';
import Login  from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import "./App.css";



>>>>>>> 865dea7399e61a586df913efcd6f04b4c0ccc3a0

class App extends Component {
  render() {
    return (
<<<<<<< HEAD
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
=======
      <Provider store = {store}>
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/" component= { Landing } />
          <div className="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </div>
          <Footer/>
        </div>
      </Router>
      </Provider>
>>>>>>> 865dea7399e61a586df913efcd6f04b4c0ccc3a0
    );
  }
}

export default App;
