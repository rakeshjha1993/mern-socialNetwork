import axios from 'axios';
import {GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_PROFILE, SET_CURRENT_USER, ADD_EXPERIENCE, DELETE_EXPERIENCE} from './types';

 
// GET Current Profile

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios
    .get('/api/profiles').then(res => dispatch({
        type : GET_PROFILE,
        payload : res.data
    })).catch(err => dispatch({
        type: GET_PROFILE,
        payload: {}
    }))
}   

//Profile Loading
export const setProfileLoading = () => {
    return {
        type : PROFILE_LOADING
    }
}

export const clearCurrentProfile = () => {
    return {
        type : CLEAR_CURRENT_PROFILE
    }
}

export const createProfile = (profileData, history) => dispatch => {
    axios.post('/api/profiles', profileData).then(res => history.push('/dashboard')
    ).catch(err => dispatch({
        type : GET_ERRORS,
        payload : err.response.data
    }))
}

export const deleteAccount = () => dispatch => {
    if(window.confirm('Are you sure ? This cannot be undone')){
        axios.delete('/api/profiles')
         .then(res => dispatch({
             type : SET_CURRENT_USER,
             payload : {}
          })).catch(err => dispatch({
              type : GET_ERRORS,
              payload : err.response.data
          }))
    }

    
}

export const addExperience = (experience, history) => dispatch => {
    axios.post('/api/profiles/experience',experience)
         .then(res => history.push('/')).catch(err => dispatch({
             type: GET_ERRORS,
             payload : err.response.data
         }))
} 