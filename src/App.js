import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/Pages/About';
import Navbar from './components/Layout/Navbar';
import Alert from './components/Layout/Alert';
import Users from './components/Users/Users';
import User from './components/Users/User';
import Search from './components/Users/Search';
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
                  render={(props) => (
                    <Fragment>
                      <Search
                      />
                      <Users />
                    </Fragment>
                  )}
                />

                <Route exact path="/about" component={About} />
                <Route
                  exact
                  path="/user/:login"
                  component={User} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );

}

export default App;
