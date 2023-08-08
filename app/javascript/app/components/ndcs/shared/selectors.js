import uniq from 'lodash/uniq';
import { europeanCountries, europeSlug } from 'app/data/european-countries';
import {
  NO_DOCUMENT_SUBMITTED_COUNTRIES,
  COUNTRY_STYLES
} from 'components/ndcs/shared/constants';
import { getColorByIndex, shouldShowPath } from 'utils/map';

export const getColorException = (indicator, label) => {
  if (indicator.value !== 'child_sensitive_NDC') return null;
  // Child sensitive NDC indicator label colors
  return {
    'Category A': '#53AF5C',
    'Category B': '#8EC593',
    'Category C': '#C8DAC9',
    'No new or updated NDC submitted': '#757584'
  }[label.name];
};

export const selectedLocationsFunction = (locations, search) => {
  if (!locations || !locations.length || !locations.length > 2) return null;
  const { locations: selected } = search || {};
  const defaultLocation = locations.find(d => d.value === 'WORLD');
  if (selected) {
    const selectedISOS = selected.split(',');
    return (
      locations.filter(location =>
        selectedISOS.some(iso => iso === location.value)
      ) || [defaultLocation]
    );
  }
  return [defaultLocation];
};

export const selectedCountriesISOFunction = selectedCountries => {
  if (!selectedCountries) return null;
  return uniq(selectedCountries.map(c => c.iso_code3 || c.iso));
};

export const isDefaultLocationSelectedFunction = selectedLocations => {
  if (!selectedLocations) return false;
  return (
    selectedLocations.length === 1 && selectedLocations[0].value === 'WORLD'
  );
};

export const selectedCountriesFunction = (locations, regions, countries) => {
  if (!locations || !locations.length || !regions || !regions.length) {
    return countries;
  }
  const PARTIES_MISSING_IN_WORLD_SECTION = [...NO_DOCUMENT_SUBMITTED_COUNTRIES];
  const selectedRegionsCountries = locations.reduce((acc, location) => {
    let members = acc;
    if (location.iso === 'TOP') {
      return [...members, ...location.regionCountries];
    }
    if (location.iso === 'WORLD') {
      return [
        ...members,
        ...location.regionCountries,
        ...PARTIES_MISSING_IN_WORLD_SECTION
      ];
    }
    if (location.iso === 'EUUGROUP') {
      regions.some(region => {
        if (region.iso_code3 === 'EUU') {
          // Add EUU party to the EUUGROUP selection
          const EUULocation = countries.find(l => l.iso_code3 === 'EUU');
          members = [...acc, EUULocation, ...region.members];
          return true;
        }
        return false;
      });
    }
    // EUU is the aggregated party and is a 'country' so we don't show members
    if (location.iso !== 'EUU') {
      regions.some(region => {
        if (region.iso_code3 === location.iso) {
          members = [...acc, ...region.members];
          return true;
        }
        return false;
      });
    }

    return members;
  }, []);
  const selectedRegionsCountriesISOS = selectedRegionsCountries.map(
    c => c.iso_code3
  );
  const notIncludedSelectedCountries = locations.reduce((acc, location) => {
    const updatedAcc = acc;
    countries.some(country => {
      if (
        country.iso_code3 === location.iso &&
        !selectedRegionsCountriesISOS.includes(country.iso_code3)
      ) {
        updatedAcc.push(country);
        return true;
      }
      return false;
    });
    return updatedAcc;
  }, []);

  return selectedRegionsCountries.length || notIncludedSelectedCountries.length
    ? [...selectedRegionsCountries, ...notIncludedSelectedCountries].filter(
      Boolean
    )
    : countries;
};

export const categoryIndicatorsFunction = (indicatorsParsed, category) => {
  if (!indicatorsParsed || !category) return null;
  const categoryIndicators = indicatorsParsed.filter(
    indicator =>
      indicator.categoryIds &&
      indicator.categoryIds.indexOf(parseInt(category.id, 10)) > -1
  );
  return categoryIndicators;
};

// Get whether the EU countries are selected, checking by the 'EUU' iso code.
// eg: ['EUU', ...]
const getIsEUGroupSelected = selectedCountriesISO =>
  selectedCountriesISO.includes(europeSlug);

// Get whether all EU countries are selected, checking by all their individual iso codes.
// eg: ['PRT', 'ESP', ...])
const getAreAllEuCountriesSelected = selectedCountriesISO =>
  europeanCountries.every(c => selectedCountriesISO.includes(c));

// Get whether all EU countries are selected, either by the 'EUU' iso code or
// all their individual iso codes.
export const getIsEUSelectedFunction = selectedCountriesISO =>
  getIsEUGroupSelected(selectedCountriesISO) ||
  getAreAllEuCountriesSelected(selectedCountriesISO);

// Get wether individual EU countries paths should be removed from the map, based on both
// the "Visualize individual submissions of EU Members" checkbox and on whether all EU
// countries are selected.
const getRemoveEuCountriesFromPaths = (
  showEUCountriesChecked,
  selectedCountriesISO
) => !showEUCountriesChecked && getIsEUSelectedFunction(selectedCountriesISO);

