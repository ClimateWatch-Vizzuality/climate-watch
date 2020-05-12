import { formatPrefix } from 'd3-format';

export const formatSIwithDecimals = (value, precision = 2, unit = '') =>
  /*
    Formats label with an SI prefix and fixed number of decimal digits, e.g.:
      11592122500 -> 11.59G
      5372.28744 -> 5.37k
      4.731 -> 4.73
  */
  `${formatPrefix(`.${precision}`, value)(value)}${unit}`
;
