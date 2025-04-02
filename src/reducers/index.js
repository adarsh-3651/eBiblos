import { combineReducers } from 'redux';
// Import your reducers here
import exampleReducer from './exampleReducer';

const rootReducer = combineReducers({
  example: exampleReducer,
  // Add other reducers here
});

export default rootReducer;
