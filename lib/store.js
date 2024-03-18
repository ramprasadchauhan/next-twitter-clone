import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./redux/commentSlice";

export const store = () => {
  return configureStore({
    reducer: {
      modal: modalReducer,
    },
  });
};
