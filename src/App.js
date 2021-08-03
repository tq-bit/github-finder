import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/Pages/About';
import Navbar from './components/Layout/Navbar';
import Alert from './components/Layout/Alert';
import Users from './components/Users/Users';
import Search from './components/Users/Search';
import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  }

  searchUsers = async (text) => {
    try {
      this.setState({ loading: true });
      const res = await fetch(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`)
      const data = await res.json();
      this.setState({ users: data.items });
    } catch (err) {
      console.warn(err);
    } finally {
      this.setState({ loading: false });
    }
  }

  clearUsers = () => this.setState({ users: [], loading: false });

  setAlert = (message, type) => {
    this.setState({ alert: { message, type } })
    setTimeout(() => this.setState({ alert: null }), 3500)
  }
  render() {
    const { users, loading } = this.state
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path="/" render={props => (
                <Fragment>
                  <Search clearUsers={this.clearUsers} searchUsers={this.searchUsers} showClear={users.length > 0 ? true : false} setAlert={this.setAlert} />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />

              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
