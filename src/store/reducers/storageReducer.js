/*
* employees reducer module for redux store
*/

const initState = {
    images: []
};


const storageReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_ALL_IMAGES':
            return {
                ...state,
                images: action.images
            };
        default:
            return state;
    }
};
export default storageReducer;
