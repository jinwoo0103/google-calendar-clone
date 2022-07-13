import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {
  setTablePos,
  setEvent,
  setEventEditStartTime,
  setEventEditEndTime,
} from '@/redux/reducers/modalReducer';
import { format, formatISO, addHours } from 'date-fns';

import ko from 'date-fns/locale/ko';

import hoursArray from '@/utils/hoursArray';
import { eventLen, eventPos, eventDetails } from '@/utils/eventUtils';
import { IEvent, removeEvent } from '@/redux/reducers/eventReducer';
import EventTile from './EventTile';
import ModalAddEvent from './ModalAddEvent';

function Table() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const selectedWeek = useAppSelector((state) => state.calendar.curWeek);
  const normalEvents = useAppSelector((state) => state.events.normal);
  const tempEvent = useAppSelector((state) => state.modal.modalEvent);

  const dispatch = useAppDispatch();

  const boxHeight = 48;

  const onClickTable = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = (e.target as HTMLDivElement).id;
    const idArray = id.split('_');
    const offsetY = e.nativeEvent.offsetY;
    const hour = parseInt(idArray[3]) < 10 ? `0${idArray[3]}` : `${idArray[3]}`;
    const minute = offsetY < boxHeight / 2 ? '00' : '30';

    dispatch(setTablePos(idArray));
    setShowModal(true);

    const startTime = new Date(`${idArray[1]}T${hour}:${minute}:00`);
    const endTime = addHours(startTime, 1);

    dispatch(
      setEvent({
        date: idArray[1],
        index: -1,
        title: '',
        startTime: formatISO(startTime),
        endTime: formatISO(endTime),
      })
    );

    dispatch(
      setEventEditStartTime(format(startTime, 'a hh:mm', { locale: ko }))
    );
    dispatch(setEventEditEndTime(format(endTime, 'a hh:mm', { locale: ko })));
  };

  const onClickRemoveEvent = (event: IEvent) => {
    dispatch(removeEvent(event));
  };

  return (
    <div className="flex flex-row overflow-auto">
      <div className="flex flex-col basis-[60px]">
        {hoursArray().map((hour) => {
          return (
            <div key={`Table_${hour}`} id={`Table_${hour}`}>
              <div className="h-12 flex flex-row">
                <div className="mt-[-8px] h-12 hourNumberColor w-[51px] text-right pr-2">
                  {hour}
                </div>
                <div className="h-12 border-b-[1px] w-[9px]"></div>
              </div>
            </div>
          );
        })}
      </div>
      {selectedWeek &&
        selectedWeek.map((day, dayIndex) => {
          return (
            <div
              key={`Table_${day}`}
              id={`Table_${day}`}
              className="flex flex-col flex-initial basis-[14.2857143%] relative"
            >
              {tempEvent.date == day && showModal && (
                <div
                  className="absolute left-0 w-11/12 schedule drop-shadow-[5px_5px_25px_rgba(0,0,0,0.3)] truncate"
                  style={{
                    top: eventPos(tempEvent),
                    height: eventLen(tempEvent),
                  }}
                >
                  {eventDetails(tempEvent)}
                </div>
              )}
              {day in normalEvents &&
                normalEvents[day].map((event: IEvent, index: number) => {
                  return (
                    <EventTile
                      key={index}
                      day={day}
                      event={event}
                      onRemove={onClickRemoveEvent}
                      temp={false}
                    />
                  );
                })}
              {hoursArray().map((hour, hourIndex) => {
                return (
                  <div
                    key={`Table_${day}_${hour}`}
                    id={`Table_${day}_${dayIndex}_${hourIndex}`}
                    className={`shrink-0 h-[${boxHeight}px] border-b-[1px] border-l-[1px]`}
                    onClick={onClickTable}
                  ></div>
                );
              })}
            </div>
          );
        })}
      <ModalAddEvent
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      />
    </div>
  );
}

export default Table;
