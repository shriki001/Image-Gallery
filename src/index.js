import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './config/fbConfig';

/*
* main component for react app
* init redux store and firebase client api
*/

const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase })),
        reactReduxFirebase(fbConfig, { attachAuthIsReady: true })
    )
);
store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
});
serviceWorker.unregister();
