import {GET_ERRORS} from '../actions/types';

const intialState = {
}

export default function (state = intialState, action) {
    switch(action.type) {
        
        case GET_ERRORS : 
            console.log(action);
            return action.payload;


        default : 
            return state;
    }
}