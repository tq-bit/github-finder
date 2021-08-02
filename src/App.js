import React, { Component } from 'react';
import Navbar from './components/Layout/Navbar';
import Users from './components/Users/Users';
import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const res = await fetch('https://api.github.com/users')
      const data = await res.json();
      this.setState({ users: data });
    } catch (err) {
      console.warn(err);
    } finally {
      this.setState({ loading: false });

    }


  }
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
