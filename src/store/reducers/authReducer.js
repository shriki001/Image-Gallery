/*
* auth reducer module for redux store
*/

const initState = {
    authError: null,
    success: null
};
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: action.err.toString()
            };
       
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authError: null
            };
        case 'RESET_SUCCESS':
            return {
                ...state,
                success: true
            };
            
        case 'RESET_ALL':
            return {
                ...state,
                authError: null,
                success: null
            }
        case 'RESET_ERROR':
            return {
                ...state,
                authError: action.err.toString()
            };
        default:
            return state;
    }
};
export default authReducer;
