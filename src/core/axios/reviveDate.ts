/**
 * @see https://stackoverflow.com/questions/65692061/casting-dates-properly-from-an-api-response-in-typescript
 */

import parseISO from 'date-fns/parseISO';

const parseDates = (key: string, val: unknown) => {
  const isoDateRegex =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

  if (typeof val === 'string' && isoDateRegex.test(val)) return parseISO(val);
  return val;
};

const reviveDate = (data: unknown) => {
  if (typeof data !== 'string') return data;

  const response = JSON.parse(data, parseDates);
  return response;
};

export default reviveDate;
