import authReducer from './authReducer';
import storageReducer from './storageReducer';
import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";

/*
* root reducer module for redux store
* combine all reducers
*/

const rootReducer = combineReducers({
    auth: authReducer,
    storage: storageReducer,
    firebase: firebaseReducer
});

export default rootReducer;
