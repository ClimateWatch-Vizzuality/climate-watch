import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import { deburrUpper } from 'app/utils';
import remove from 'lodash/remove';
import pick from 'lodash/pick';
import sortBy from 'lodash/sortBy';
import { ESP_BLACKLIST } from 'data/constants';
import { sortLabelByAlpha } from 'utils/graphs';

const getScenarioId = state => state.id || null;
const getQuery = state => deburrUpper(state.query) || '';
const getCategorySelected = state => state.categorySelected || null;
const getData = state =>
  (!isEmpty(state.espScenariosData) ? state.espScenariosData : null);
const getTrendData = state =>
  (!isEmpty(state.espTrendData) ? state.espTrendData : null);
const getLocations = state =>
  (!isEmpty(state.espLocationsData) ? state.espLocationsData : null);
const getAvailableLocations = state =>
  (!isEmpty(state.espAvailableLocationsData)
    ? state.espAvailableLocationsData
    : null);

const getLocationSelected = createSelector(
  [getAvailableLocations, state => state.locationSelected],
  (locations, selectedLocation) => {
    if (!locations) return null;
    if (!selectedLocation) {
      const worldLocation = locations.find(l => l.name === 'World');
      return (
        (worldLocation && worldLocation.id) || (locations[0] && locations[0].id)
      );
    }
    return parseInt(selectedLocation, 10);
  }
);

const getScenarioData = createSelector([getData, getScenarioId], (data, id) => {
  if (!data || !id) return null;
  return data.find(d => String(d.id) === id) || null;
});

const getScenarioTrendData = createSelector(
  [getTrendData, getLocationSelected, getScenarioId],
  (data, selectedLocation, id) => {
    if (!selectedLocation || !data.locations[selectedLocation]) return null;
    if (!data || !id || !data.locations) return null;
    return data.locations[selectedLocation].scenarios[id] || null;
  }
);

const getIndicatorIds = createSelector(getScenarioData, data => {
  if (!data) return null;
  return uniq(data.indicator_ids) || null;
});

const scenarioIndicatorsData = createSelector(
  [state => state.espIndicatorsData, getIndicatorIds],
  (indicatorsData, ids) => {
    if (!ids || isEmpty(indicatorsData) || isEmpty(ids)) return null;
    return indicatorsData.filter(i => ids.indexOf(i.id) > -1) || null;
  }
);

export const getCategories = createSelector(scenarioIndicatorsData, data => {
  if (!data) return null;
  const categories = [];
  data.forEach(c => {
    if (c.category) categories.push(c.category);
  });
  return sortLabelByAlpha(
    uniqBy(categories, 'id').map(c => ({
      value: c.name,
      label: c.name
    }))
  );
});

export const getSelectedCategoryOption = createSelector(
  [getCategories, getCategorySelected],
  (categories, categorySelected) => {
    if (!categories || !categorySelected) return null;
    return categories.find(c => c.value === categorySelected);
  }
);

export const getLocationOptions = createSelector(
  [getAvailableLocations],
  locations => {
    if (!locations) return null;
    return locations.map(location => ({
      value: location.id.toString(),
      label: location.name
    }));
  }
);

export const getSelectedLocationOption = createSelector(
  [getLocations, getLocationSelected],
  (locations, selectedLocation) => {
    if (!locations || !selectedLocation) return null;
    const location = locations.find(l => l.id === selectedLocation);
    return {
      value: location.id,
      label: location.name
    };
  }
);

// DATA

const filteredDataBySearch = createSelector(
  [scenarioIndicatorsData, getQuery],
  (data, query) => {
    if (!data) return null;
    if (!query) return data;
    return data.filter(d =>
      Object.keys(d).some(key => {
        if (Object.prototype.hasOwnProperty.call(d, key) && d[key] !== null) {
          return deburrUpper(d[key]).indexOf(query) > -1;
        }
        return false;
      })
    );
  }
);

export const filteredDataByCategory = createSelector(
  [filteredDataBySearch, getCategorySelected],
  (data, category) => {
    if (!data) return null;
    if (!category) return data;
    return data.filter(
      indicator => indicator.category.name.indexOf(category) > -1
    );
  }
);

export const dataWithTrendLine = createSelector(
  [filteredDataByCategory, getScenarioTrendData],
  (data, trendData) => {
    if (!data) return null;
    const dataWithTrendLines = [];
    data.forEach(d => {
      const rowData = d;
      const indicatorId = d.id;
      const indicatorTrendData =
        trendData && trendData.find(t => t.indicator_id === indicatorId);
      if (indicatorTrendData) {
        rowData.trend = isEmpty(indicatorTrendData)
          ? null
          : sortBy(indicatorTrendData.values, ['year']).map(v =>
            parseFloat(v.value)
          );
        dataWithTrendLines.push(rowData);
      }
    });
    return dataWithTrendLines;
  }
);

export const filterDataByBlackList = createSelector(
  [dataWithTrendLine],
  data => {
    if (!data || isEmpty(data)) return null;
    const whiteList = remove(
      Object.keys(data[0]),
      n => ESP_BLACKLIST.indicators.indexOf(n) === -1
    );
    return data.map(d => pick(d, whiteList));
  }
);

export const sortDataByCategory = createSelector(
  [filterDataByBlackList],
  data => {
    if (!data || isEmpty(data)) return null;
    return sortBy(data, d => d.category.name);
  }
);

export const defaultColumns = () => [
  'category',
  'subcategory',
  'name',
  'unit',
  'trend'
];
export default {
  getLocationOptions,
  sortDataByCategory,
  defaultColumns,
  getCategories,
  getSelectedCategoryOption,
  getSelectedLocationOption
};
