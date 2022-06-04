import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { changeShow, setTablePos, setEvent, setEventEditStartTime, setEventEditEndTime } from "../features/modalSlice";

import { format, formatISO, addHours } from 'date-fns';

import ko from 'date-fns/locale/ko';

import hoursArray from '../utils/hoursArray';
import { eventLen, eventPos, eventDetails } from '../utils/eventUtils';
import { remove } from '../features/eventsSlice';

function Table() {

  const selectedWeek = useSelector((state) => state.selected.week);
  const normalEvents = useSelector((state) => state.events.normal);
  const tempEvent = useSelector((state) => state.modal.event);
  const showModal = useSelector((state) => state.modal.show);

  const dispatch = useDispatch();

  const boxHeight = 48;

  const onClickTable = (e) => {
    const idArray = e.target.id.split("_");
    const offsetY = e.nativeEvent.offsetY;
    const hour = (parseInt(idArray[3]) < 10) ? `0${idArray[3]}` : `${idArray[3]}`;
    const minute = (offsetY < (boxHeight/2)) ? '00' : '30';

    dispatch(setTablePos(idArray));
    dispatch(changeShow(true));

    const startTime = new Date(`${idArray[1]}T${hour}:${minute}:00`);
    const endTime = addHours(startTime, 1)

    dispatch(setEvent({
      eventDate: idArray[1],
      title: "",
      startTime: formatISO(startTime),
      endTime: formatISO(endTime),
    }))

    dispatch(setEventEditStartTime(format(startTime, "a hh:mm", {locale: ko})));
    dispatch(setEventEditEndTime(format(endTime, "a hh:mm", {locale: ko})));
  }

  const onClickRemoveEvent = (e, day, event) => {
    dispatch(remove({
      id: event.id,
      date: day,
    }))
  }

  return (
    <div className="flex flex-row overflow-auto">
      <div className="flex flex-col basis-[60px]">
        {
          hoursArray().map((hour) => {
            return (
              <div key={`Table_${hour}`} id={`Table_${hour}`}>
                <div className="h-12 flex flex-row">
                  <div className="mt-[-8px] h-12 hourNumberColor w-[51px] text-right pr-2">{hour}</div>
                  <div className="h-12 border-b-[1px] w-[9px]"></div>
                </div>
              </div>
            );
          })
        }
        
      </div>
			{
        selectedWeek.map((day, dayIndex) => {
            return (
              <div key={`Table_${day}`} id={`Table_${day}`} className="flex flex-col flex-initial basis-[14.2857143%] relative">
              {
                (tempEvent.eventDate == day && showModal) &&
                  <div className="absolute left-0 w-11/12 schedule drop-shadow-[5px_5px_25px_rgba(0,0,0,0.3)] truncate" style={{top: eventPos(tempEvent), height: eventLen(tempEvent)}}>
                    {eventDetails(tempEvent)}
                  </div>
              }
              {
                (day in normalEvents) && normalEvents[day].map((event) => {
                  return (
                    <div key={event.id} id={`${day}_${event.id}`} className="absolute left-0 w-11/12 schedule truncate" style={{top: eventPos(event), height: eventLen(event)}}>
                      <button className="absolute top-[-1px] right-[1px] scale-[0.5]" onClick={(e) => onClickRemoveEvent(e, day, event)}>
                        <span className="material-symbols-outlined">
                          close
                        </span>
                      </button>
                      {eventDetails(event)}
                    </div>
                  );
                })
              }
                {
                  hoursArray().map((hour, hourIndex) => {
                    return (
                      <div key={`Table_${day}_${hour}`} id={`Table_${day}_${dayIndex}_${hourIndex}`} className={`shrink-0 h-[${boxHeight}px] border-b-[1px] border-l-[1px]`}
                      onClick={onClickTable}>

                      </div>
                    )
                  })
                }
              </div>
            );
        })
      }
    </div>
  );
}

export default Table;
