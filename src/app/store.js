import { configureStore } from "@reduxjs/toolkit";
import selectedReducer from "../features/selectedSlice";
import eventsReducer from "../features/eventsSlice";
import modalReducer from "../features/modalSlice";

export const store = configureStore({
  reducer: {
    selected: selectedReducer,
    events: eventsReducer,
    modal: modalReducer,
  },
});