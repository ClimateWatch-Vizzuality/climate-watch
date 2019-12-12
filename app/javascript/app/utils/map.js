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

export function getColorByIndex(data, index, colors = buckets) {
  const length = Object.keys(data).length;
  if (index === -2 || length === 1) return '#ddd';
  return colors[length - 2][index - 1] || '#E5E5EB';
}

export function createLegendBuckets(
  locations,
  labels,
  isos,
  notApplicableLabel = 'Not Applicable'
) {
  if (Object.keys(locations) === isos) return labels;
  // An index of -2 is applied in the backend to 'No Data Submitted'
  const notSubmitted = Object.keys(labels).find(l => labels[l].index === -2);
  if (notSubmitted) {
    const notApplicableKey = parseInt(notSubmitted, 10) + 1;
    return {
      ...labels,
      [notApplicableKey]: { name: notApplicableLabel, index: 0 }
    };
  }
  return { ...labels, 0: { name: notApplicableLabel, index: 0 } };
}

export default {
  getColorByIndex,
  createLegendBuckets
};
