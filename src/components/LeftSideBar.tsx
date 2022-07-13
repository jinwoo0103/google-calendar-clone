import React, { useState } from 'react';
import { setCurDate, setCalMonth } from '@/redux/reducers/calendarReducer';

import { formatISO, parseISO, format } from 'date-fns';
import { DayPicker } from 'react-day-picker';

import ko from 'date-fns/locale/ko';

import 'react-day-picker/dist/style.css';

import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import ModalAddEvent from './ModalAddEvent';

function LeftSideBar() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const selectedDate = useAppSelector((state) =>
    parseISO(state.calendar.curDate)
  );
  const selectedMonth = useAppSelector((state) =>
    parseISO(state.calendar.calMonth)
  );

  const dispatch = useAppDispatch();

  const formatCaption = (month: Date) => {
    return <div>{format(month, 'yyyy년 M월', { locale: ko })}</div>;
  };

  return (
    <div>
      <button
        className="flex flex-row createEventButton shadow text-center ml-2 mt-3 border rounded-full w-[140px] h-12"
        onClick={() => setShowModal(true)}
      >
        <div className="h-full py-[5px]">
          <svg width="36" height="36" viewBox="0 0 36 36">
            <path fill="#34A853" d="M16 16v14h4V20z"></path>
            <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
            <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
            <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
            <path fill="none" d="M0 0h36v36H0z"></path>
          </svg>
        </div>
        <div className="h-full pt-3 px-4 text-center align-middle">
          일정 생성
        </div>
      </button>
      <DayPicker
        locale={ko}
        mode="single"
        selected={selectedDate}
        onSelect={(date) => {
          date
            ? dispatch(setCurDate(formatISO(date, { representation: 'date' })))
            : null;
        }}
        month={selectedMonth}
        onMonthChange={(date) => {
          dispatch(setCalMonth(formatISO(date, { representation: 'date' })));
        }}
        weekStartsOn={1}
        showOutsideDays
        fixedWeeks
        formatters={{ formatCaption }}
        required
      />
      <ModalAddEvent
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      />
    </div>
  );
}

export default LeftSideBar;
