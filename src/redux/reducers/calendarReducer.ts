import { createSlice } from '@reduxjs/toolkit';
import { formatISO } from 'date-fns';
import toWeek from '@/utils/toWeek';

const initialDate = new Date();

interface ICalendarState {
  calView: string;
  curDate: string;
  curWeek: string[] | null;
  calMonth: string;
  modalCalMonth: string;
}

const initialState: ICalendarState = {
  calView: '주',
  curDate: formatISO(initialDate, { representation: 'date' }),
  curWeek: toWeek(formatISO(initialDate, { representation: 'date' })),
  calMonth: formatISO(initialDate, { representation: 'date' }),
  modalCalMonth: formatISO(initialDate, { representation: 'date' }),
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setCurDate: (state, action) => {
      state.curWeek = toWeek(action.payload, state.curDate) || state.curWeek;
      state.curDate = action.payload;
      state.calMonth = action.payload;
    },
    setCalMonth: (state, action) => {
      state.calMonth = action.payload;
    },
    changeCalView: (state, action) => {
      state.calView = action.payload;
    },
    setModalCalMonth: (state, action) => {
      state.modalCalMonth = action.payload;
    },
  },
});

export const { setCurDate, setCalMonth, changeCalView, setModalCalMonth } =
  calendarSlice.actions;

export default calendarSlice.reducer;
