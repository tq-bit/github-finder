import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import {
  SET_ALERT, REMOVE_ALERT
} from '../types';

const AlertState = props => {
  const initialState = null

  const [state, dispatch] = useReducer(AlertReducer, initialState);


  const setAlert = (message, type) => {
    // @ts-ignore
    dispatch({
      type: SET_ALERT,
      payload: { message, type }
    })
    // @ts-ignore
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3500)
  };

  // Set alert

  return <AlertContext.Provider
    value={{
      alert: state,
      setAlert
    }}>
    {props.children}

  </AlertContext.Provider>
}

export default AlertState;