import {
  startOfWeek,
  addDays,
  parseISO,
  formatISO,
  isSameWeek,
} from 'date-fns';
import ko from 'date-fns/locale/ko';

function toWeek(date: string, prevDate: string | null = null): string[] | null {
  const parseDate: Date = parseISO(date);

  if (
    prevDate &&
    isSameWeek(parseDate, parseISO(prevDate), { locale: ko, weekStartsOn: 1 })
  ) {
    return null;
  }

  const weekArray: string[] = new Array();
  const startDay: Date = startOfWeek(parseDate, {
    locale: ko,
    weekStartsOn: 1,
  });

  for (var i = 0; i < 7; i++)
    weekArray[i] = formatISO(addDays(startDay, i), {
      representation: 'date',
    });

  return weekArray;
}

export default toWeek;
