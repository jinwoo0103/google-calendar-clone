import { format, isSameMonth, parseISO } from 'date-fns';
import ko from 'date-fns/locale/ko';

function calcMonth(week: string[]) {
  const result = isSameMonth(parseISO(week[0]), parseISO(week[6]))
    ? format(parseISO(week[0]), 'y년 LLL', { locale: ko })
    : format(parseISO(week[0]), 'y년 LLL ', { locale: ko }) +
      format(parseISO(week[6]), '– LLL', { locale: ko });

  return result;
}

export default calcMonth;
