import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEvent } from './eventReducer';

interface IEventEdit {
  startTime: string;
  endTime: string;
}

interface IModalState {
  showCal: boolean;
  day: number;
  dayIndex: number;
  hourIndex: number;
  modalEvent: IEvent;
  editModalEvent: IEventEdit;
}

const initialState: IModalState = {
  showCal: false,
  day: 0,
  dayIndex: 0,
  hourIndex: 0,
  modalEvent: {
    date: '',
    index: -1,
    title: '',
    startTime: '',
    endTime: '',
  },
  editModalEvent: {
    startTime: '',
    endTime: '',
  },
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    changeShowCal: (state, action: PayloadAction<boolean>) => {
      state.showCal = action.payload;
    },
    setTablePos: (state, action: PayloadAction<string[]>) => {
      state.day = parseInt(action.payload[1]);
      state.dayIndex = parseInt(action.payload[2]);
      state.hourIndex = parseInt(action.payload[3]);
    },
    setEvent: (state, action: PayloadAction<IEvent>) => {
      state.modalEvent = action.payload;
    },
    setEventDate: (state, action: PayloadAction<string>) => {
      state.modalEvent.date = action.payload;
    },
    setEventStartTime: (state, action: PayloadAction<string>) => {
      state.modalEvent.startTime = action.payload;
    },
    setEventEndTime: (state, action: PayloadAction<string>) => {
      state.modalEvent.endTime = action.payload;
    },
    setEventEditStartTime: (state, action: PayloadAction<string>) => {
      state.editModalEvent.startTime = action.payload;
    },
    setEventEditEndTime: (state, action: PayloadAction<string>) => {
      state.editModalEvent.endTime = action.payload;
    },
    setIndexes: (state, action: PayloadAction<number[]>) => {
      state.dayIndex = action.payload[0];
      state.hourIndex = action.payload[1];
    },
  },
});

export const {
  changeShowCal,
  setTablePos,
  setEvent,
  setEventDate,
  setEventStartTime,
  setEventEndTime,
  setEventEditStartTime,
  setEventEditEndTime,
  setIndexes,
} = modalSlice.actions;

export default modalSlice.reducer;
