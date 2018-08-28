import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {GET_ERRORS, SET_CURRENT_USER} from './types';
import { error } from 'util';

//Register
export const registerUser = (userData,history) => dispatch => {
    axios
    .post('/api/users',userData)
    .then(res => history.push('/login'))
    .catch(err => {
      dispatch({
          type: GET_ERRORS,
          payload : err.response.data
      })
    });
}

//login

export const loginUser = (userData) => dispatch => {
    axios
    .post('api/users/login', userData)
    .then((res) => {
        //save to local Storage
        const {token} = res.data;
        // Set token to local storage
        localStorage.setItem('jwtToken',token);
        //set token to auth header
        setAuthToken(token); 
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // set current user
        dispatch(setCurrentUser(decoded));

    })
    .catch(err => {
        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload : err.response.data
        })}
    )
}

//Set Logged in user
export const setCurrentUser = decoded => {
    // console.log(decoded);
    return {
        type : SET_CURRENT_USER,
        payload : decoded
    }
}

// Log User OUT

export const logoutUser = () => dispatch => {

    //Remove from localStorage

    localStorage.removeItem('jwtToken');

    //Remove Auth Header
    setAuthToken(false);
    //Set current user to empty object which set is Authenticated to false 
    dispatch(setCurrentUser({}));
}