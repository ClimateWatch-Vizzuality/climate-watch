const buckets = [
  ['#EEBC8F', '#25597C'],
  ['#EEBC8F', '#FEE08D', '#25597C'],
  ['#EEBC8F', '#FEE08D', '#5081A6', '#25597C'],
  ['#EEBC8F', '#FEE08D', '#ACBBBF', '#5081A6', '#25597C'],
  ['#EEBC8F', '#F6CE8E', '#FEE08D', '#90B1CB', '#5081A6', '#25597C'],
  ['#EEBC8F', '#F6CE8E', '#FEE08D', '#90B1CB', '#7199B8', '#5081A6', '#25597C'],
  [
    '#EEBC8F',
    '#F6CE8E',
    '#FEE08D',
    '#ACBBBF',
    '#90B1CB',
    '#7199B8',
    '#5081A6',
    '#25597C'
  ],
  [
    '#EEBC8F',
    '#F6CE8E',
    '#FEE08D',
    '#E3D2A0',
    '#ACBBBF',
    '#90B1CB',
    '#7199B8',
    '#5081A6',
    '#25597C'
  ],
  [
    '#EEBC8F',
    '#F6CE8E',
    '#FEE08D',
    '#E3D2A0',
    '#C5C5B2',
    '#ACBBBF',
    '#90B1CB',
    '#7199B8',
    '#5081A6',
    '#25597C'
  ]
];

export function getColorByIndex(data, index) {
  const length = Object.keys(data).length;
  return buckets[length][index] || '#E5E5EB';
}

export default {
  getColorByIndex
};
