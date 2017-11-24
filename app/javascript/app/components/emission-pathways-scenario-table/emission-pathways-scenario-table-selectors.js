import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import uniq from 'lodash/uniq';
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

const getScenarioData = createSelector([getData, getScenarioId], (data, id) => {
  if (!data || !id) return null;
  return data.find(d => String(d.id) === id) || null;
});

const getScenarioTrendData = createSelector(
  [getTrendData, getScenarioId],
  (data, id) => {
    if (!data || !id || !data.locations) return null;
    if (!data.locations['267']) return null;
    return data.locations['267'].scenarios[id] || null;
  }
);

const getIndicatorIds = createSelector(getScenarioData, data => {
  if (!data) return null;
  return data.indicators.map(i => i.id) || null;
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
    uniq(categories).map(c => ({
      value: c,
      label: c
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

// DATA

const flattenedData = createSelector(scenarioIndicatorsData, data => {
  if (!data || isEmpty(data)) return null;
  const attributesWithObjects = ['model', 'category', 'subcategory'];
  return data.map(d => {
    const flattenedD = d;
    attributesWithObjects.forEach(a => {
      if (Object.prototype.hasOwnProperty.call(d, a)) {
        flattenedD[a] = d[a] && d[a].name;
      }
    });
    return flattenedD;
  });
});

const filteredDataBySearch = createSelector(
  [flattenedData, getQuery],
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
    return data.filter(indicator => indicator.category.indexOf(category) > -1);
  }
);

export const dataWithTrendLine = createSelector(
  [filteredDataByCategory, getScenarioTrendData],
  (data, trendData) => {
    if (!data || !trendData) return null;
    return data.map(d => {
      const rowData = d;
      const indicatorId = d.id;
      const indicatorTrendData = trendData.find(
        t => t.indicator_id === indicatorId
      );
      rowData.trend = isEmpty(indicatorTrendData)
        ? null
        : sortBy(indicatorTrendData.values, ['year']).map(v => ({
          value: parseFloat(v.value)
        }));
      return rowData;
    });
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

export const defaultColumns = () => [
  'alias',
  'category',
  'subcategory',
  'trend'
];
export default {
  filterDataByBlackList,
  defaultColumns,
  getCategories,
  getSelectedCategoryOption
};
