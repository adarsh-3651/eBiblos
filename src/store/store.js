import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import postSclice from './authSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        post : postSclice,
        //TODO: add more slices here for posts
    }
});


export default store;