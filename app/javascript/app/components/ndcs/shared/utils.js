import camelCase from 'lodash/camelCase';
import sortBy from 'lodash/sortBy';
import { NOT_COVERED_LABEL } from 'data/constants';
import { europeanCountries, europeSlug } from 'data/european-countries';

const NOT_APPLICABLE_LABEL = 'Not Applicable';
const NOT_APPLICABLE_OR_NOT_INFO_LABEL = 'Not applicable or No information';

export const sortByIndexAndNotInfo = (a, b) => {
  const isNotInfo = i => i.index <= 0;
  if (isNotInfo(a)) return 1;
  if (isNotInfo(b)) return -1;
  return a.index - b.index;
};

// On LTS and Net-zero the selected indicator doesn't have values labeled as 'No Document Submitted'
// That is why we have two different functions to calculate the emissions data
export const getIndicatorEmissionsDataLTSandNetZero = (
  emissionsIndicator,
  selectedIndicator,
  legend,
  selectedCountriesISO,
  isDefaultLocationSelected
) => {
  if (!emissionsIndicator) return null;

  const NO_DOCUMENT_SUBMITTED = 'No Document Submitted';

  // Emission percentages filtered by the selected countries
  const emissionPercentages = isDefaultLocationSelected
    ? emissionsIndicator.locations
    : Object.entries(emissionsIndicator.locations).reduce(
      (acc, [iso, value]) => {
        if (selectedCountriesISO.includes(iso)) {
          acc[iso] = value;
        }
        return acc;
      },
      {}
    );

  const europeanLocationIsos = Object.keys(
    selectedIndicator.locations
  ).filter(iso => europeanCountries.includes(iso));

  // Check summedPercentage for needed adjustments
  let summedPercentage = 0;

  const data = legend.map(legendItem => {
    let itemEmissionsPercentage = 0;

    selectedCountriesISO.forEach(locationIso => {
      const locationValue = selectedIndicator.locations[locationIso];
      const { label_id: labelId } = locationValue || {};

      if (!emissionPercentages[locationIso]?.value) {
        console.warn('We dont have emission percentages for', locationIso);
        return;
      }

      // If they don't have a locationValue it means they are not submitted
      const isNoSubmittedLegendItem = legendItem.name === NO_DOCUMENT_SUBMITTED;
      const noLocationValue = !labelId || !locationValue;
      if (isNoSubmittedLegendItem && noLocationValue) {
        itemEmissionsPercentage += parseFloat(
          emissionPercentages[locationIso].value
        );
      }

      // If they do have a locationValue we have to check the locationValue labelId
      // and see if it matches with the legend item
      if (labelId === parseInt(legendItem.id, 10)) {
        if (locationIso === europeSlug) {
          const EUTotal = parseFloat(emissionPercentages[europeSlug].value);
          const europeanLocationsValue = europeanLocationIsos.reduce(
            (acc, iso) =>
              acc +
              (emissionPercentages[iso]
                ? parseFloat(emissionPercentages[iso].value)
                : 0),
            0
          );
          itemEmissionsPercentage += EUTotal - europeanLocationsValue; // To avoid double counting
        } else {
          itemEmissionsPercentage += parseFloat(
            emissionPercentages[locationIso].value
          );
        }
      }
    });
    summedPercentage += itemEmissionsPercentage;

    return {
      name: legendItem.name,
      value: itemEmissionsPercentage
    };
  });

  // If the sum of the percentages is less than 100 for now we just display a warning
  if (summedPercentage < 100) {
    console.warn('summedPercentage is less than 100', summedPercentage);

    // We add the missing percentage to the No Document Submitted legend item
    const notSubmittedDataItem = data.find(
      d => d.name === NO_DOCUMENT_SUBMITTED
    );
    if (notSubmittedDataItem) {
      const notApplicablePosition = data.indexOf(notSubmittedDataItem);
      data[notApplicablePosition] = {
        name: NO_DOCUMENT_SUBMITTED,
        value: notSubmittedDataItem.value + (100 - summedPercentage)
      };
    } else {
      data.push({
        name: NO_DOCUMENT_SUBMITTED,
        value: 100 - summedPercentage
      });
    }
  }

  return sortBy(
    data.filter(d => d.value !== 0),
    'value'
  ).reverse();
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
    ? emissionsIndicator.locations
    : Object.entries(emissionsIndicator.locations).reduce(
      (acc, [iso, value]) => {
        if (selectedCountriesISO.includes(iso)) {
          acc[iso] = value;
        }
        return acc;
      },
      {}
    );
  let summedPercentage = 0;
  let data = legend.map(legendItem => {
    let legendItemValue = 0;
    Object.entries(selectedIndicator.locations).forEach(entry => {
      const [locationIso, { label_id: labelId }] = entry;
      if (
        labelId === parseInt(legendItem.id, 10) &&
        selectedCountriesISO.includes(locationIso) &&
        // To avoid double counting
        !(
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
    data = data.map(d => ({
      ...d,
      value: summedPercentage === 0 ? 0 : (d.value * 100) / summedPercentage
    }));
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
