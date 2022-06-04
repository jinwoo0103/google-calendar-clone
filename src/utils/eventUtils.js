import { differenceInMinutes, format, formatISO, getHours, getMinutes, parseISO } from 'date-fns';
import { hoursToMinutes } from 'date-fns/esm';

import ko from 'date-fns/locale/ko';

function eventLen (event) {
  const startTime = parseISO(event.startTime);
  const endTime = parseISO(event.endTime);
  return Math.round(0.8 * differenceInMinutes(endTime, startTime));
}

function eventPos (event) {
  const startTime = parseISO(event.startTime);
  return Math.round(0.8 * (hoursToMinutes(getHours(startTime)) + getMinutes(startTime)));
}

function eventDetails (event) {
  const startTime = parseISO(event.startTime);
  const endTime = parseISO(event.endTime);

  const formatStr = (time) => {
    return (format(startTime, "mm", { locale: ko }) === "00") ? "hh시" : "hh:mm";
  }

  const timeStr = (format(startTime, "a", { locale: ko }) === (format(endTime, "a", { locale: ko })))
    ? `${format(startTime, `a ${formatStr(startTime)}`, { locale: ko })} ~ ${format(endTime, `${formatStr(startTime)}`, { locale: ko })}`
    : `${format(startTime, `a ${formatStr(startTime)}`, { locale: ko })} ~ ${format(endTime, `a ${formatStr(startTime)}`, { locale: ko })}`;
  
  return (
    <div>
      <div>{event.title || "(제목 없음)"}</div>
      <div>{timeStr}</div>
    </div>
  );
}

export { eventLen, eventPos, eventDetails };