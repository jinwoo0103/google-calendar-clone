import { format, startOfWeek, addDays, parseISO, formatISO, isSameWeek } from 'date-fns';

import ko from 'date-fns/locale/ko';

function toWeek (date, prevDate=null) {

  const parseDate = parseISO(date);

  if ((prevDate) && isSameWeek(parseDate, parseISO(prevDate), {locale: ko, weekStartsOn: 1})) {
    return null;
  }

  // console.log("Week Changed!");

  const weekArray = new Array();
  const startDay = startOfWeek(parseDate, {locale: ko, weekStartsOn: 1});

  for (var i = 0; i < 7; i++)
    weekArray[i] = formatISO(addDays(startDay, i, {locale: ko}), { representation: 'date' });

  return weekArray;
}

export default toWeek