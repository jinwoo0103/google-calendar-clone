import React from 'react';
import { changeShowCal, setEventDate } from '@/redux/reducers/modalRedeucer';
import { DayPicker } from 'react-day-picker';
import { setCurDate, setModalCalMonth } from '@/redux/reducers/calendarReducer';
import { formatISO, parseISO, format } from 'date-fns';
import ko from 'date-fns/locale/ko';
import { useAppSelector, useAppDispatch } from '../redux/hooks';

const ModalSelectDate = () => {
  const modalCalMonth = useAppSelector((state) =>
    parseISO(state.calendar.modalCalMonth)
  );
  const showModal = useAppSelector((state) => state.modal.showCal);
  const dayIndexModal = useAppSelector((state) => state.modal.dayIndex);
  const hourIndexModal = useAppSelector((state) => state.modal.hourIndex);
  const tempEvent = useAppSelector((state) => state.modal.modalEvent);
  const eventDate = parseISO(tempEvent.date);

  const dispatch = useAppDispatch();

  const setShowModal = (bool: boolean) => {
    dispatch(changeShowCal(bool));
  };

  const calculatePos = (dayIndex: number, hourIndex: number) => {
    const scrollHeight =
      document.getElementsByClassName('overflow-auto')[0].scrollTop;
    const topPos = 64 + 112 + 48 * hourIndex - scrollHeight;
    const topPosMax = 64 + 112 + 48 * 11 - 0;
    const boxWidth = document.getElementsByClassName('basis-[14.2857143%]')[0]
      .clientWidth;
    const leftPos =
      dayIndex > 0
        ? 256 + 60 + boxWidth * dayIndex - 400
        : 256 + 60 + boxWidth * dayIndex + boxWidth;
    return `${Math.min(topPos, topPosMax) + 145}px 0px 0px ${leftPos + 48}px`;
  };

  const formatCaption = (month: Date) => {
    return <div>{format(month, 'yyyy년 M월', { locale: ko })}</div>;
  };

  return (
    <>
      {showModal ? (
        <div
          className="fixed inset-0 z-50"
          style={{ padding: calculatePos(dayIndexModal, hourIndexModal) }}
          onClick={(e) => setShowModal(false)}
        >
          <div
            className="drop-shadow-[5px_5px_25px_rgba(0,0,0,0.3)] relative w-fit h-fit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <DayPicker
                locale={ko}
                mode="single"
                selected={eventDate}
                onSelect={(date) => {
                  const dateStr = date
                    ? formatISO(date, { representation: 'date' })
                    : '';
                  dispatch(setCurDate(dateStr));
                  dispatch(setEventDate(dateStr));
                }}
                month={modalCalMonth}
                onMonthChange={(date) => {
                  dispatch(
                    setModalCalMonth(
                      formatISO(date, { representation: 'date' })
                    )
                  );
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
