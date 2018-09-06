
import {GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_PROFILE, ADD_EXPERIENCE} from '../actions/types';

const initialState = {
    profile : null,
    profiles : null,
    loading : false
}

export default function(state = initialState, action) {
    switch(action.type){

        case PROFILE_LOADING : 
            return {
                ...state,
                loading : true
            }

        case GET_PROFILE :
            return {
                ...state,
                profile : action.payload,
                loading : false
            }
        
        case CLEAR_CURRENT_PROFILE: 
            return {
                ...state,
                profile : null,
            }

        case SET_PROFILE :
            return {
                ...state,
                profile : action.payload
            }
        case ADD_EXPERIENCE :
            return {
                ...state,
                profile : action.payload
            }
        default :
            return state;
    }
}