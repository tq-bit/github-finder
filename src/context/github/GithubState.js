import React, { useReducer } from 'react';
import GithubContext from './GithubContext';
import GithubReducer from './githubReducer';
import {
  CLEAR_USERS, GET_REPOS, GET_USER, SEARCH_USERS, SET_LOADING
} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

}

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
        `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
      );
      const data = await res.json();
      dispatch({ type: SEARCH_USERS, payload: data.items })
    } catch (err) {
      console.warn(err);
    }
  };
  // Get User
  const getUser = async (username) => {
    try {
      setLoading();
      const res = await fetch(
        `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
      );
      const data = await res.json();
      dispatch({ type: GET_USER, payload: data })
    } catch (err) {
      console.warn(err);
    }
  };

  // Get Repos
  const getUserRepos = async (username) => {
    try {
      setLoading();
      const res = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
      );
      const data = await res.json();
      dispatch({ type: GET_REPOS, payload: data })
    } catch (err) {
      console.warn(err);
    }
  };

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS })

  // Set loading
  const setLoading = () => dispatch({ type: SET_LOADING })

  return <GithubContext.Provider
    value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsers,
      getUser,
      clearUsers,
      getUserRepos,
    }}>
    {props.children}

  </GithubContext.Provider>
}

export default GithubState;