// This function takes the array from selectedCountriesISO as well as the value from the
// "Visualize individual submissions of EU Members" and creates a new array of iso codes
// that can be used to correctly highlight the selected countries on the map.
export const selectedMapCountriesISOFunction = (
  showEUCountriesChecked,
  selectedCountriesISO
) => {
  // EU countries selected as a group ('EUU' iso code)
  const euGroupSelected = getIsEUGroupSelected(selectedCountriesISO);

  // All EU countries selected by their individual ISO codes
  const allEuCountriesSelected = getAreAllEuCountriesSelected(
    selectedCountriesISO
  );

  let countriesToDisplay = selectedCountriesISO;

  // If the EU countries are displayed as a group and we want to display them individually
  // on the map, then we remove the 'EUU' iso code and add the countries' individual iso codes.
  if (euGroupSelected && showEUCountriesChecked) {
    countriesToDisplay = selectedCountriesISO.filter(iso => iso !== europeSlug);
    countriesToDisplay.push(...europeanCountries);
  }

  // If the EU countries are displayed individually by their iso codes but we would like
  // to display them as the EU group, we remove their individual iso codes and add the 'EUU' one.
  if (allEuCountriesSelected && !showEUCountriesChecked) {
    countriesToDisplay = selectedCountriesISO.filter(
      iso => !europeanCountries.includes(iso)
    );
    countriesToDisplay.push(europeSlug);
  }

  return countriesToDisplay;
};

// Based on the indicator, zoom level, the selected countries and the "Visualize individual
// submissions of EU Members" checkbox, return the paths to the map with the correct countries
// highlighted.
export const pathsWithStylesFunction = (
  indicator,
  zoom,
  showEUCountriesChecked,
  worldPaths,
  selectedCountriesISO
) => {
  if (!indicator || !worldPaths) return [];
  const paths = [];

  const removeEuCountriesFromPaths = getRemoveEuCountriesFromPaths(
    showEUCountriesChecked,
    selectedCountriesISO
  );

  const countriesToDisplayISO = selectedMapCountriesISOFunction(
    showEUCountriesChecked,
    selectedCountriesISO
  );

  const selectedWorldPaths = removeEuCountriesFromPaths
    ? worldPaths.filter(p => !europeanCountries.includes(p.properties.id))
    : worldPaths;

  selectedWorldPaths.forEach(path => {
    if (shouldShowPath(path, zoom)) {
      const { locations, legendBuckets } = indicator;

      if (!locations) {
        paths.push({
          ...path,
          COUNTRY_STYLES
        });
        return null;
      }

      const iso = path.properties && path.properties.id;
      const countryData = locations[iso];
      const strokeWidth = zoom > 2 ? (1 / zoom) * 2 : 0.5;
      const style = {
        ...COUNTRY_STYLES,
        default: {
          ...COUNTRY_STYLES.default,
          'stroke-width': strokeWidth,
          fillOpacity: 1
        },
        hover: {
          ...COUNTRY_STYLES.hover,
          cursor: 'pointer',
          'stroke-width': strokeWidth,
          fillOpacity: 1
        }
      };

      if (!countriesToDisplayISO.includes(iso)) {
        const color = '#e8ecf5';
        style.default.fill = color;
        style.hover.fill = color;
      } else if (countryData && countryData.label_id) {
        const label = legendBuckets[countryData.label_id];
        const color =
          getColorException(indicator, label) ||
          getColorByIndex(legendBuckets, label.index);
        style.default.fill = color;
        style.hover.fill = color;
      }

      paths.push({
        ...path,
        style
      });
    }
    return null;
  });
  return paths;
};

export const locationsNamesFunction = (locations, regions, countries) => {
  if (!locations || !locations.length || (!regions && !countries)) return [];
  const selectedRegionsNames = locations.reduce((acc, location) => {
    let names = acc;
    regions.some(region => {
      if (
        region.iso_code3 === location.iso ||
        (location.iso === 'EUUGROUP' && region.iso_code3 === 'EUU')
      ) {
        names = [...acc, region.wri_standard_name];
        return true;
      }
      if (location.iso === 'TOP') {
        names = [...acc, location.label];
        return true;
      }

      return false;
    });

    return names;
  }, []);
  const selectedCountriesNames = locations.reduce((acc, location) => {
    const updatedAcc = acc;
    countries.some(country => {
      if (country.iso_code3 === location.iso) {
        updatedAcc.push(country.wri_standard_name);
        return true;
      }
      return false;
    });
    return updatedAcc;
  }, []);
  return uniq([...selectedRegionsNames, ...selectedCountriesNames]);
};

const median = numbers => {
  if (numbers.length === 0) return null;
  const sorted = Array.from(numbers).sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
};

export const getVulnerabilityDataFunction = (
  legend,
  selectedIndicator,
  indicators,
  selectedCountriesISO
) => {
  if (!legend || !selectedIndicator || !indicators) {
    return null;
  }

  const vulnerabilityIndicator = indicators.find(
    i => i.slug === 'vulnerability'
  );
  const isosByLabelId = Object.entries(selectedIndicator.locations).reduce(
    (acc, [iso, value]) => {
      if (selectedCountriesISO.includes(iso)) {
        acc[value.label_id] = [...(acc[value.label_id] || []), iso];
      }
      return acc;
    },
    {}
  );

  if (!vulnerabilityIndicator) return null;
  const legendWithData = legend.map(l => {
    const labelIsos = isosByLabelId[l.id] || [];
    const isosValues = labelIsos
      .map(iso => {
        const vulnerabilityValue = vulnerabilityIndicator.values.find(
          v => v.location === iso
        );
        if (vulnerabilityValue && vulnerabilityValue.value) {
          return parseFloat(vulnerabilityValue.value);
        }
        return null;
      })
      .filter(v => v !== null || v === 0);
    const valuesMedian = median(isosValues);
    const medianCategory =
      // eslint-disable-next-line no-nested-ternary
      valuesMedian < 0.433 ? 'Low' : 'High';
    return {
      ...l,
      median: Math.round(valuesMedian * 1000) / 1000,
      medianCategory
    };
  });

  return legendWithData;
};
