import React, { useReducer } from 'react';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  CLEAR_USERS, GET_REPOS, GET_USERS, REMOVE_ALERT, SEARCH_USERS, SET_ALERT, SET_LOADING
} from '../types';

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async (text) => {
    try {
      setLoading();
      const res = await fetch(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`
      );
      const data = await res.json();
      dispatch({ type: SEARCH_USERS, payload: data.items })
    } catch (err) {
      console.warn(err);
    }
  };
  // Get User

  // Get Repos

  // Clear Users

  // Set loading
  const setLoading = () => dispatch({ type: SET_LOADING })

  return <GithubContext.Provider
    value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsers,
    }}>
    {props.children}

  </GithubContext.Provider>
}

export default GithubState;