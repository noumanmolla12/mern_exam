// pathSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const pathSlice = createSlice({
  name: 'path',
  initialState: {
    globalPath: '/', // Initial global path 
    imagePath: 'http://localhost:8080/uploads/', // Initial image path
  },
  reducers: {
    setGlobalPath: (state, action) => {
      state.globalPath = action.payload;
    },
  },
});

export const { setGlobalPath } = pathSlice.actions;

export const selectGlobalPath = (state) => state.path.globalPath;
export const selectImagePath = (state) => state.path.imagePath;

export default pathSlice.reducer;
