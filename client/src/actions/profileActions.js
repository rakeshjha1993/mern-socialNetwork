import axios from 'axios';
import {GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_PROFILE} from './types';

 
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