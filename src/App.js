import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/Pages/About';
import Navbar from './components/Layout/Navbar';
import User from './components/Users/User';
import Alert from './components/Layout/Alert';
import Home from './components/Pages/Home';
import NotFound from './components/Pages/NotFound';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import './App.css';

const App = () => {
  return (
    <GithubState>
      <AlertState >
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <Route
                  exact
                  path="/"
                  component={Home}
                />

                <Route exact path="/about" component={About} />
                <Route
                  exact
                  path="/user/:login"
                  component={User} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );

}

export default App;
