import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IEvent {
  date: string;
  index: number;
  title: string;
  startTime: string;
  endTime: string;
}

const initialState: { normal: { [date: string]: IEvent[] } } = {
  normal: {},
};

export const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<IEvent>) => {
      action.payload.date in state.normal
        ? state.normal[action.payload.date].push({
            ...action.payload,
            index: state.normal[action.payload.date].length,
          })
        : (state.normal[action.payload.date] = [
            { ...action.payload, index: 0 },
          ]);
    },
    removeEvent: (state, action: PayloadAction<IEvent>) => {
      for (var i = 0; i < state.normal[action.payload.date].length; i++) {
        if (i > action.payload.index) {
          state.normal[action.payload.date][i].index -= 1;
        }
      }
      state.normal[action.payload.date].splice(action.payload.index, 1);
    },
  },
});

export const { addEvent, removeEvent } = eventSlice.actions;

export default eventSlice.reducer;
