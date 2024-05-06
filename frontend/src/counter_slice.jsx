import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  image: null,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const { setImage } = counterSlice.actions;
export default counterSlice.reducer;
