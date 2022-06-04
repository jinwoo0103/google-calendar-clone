import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeShowCal, setEventDate } from "../features/modalSlice";
import { DayPicker } from 'react-day-picker';
import { change, changeMonth2, move } from '../features/selectedSlice';
import { formatISO, parseISO, format } from 'date-fns';
import ko from 'date-fns/locale/ko';

const ModalSelectDate = () => {
  const selectedDate = useSelector((state) => parseISO(state.selected.date));
  const selectedMonth2 = useSelector((state) => parseISO(state.selected.month2));
  const showModal = useSelector((state) => state.modal.showCal);
  const dayIndexModal = useSelector((state) => state.modal.dayIndex);
  const hourIndexModal = useSelector((state) => state.modal.hourIndex);
  const tempEvent = useSelector((state) => state.modal.event);
  const eventDate = parseISO(tempEvent.eventDate);


  const dispatch = useDispatch();

  const setShowModal = (bool) => {
    dispatch(changeShowCal(bool));
  }

  const calculatePos = (dayIndex, hourIndex) => {
    const scrollHeight = document.getElementsByClassName('overflow-auto')[0].scrollTop;
    const topPos = 64 + 112 + 48 * parseInt(hourIndex) - scrollHeight
    const topPosMax = 64 + 112 + 48 * 11 - 0;
    const boxWidth = document.getElementsByClassName('basis-[14.2857143%]')[0].clientWidth;
    const leftPos = (dayIndex > 0)
      ? 256 + 60 + boxWidth * parseInt(dayIndex) - 400
      : 256 + 60 + boxWidth * parseInt(dayIndex) + boxWidth;
    return `${Math.min(topPos, topPosMax)+145}px 0px 0px ${leftPos+48}px`;
  }

  const formatCaption = (month) => {
    return (
      <div>
        {format(month, 'yyyy년 M월', { locale: ko })}
      </div>
    );
  };

  return (
    <>
      {showModal ? (
          <div className="fixed inset-0 z-50" style={{ padding: calculatePos(dayIndexModal, hourIndexModal) }}onClick={(e) => setShowModal(false)}>
            <div className="drop-shadow-[5px_5px_25px_rgba(0,0,0,0.3)] relative w-fit h-fit"
              onClick={(e) => e.stopPropagation()}>
              <div className="border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <DayPicker
                  locale={ko}
                  mode="single"
                  selected={eventDate}
                  onSelect={(date) => {
                    dispatch(change(formatISO(date, { representation: 'date' })));
                    dispatch(setEventDate(formatISO(date, { representation: 'date' })));
                  }}
                  // footer={footer}
                  month={selectedMonth2}
                  onMonthChange={(date) => {
                    dispatch(changeMonth2(formatISO(date, { representation: 'date' })))
                  }}
                  weekStartsOn={1}
                  showOutsideDays
                  fixedWeeks
                  formatters={{ formatCaption }}
                  required
                />
              </div>
            </div>
          </div>
      ) : null}
    </>
  );
};

export default ModalSelectDate;