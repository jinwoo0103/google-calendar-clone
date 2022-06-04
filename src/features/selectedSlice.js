import { createSlice } from "@reduxjs/toolkit";
import { formatISO } from "date-fns";
import toWeek from "../utils/toWeek";

const initialDate = new Date();

const initialState = {
  showOption: '주',
  date: formatISO(initialDate, { representation: 'date' }),
  week: toWeek(formatISO(initialDate, { representation: 'date' })),
  month: formatISO(initialDate, { representation: 'date' }),
  month2: formatISO(initialDate, { representation: 'date' }),
};

export const selectedSlice = createSlice ({
  name: "selected",
  initialState,
  reducers: {
    change: (state, action) => {
      state.week = toWeek(action.payload, state.date) || state.week;
      state.date = action.payload;
      state.month = action.payload;
    },
    move: (state, action) => {
      state.month = action.payload;
    },
    changeShowOption: (state, action) => {
      state.showOption = action.payload;
    },
    changeMonth2: (state, action) => {
      state.month2 = action.payload;
    },
  },
});

export const { change, move, changeShowOption, changeMonth2 } = selectedSlice.actions;

export default selectedSlice.reducer;