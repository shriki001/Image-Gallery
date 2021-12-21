// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import validator from 'validator';

/*
* authentication module for redux store to handle users authentication
*/

// sign in
export const SignIn = (credentials) => {
    return async (dispatch, getState, { getFirebase }) => {
        if (!validator.isEmail(credentials.email))
            return dispatch({
                type: 'LOGIN_ERROR',
                err: 'Error: The password is invalid or the user does not have a password.',
            });
        const firebase = getFirebase();
        // debugger
        firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
            .then((userCredential) => {
                dispatch({ type: 'LOGIN_SUCCESS', userCredential });
            })
            .catch(error => {
                return dispatch({
                    type: 'LOGIN_ERROR',
                    err: error.message,
                });
            });
        //     const checkLogin = firebase.auth().signInWithEmailAndPassword()
        //     const checker = await checkLogin(credentials).catch(e => console.log(e));
        //     try {
        //         const { data } = checker;
        //         const { rank, tokenId } = data;
        //         const bytes = CryptoJS.AES.decrypt(tokenId, 'YouRestSecrtet');
        //         const token = bytes.toString(CryptoJS.enc.Utf8);
        //         await firebase.auth().signInWithCustomToken(token)
        //             .then(async res => {
        //                 await res.user.getIdToken().then(token => {
        //                     localStorage.setItem('token', CryptoJS.AES.encrypt(token, 'YouRestSecrtet').toString());
        //                     return dispatch({ type: 'LOGIN_SUCCESS', rank });
        //                 });
        //             })
        //             .catch(err => {
        //                 dispatch({ type: 'LOGIN_ERROR', err });
        //             });


        //     } catch (e) {
        //         dispatch({
        //             type: 'LOGIN_ERROR',
        //             err: 'Error: The password is invalid or the user does not have a password.'
        //         });
        //     }
    };
};

// sign out
export const SignOut = () => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signOut();
        window.location.assign('/');
    };
};

export const ResetErrors = () => {
    return (dispatch, getState, { getFirebase }) => {
        dispatch({ type: 'RESET_ALL' });
    };
};