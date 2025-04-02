import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Ensure you have a rootReducer combining all your slices/reducers

const store = configureStore({
  reducer: rootReducer,
});

export default store;
