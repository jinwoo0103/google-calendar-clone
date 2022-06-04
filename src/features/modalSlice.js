import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  showCal: false,
  day: 0,
  dayIndex: 0,
  hourIndex: 0,
  event: {
    eventDate: "",
    title: "",
    startTime: "",
    endTime: "",
  },
  eventEdit: {
    startTime: "",
    endTime: "",
  }
};

export const modalSlice = createSlice ({
  name: "modal",
  initialState,
  reducers: {
    changeShow: (state, action) => {
      state.show = action.payload;
    },
    changeShowCal: (state, action) => {
      state.showCal = action.payload;
    },
    setTablePos: (state, action) => {
      state.day = parseInt(action.payload[1]);
      state.dayIndex = parseInt(action.payload[2]);
      state.hourIndex = parseInt(action.payload[3]);
    },
    setEvent: (state, action) => {
      state.event = action.payload;
    },
    setEventDate: (state, action) => {
      state.event.eventDate = action.payload;
    },
    setEventStartTime: (state, action) => {
      state.event.startTime = action.payload;
    },
    setEventEndTime: (state, action) => {
      state.event.endTime = action.payload;
    },
    setEventEditStartTime: (state, action) => {
      state.eventEdit.startTime = action.payload;
    },
    setEventEditEndTime: (state, action) => {
      state.eventEdit.endTime = action.payload;
    },
  },
});

export const { changeShow, changeShowCal, setTablePos, setEvent, setEventDate,
  setEventStartTime, setEventEndTime, setEventEditStartTime, setEventEditEndTime } = modalSlice.actions;

export default modalSlice.reducer;