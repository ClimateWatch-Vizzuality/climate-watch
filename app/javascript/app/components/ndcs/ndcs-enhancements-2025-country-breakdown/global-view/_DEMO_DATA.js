/* eslint-disable no-unused-vars */
const DEMO_DATA_HISTORICAL = [
  { x: 2014, y: 43 },
  { x: 2015, y: 42 },
  { x: 2016, y: 44 },
  { x: 2017, y: 48 },
  { x: 2018, y: 48 },
  { x: 2019, y: 46 },
  { x: 2020, y: 45 },
  { x: 2021, y: 48 }
];

const DEMO_DATA_PROJECTION = [
  { x: 2021, y: 48 },
  { x: 2030, y: 52 }
];

const DEMO_TARGETS_DATA = {
  2030: {
    '2.0C': 38,
    '1.5C': 31
  },
  2035: {
    '2.0C': 34,
    '1.5C': 24
  }
};

export { DEMO_DATA_HISTORICAL, DEMO_DATA_PROJECTION, DEMO_TARGETS_DATA };
