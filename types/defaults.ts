import {
  addDays,
  startOfWeek,
  endOfWeek,
  addWeeks,
  startOfMonth,
  endOfMonth,
  addMonths, startOfYear, endOfYear, addYears,
} from 'date-fns';

// eslint-disable-next-line no-unused-vars
import { DefinedRange } from './types';

export const getDefaultRanges = (date: Date, locale?: Locale): DefinedRange[] => [
  {
    label: 'Today',
    startDate: date,
    endDate: date,
  },
  {
    label: 'Yesterday',
    startDate: addDays(date, -1),
    endDate: addDays(date, -1),
  },
  {
    label: 'Last Week',
    startDate: startOfWeek(addWeeks(date, -1), {locale}),
    endDate: endOfWeek(addWeeks(date, -1), {locale}),
  },
  {
    label: 'Last Month',
    startDate: startOfMonth(addMonths(date, -1)),
    endDate: endOfMonth(addMonths(date, -1)),
  },
  // {
  //   label: 'Last Semester',
  //   startDate: startOfYear(date),
  //   endDate: endOfYear(date),
  // },
  {
    label: 'Last Year',
    startDate: startOfYear(addYears(date, -1)),
    endDate: endOfYear(addYears(date, -1)),
  },
  {
    label: 'Last 7 days',
    startDate: addDays(date, -6),
    endDate: date,
  },
  {
    label: 'Last 30 days',
    startDate: addDays(date, -29),
    endDate: date,
  },
  {
    label: 'Last 90 days',
    startDate: addDays(date, -89),
    endDate: date,
  },
  {
    label: 'Last 180 days',
    startDate: addDays(date, -179),
    endDate: date,
  },
  {
    label: 'Last 365 days',
    startDate: addDays(date, -364),
    endDate: date,
  },
 
];
