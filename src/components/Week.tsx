import React from 'react';
import { useAppSelector } from '@/redux/hooks';

import { format, parseISO } from 'date-fns';

import ko from 'date-fns/locale/ko';

function Week() {
  const selectedWeek = useAppSelector((state) => state.calendar.curWeek);

  return (
    <div className="flex flex-row pr-[14px] border-r-[1px]">
      <div className="flex flex-col basis-[60px]">
        <div className="pt-2 mt-2 h-8"></div>
        <div className="h-[48px]"></div>
        <div className="flex flex-row">
          <div className="h-[24px] hourNumberColor w-[51px]">GMT+09</div>
          <div className="h-[24px] border-b-[1px] w-[9px]"></div>
        </div>
      </div>
      {selectedWeek &&
        selectedWeek.map((day: string, index: number) => {
          return (
            <div
              key={`Week_${day}`}
              id={`Week_${day}`}
              className="flex flex-col flex-initial basis-[14.2857143%]"
            >
              <div className="pt-2 text-center mt-2 h-8 text-[11px]">
                {format(parseISO(day), 'E', { locale: ko })}
              </div>
              <div className="text-center h-[48px] text-[26px]">
                {format(parseISO(day), 'd', { locale: ko })}
              </div>
              <div className="h-[24px] border-b-[1px] border-l-[1px]"></div>
            </div>
          );
        })}
    </div>
  );
}

export default Week;
