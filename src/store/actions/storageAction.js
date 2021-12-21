// get al images
async function GetAllImages(listRef, dispatch) {
    const listAll = await listRef.listAll();
    const images = [];
    for (let item of listAll.items) {
        const url = await item.getDownloadURL();
        images.push({ original: url, thumbnail: url });
    }
    return dispatch({ type: 'GET_ALL_IMAGES', images });
}

export const GetImages = _ => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const listRef = firebase.storage().ref('images');
        GetAllImages(listRef, dispatch);
    };
};

export const UploadImages = images => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const listRef = firebase.storage().ref('images');
        for (let image of images)
            await listRef.child(`/${image[0].name}`).put(image[0]);
        GetAllImages(listRef, dispatch);
        window.alert('Upload Complete!');
    }
};