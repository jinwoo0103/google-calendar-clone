import {
  format,
  formatISO,
  isBefore,
  isAfter,
  parse,
  parseISO,
} from 'date-fns';
import ko from 'date-fns/locale/ko';
import React, { useState } from 'react';
import {
  changeShowCal,
  setEventEditStartTime,
  setEventEditEndTime,
  setEventStartTime,
  setEventEndTime,
} from '@/redux/reducers/modalRedeucer';
import { addEvent } from '@/redux/reducers/eventReducer';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import ModalSelectDate from './ModalSelectDate';

const ModalAddEvent = ({
  showModal,
  onClose,
}: {
  showModal: boolean;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();

  const dayIndexModal = useAppSelector((state) => state.modal.dayIndex);
  const hourIndexModal = useAppSelector((state) => state.modal.hourIndex);
  const tempEvent = useAppSelector((state) => state.modal.modalEvent);
  const eventEdit = useAppSelector((state) => state.modal.editModalEvent);

  const eventDate = parseISO(tempEvent.date);
  const eventStartTime = parseISO(tempEvent.startTime);
  const eventEndTime = parseISO(tempEvent.endTime);

  const [title, setTitle] = useState('');

  const setShowModalCal = (bool: boolean) => {
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
        ? 256 + 60 + boxWidth * dayIndex - 400 - 5
        : 256 + 60 + boxWidth * dayIndex + boxWidth - 5;
    return `${Math.min(topPos, topPosMax)}px 0px 0px ${leftPos}px`;
  };

  const regex = /^오[전후] [01][0-9]:[0-5][0-9]$/;

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEventEditStartTime(e.target.value));
    if (regex.test(e.target.value)) {
      dispatch(
        setEventStartTime(
          formatISO(parse(e.target.value, 'a hh:mm', eventDate, { locale: ko }))
        )
      );
    }
  };

  const onChangeEndTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEventEditEndTime(e.target.value));
    if (regex.test(e.target.value))
      dispatch(
        setEventEndTime(
          formatISO(parse(e.target.value, 'a hh:mm', eventDate, { locale: ko }))
        )
      );
  };

  const onCloseModal = () => {
    // setShowModal(false);
    onClose();
    setTitle('');
    // setStartTime("오전 9:00");
    // setEndTime("오전 10:00");
  };

  const onClickSave = () => {
    dispatch(
      addEvent({
        date: formatISO(eventDate, { representation: 'date' }),
        index: -1,
        title: title,
        startTime: formatISO(eventStartTime),
        endTime: formatISO(eventEndTime),
      })
    );
    onClose();
    setTitle('');
  };

  return (
    <>
      {showModal ? (
        <div
          className="fixed inset-0 z-50"
          style={{ padding: calculatePos(dayIndexModal, hourIndexModal) }}
          onClick={onCloseModal}
        >
          <div
            className="drop-shadow-[5px_5px_25px_rgba(0,0,0,0.3)] relative w-[400px] h-fit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="h-9 flex items-start justify-between rounded-t bg-[#f1f3f4] p-1.5">
                <div></div>
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={onCloseModal}
                >
                  <span className="scale-[0.8] headerColor opacity-7 h-6 w-6 text-xl block py-0 rounded-full">
                    <span className="material-symbols-outlined">close</span>
                  </span>
                </button>
              </div>
              <div className="relative px-6 py-3 flex-auto">
                <input
                  className="ml-9 w-11/12 focus:outline-none border-b focus:border-b-2 focus:border-[#1a73e8] text-2xl"
                  placeholder="제목 추가"
                  value={title}
                  onChange={onChangeTitle}
                />
              </div>
              <div className="relative px-6 py-3 flex flex-row">
                <span className="pt-1.5 scale-[0.9] material-symbols-outlined">
                  schedule
                </span>
                <input
                  className="w-[130px] h-9 px-2 rounded-sm hover:bg-gray-100 focus:bg-gray-100 flex bg-transparent focus:outline-none focus:border-b-2 focus:border-[#1a73e8] text-[14px] text-center"
                  onClick={() => setShowModalCal(true)}
                  value={format(eventDate, 'M월 d일 (iii요일)', { locale: ko })}
                  readOnly
                />
                {regex.test(eventEdit.startTime) &&
                isBefore(eventStartTime, eventEndTime) ? (
                  <input
                    className="w-[85px] h-9 px-2 rounded-sm hover:bg-gray-100 focus:bg-gray-100 flex bg-transparent focus:outline-none focus:border-b-2 focus:border-[#1a73e8] text-[14px] text-center"
                    value={eventEdit.startTime}
                    onChange={onChangeStartTime}
                  />
                ) : (
                  <input
                    className="w-[85px] h-9 px-2 rounded-sm hover:bg-[#eacece] focus:bg-[#eacece] flex bg-[#eacece] focus:outline-none focus:border-b-2 focus:border-[#e81a1a] text-[14px] text-center"
                    value={eventEdit.startTime}
                    onChange={onChangeStartTime}
                  />
                )}
                <div className="h-9 flex bg-transparent text-[14px] text-center mt-1.5">
                  –
                </div>
                {regex.test(eventEdit.endTime) &&
                isAfter(eventEndTime, eventStartTime) ? (
                  <input
                    className="w-[85px] h-9 px-2 rounded-sm hover:bg-gray-100 focus:bg-gray-100 flex bg-transparent focus:outline-none focus:border-b-2 focus:border-[#1a73e8] text-[14px] text-center"
                    value={eventEdit.endTime}
                    onChange={onChangeEndTime}
                  />
                ) : (
                  <input
                    className="w-[85px] h-9 px-2 rounded-sm hover:bg-[#eacece] focus:bg-[#eacece] flex bg-[#eacece] focus:outline-none focus:border-b-2 focus:border-[#e81a1a] text-[14px] text-center"
                    value={eventEdit.endTime}
                    onChange={onChangeEndTime}
                  />
                )}
              </div>
              <div className="flex items-center justify-end p-2">
                <button
                  className="text-white bg-[#1a73e8] active:bg-yellow-700 text-sm px-6 py-2 rounded shadow hover:bg-[#4285f4] outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={onClickSave}
                >
                  저장
                </button>
              </div>
            </div>
          </div>
          <ModalSelectDate />
        </div>
      ) : null}
    </>
  );
};

export default ModalAddEvent;
