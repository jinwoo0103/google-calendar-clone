import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { change } from '../features/selectedSlice';

import { addWeeks, formatISO, parseISO, format } from 'date-fns';

import ko from 'date-fns/locale/ko';

import calcMonth from '../utils/calcMonth';
import DropDown from './DropDown';

function Header() {
  const selectedDate = useSelector((state) => parseISO(state.selected.date));
  const selectedWeek = useSelector((state) => state.selected.week);

  const dispatch = useDispatch();

  const onClickToday = () => {
    dispatch(change(formatISO(new Date(), { representation: 'date' })));
  };

  const onClickPrev = () => {
    dispatch(change(formatISO(addWeeks(selectedDate, -1), { representation: 'date' })));
  };

  const onClickNext = () => {
    dispatch(change(formatISO(addWeeks(selectedDate, 1), { representation: 'date' })));
  };

  const calendarIconLink = () => {
    const todayDayNumber = format(new Date(), "d", { locale: ko });
    return `https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_${todayDayNumber}_2x.png`
  };

  return (
    <header className="flex flex-row basis-16 p-2 outline outline-1 outline-gray-300">
			<div className="flex flex-row items-center shrink w-[238px] h-full pr-[30px]">
        <svg className="fill-gray-600 w-12 h-12 p-3 mx-1" focusable="false" viewBox="0 0 24 24">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
        </svg>
        <img className="w-11 h-10 pr-1 my-1" src={calendarIconLink()}/>
        <div className="text-[22px] pl-1 text-gray-600">캘린더</div>
			</div>
			<div className="flex flex-row grow h-full items-center" >
				<button className="h-[34px] px-[12px] py-[7px] ml-[8px] mr-[12px] py-bg-transparent outline outline-1 outline-gray-300 headerHoverColor text-sm rounded"
          onClick={onClickToday}>
					오늘
				</button>
        <button className="h-8 w-8 ml-2 bg-transparent text-sm rounded-full headerColor headerHoverColor"
          onClick={onClickPrev}>
					<span className="material-symbols-sharp scale-[0.6] pt-1.5 pl-2">
            arrow_back_ios
          </span>
				</button>
        <button className="h-8 w-8 bg-transparent text-sm rounded-full headerColor headerHoverColor"
          onClick={onClickNext}>
					<span className="material-symbols-sharp scale-[0.6] pt-1.5 pl-1">
            arrow_forward_ios
          </span>
				</button>
        <p className="ml-[10px] p-[8px] text-[22px] text-[#3C4043]">{calcMonth(selectedWeek)}</p>
			</div>
      <div className="flex flex-row h-full items-center">
        <button className="h-10 w-10 bg-transparent text-sm rounded-full headerColor headerHoverColor">
					<span className="material-symbols-sharp pt-1.5">
            search
          </span>
				</button>
        <button className="h-10 w-10 bg-transparent text-sm rounded-full headerColor headerHoverColor">
					<span className="material-symbols-sharp pt-1.5">
            help
          </span>
				</button>
        <button className="h-10 w-10 bg-transparent text-sm rounded-full headerColor headerHoverColor">
					<span className="material-symbols-sharp pt-1.5">
            settings
          </span>
				</button>
        <DropDown />
      </div>
			<div className="flex flex-row w-[120px] h-full items-center pl-[30px] pr-[4px]">
        <button className="h-10 w-10 bg-transparent text-sm rounded-full headerColor headerHoverColor">
					<span className="material-symbols-sharp pt-1.5">
            apps
          </span>
				</button>
        <img className="h-10 w-10 bg-transparent text-sm rounded-full headerColor headerHoverColor p-1" 
          src="https://www.ringleplus.com/assets/img/logo/logo_purple.svg" />
			</div>
		</header>
  );
}

export default Header;
