import { createSlice } from '@reduxjs/toolkit';

// Initial state for the theme slice
const initialState = {
  mode: 'light', // Default mode is light
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
