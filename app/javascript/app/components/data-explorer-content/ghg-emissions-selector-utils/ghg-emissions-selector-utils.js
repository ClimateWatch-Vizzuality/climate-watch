const params = {
  sector: 'sectors',
  gas: 'gases'
};

const labelFields = [
  'name',
  'full_name',
  'value',
  'wri_standard_name',
  'slug',
  'number',
  'cw_title'
];

export function getGhgExternalParams(externalFields, meta, externalPrefix) {
  const parsedFields = {};
  Object.keys(externalFields).forEach(k => {
    const metaMatchingKey = k
      .replace(`${externalPrefix}-`, '')
      .replace('-', '_');
    if (metaMatchingKey === 'breakBy' || metaMatchingKey === 'undefined') { return null; }
    if (metaMatchingKey === 'filter') {
      const correctedKey = params[externalFields['external-breakBy']];
      const parsedFilterName = meta['historical-emissions'][correctedKey].find(
        f => f.id === parseInt(externalFields[k], 10)
      ).name;
      parsedFields[correctedKey] = parsedFilterName;
    } else {
      const labelObject = meta['historical-emissions'][metaMatchingKey].find(
        i =>
          i.id === parseInt(externalFields[k], 10) ||
          i.number === externalFields[k] ||
          i.name === externalFields[k]
      );
      const label = labelFields.find(f => labelObject && labelObject[f]);
      parsedFields[k.replace(`${externalPrefix}-`, '')] = labelObject[label];
    }
    return null;
  });
  return parsedFields;
}
