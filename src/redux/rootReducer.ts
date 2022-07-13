import { combineReducers } from '@reduxjs/toolkit';
import selectedReducer from './reducers/calendarReducer';
import eventsReducer from './reducers/eventReducer';
import modalSlice from './reducers/modalReducer';

const rootReducer = combineReducers({
  calendar: selectedReducer,
  events: eventsReducer,
  modal: modalSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
