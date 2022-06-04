import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // repeated: {},
  normal: {},
};

export const eventsSlice = createSlice ({
  name: "events",
  initialState,
  reducers: {
    add: (state, action) => {
      (action.payload.date in state.normal)
      ? state.normal[action.payload.date].push({...action.payload.event, id: state.normal[action.payload.date].length})
      : state.normal[action.payload.date] = [{...action.payload.event, id: 0}];
    },
    remove: (state, action) => {
      for(var i = 0; i < state.normal[action.payload.date].length; i++){ 
        if (i > action.payload.id) {
          state.normal[action.payload.date][i].id -= 1;
        }
      }
      state.normal[action.payload.date].splice(action.payload.id, 1);
    },
  },
});

export const { add, remove } = eventsSlice.actions;

export default eventsSlice.reducer;