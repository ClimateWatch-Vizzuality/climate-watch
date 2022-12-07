import camelCase from 'lodash/camelCase';
import sortBy from 'lodash/sortBy';
import { NOT_COVERED_LABEL } from 'data/constants';
import { europeanCountries } from 'data/european-countries';

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
  selectedCountriesISO,
  isDefaultLocationSelected
) => {
  if (!emissionsIndicator) return null;
  // If we have selected countries we calculate the proportional regional values instead of global
  const emissionPercentages = isDefaultLocationSelected
    ? Object.entries(emissionsIndicator.locations).reduce(
      (acc, [iso, value]) => {
        if (selectedCountriesISO.includes(iso)) {
          acc[iso] = value;
        }
        return acc;
      },
      {}
    )
    : emissionsIndicator.locations;
  let summedPercentage = 0;
  let data = legend.map(legendItem => {
    let legendItemValue = 0;
    Object.entries(selectedIndicator.locations).forEach(entry => {
      const [locationIso, { label_id: labelId }] = entry;
      if (
        labelId === parseInt(legendItem.id, 10) &&
        // To avoid double counting
        !(
          selectedCountriesISO &&
          selectedCountriesISO.includes('EUU') &&
          europeanCountries.includes(locationIso)
        ) &&
        emissionPercentages[locationIso]
      ) {
        legendItemValue += parseFloat(emissionPercentages[locationIso].value);
      }
    });
    summedPercentage += legendItemValue;

    return {
      name: legendItem.name,
      value: legendItemValue
    };
  });

  if (!isDefaultLocationSelected) {
    // Readjust percentage values to summedPercentage
    data = data.map(d => ({ ...d, value: (d.value * 100) / summedPercentage }));
    // TODO: How to calculate Not covered when we have a country selection
    // Do we have not covered on this case?
  } else if (summedPercentage < 100) {
    data.push({
      name: NOT_COVERED_LABEL,
      value: 100 - summedPercentage
    });
  }

  return sortBy(
    data.filter(d => d.value !== 0),
    'value'
  ).reverse();
};

export const getLabels = ({
  legend,
  noInformationLabel = NOT_APPLICABLE_OR_NOT_INFO_LABEL,
  noLabelOverride,
  hasNotCovered
}) => {
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
  if (hasNotCovered) {
    tooltip.notCovered = {
      label: NOT_COVERED_LABEL
    };
    theme.notCovered = {
      label: NOT_COVERED_LABEL,
      stroke: '#83A2E5'
    };
  }
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
