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

    return {
      name: legendItem.name,
      value: legendItemValue
    };
  });

  const notApplicableDataItem = data.find(d => d.name === 'Not Applicable');
  if (notApplicableDataItem) {
    const notApplicablePosition = data.indexOf(notApplicableDataItem);
    data[notApplicablePosition] = {
      name: noInformationLabel,
      value: notApplicableDataItem.value
    };
  }

  return data;
};

export const getLabels = (
  legend,
  noInformationLabel = NOT_APPLICABLE_OR_NOT_INFO_LABEL,
  noLabelOverride
) => {
  const tooltip = {};
  const theme = {};
  const getNoInfoLabel = () =>
    (noLabelOverride && noInformationLabel) ||
    (noInformationLabel === NOT_APPLICABLE_LABEL
      ? NOT_APPLICABLE_OR_NOT_INFO_LABEL
      : noInformationLabel);
  legend.forEach(l => {
    const legendName =
      l.name === noInformationLabel ? getNoInfoLabel() : l.name;
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

export const getHoverIndex = (emissionsCardData, hoveredlegendData) => {
  const hoveredLegendName = hoveredlegendData.name;
  const hoveredEmissionsItem = emissionsCardData.data.find(d =>
    d.name.toLowerCase().startsWith(hoveredLegendName.toLowerCase())
  );
  return emissionsCardData.data.indexOf(hoveredEmissionsItem);
};
