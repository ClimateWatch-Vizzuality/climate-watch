import camelCase from 'lodash/camelCase';

const NOT_APPLICABLE_LABEL = 'Not Applicable';
const NOT_APPLICABLE_OR_NOT_INFO_LABEL = 'Not applicable or No information';

export const sortByIndexAndNotInfo = (a, b) => {
  const isNotInfo = i => i.index <= 0;
  if (isNotInfo(a)) return 1;
  if (isNotInfo(b)) return -1;
  return a.index - b.index;
};

export const getIndicatorEmissionsData = (
  emissionsIndicator,
  selectedIndicator,
  legend,
  noInformationLabel = NOT_APPLICABLE_OR_NOT_INFO_LABEL
) => {
  if (!emissionsIndicator) return null;
  const emissionPercentages = emissionsIndicator.locations;
  let summedPercentage = 0;
  const data = legend.map(legendItem => {
    let legendItemValue = 0;
    Object.entries(selectedIndicator.locations).forEach(entry => {
      const [locationIso, { label_id: labelId }] = entry;
      if (
        labelId === parseInt(legendItem.id, 10) &&
        locationIso !== 'EUU' && // To avoid double counting
        emissionPercentages[locationIso]
      ) {
        legendItemValue += parseFloat(emissionPercentages[locationIso].value);
      }
    });
    summedPercentage += legendItemValue;

    return {
      name: camelCase(legendItem.name),
      value: legendItemValue
    };
  });

  if (summedPercentage < 100) {
    data.push({
      name: noInformationLabel,
      value: 100 - summedPercentage
    });
  }
  return data;
};

export const getLabels = (
  legend,
  noInformationLabel = NOT_APPLICABLE_OR_NOT_INFO_LABEL
) => {
  const tooltip = {};
  const theme = {};
  legend.forEach(l => {
    const legendName =
      l.name === noInformationLabel || l.name === NOT_APPLICABLE_LABEL
        ? noInformationLabel
        : l.name;
    tooltip[camelCase(legendName)] = {
      label: legendName
    };
    theme[camelCase(legendName)] = {
      label: legendName,
      stroke: l.color
    };
  });
  return {
    tooltip,
    theme
  };
};
