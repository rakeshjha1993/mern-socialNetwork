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
          </div>
          <Footer/>
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
