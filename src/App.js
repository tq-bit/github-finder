import React, { Component } from 'react';
import Navbar from './components/Layout/Navbar';
import Users from './components/Users/Users';
import Search from './components/Users/Search';
import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false
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
  render() {
    const {users, loading} = this.state
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Search clearUsers={this.clearUsers} searchUsers={this.searchUsers} showClear={users.length > 0 ? true : false} />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
