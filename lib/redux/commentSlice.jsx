import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

const commentSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalStart: (state) => {
      state.open ? false : true;
    },
  },
});

export const { modalStart } = commentSlice.actions;

export default commentSlice.reducer;
