const initialState = {
  data: ['Book 1', 'Book 2', 'Book 3'], // Added initial data for testing
};

const exampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default exampleReducer;
