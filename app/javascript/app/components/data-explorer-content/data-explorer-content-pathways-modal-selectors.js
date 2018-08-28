import { createSelector } from 'reselect';
import remove from 'lodash/remove';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import { SECTION_NAMES } from 'data/data-explorer-constants';
import { ESP_BLACKLIST } from 'data/constants';
import { getSelectedFilters, getMeta } from './data-explorer-content-selectors';

const getScenarioSelectedMetadata = createSelector(
  [getSelectedFilters, getMeta],
  (filters, meta) => {
    if (!filters || !filters.scenarios || !meta) return null;
    const metadata = meta[SECTION_NAMES.pathways];
    if (!metadata || !metadata.scenarios) return null;
    const scenario = metadata.scenarios.find(
      m => (filters.scenarios[0] && filters.scenarios[0].id) === m.id
    );
    return (
      scenario && {
        name: scenario.name,
        description: scenario.description,
        Link: `/pathways/scenarios/${scenario.id}`
      }
    );
  }
);

const getModelSelectedMetadata = createSelector(
  [getSelectedFilters, getMeta],
  (filters, meta) => {
    if (!filters || !filters.models || !meta) return null;
    const metadata = meta[SECTION_NAMES.pathways];
    if (!metadata || !metadata.models) return null;
    return metadata.models.find(
      m => (filters.models[0] && filters.models[0].id) === m.id
    );
  }
);

export const getIndicatorSelectedMetadata = createSelector(
  [getSelectedFilters, getMeta],
  (filters, meta) => {
    if (!filters || !filters.indicators || !meta) return null;
    const metadata = meta[SECTION_NAMES.pathways];
    if (!metadata || !metadata.indicators) return null;
    return metadata.indicators.find(
      m => (filters.indicators[0] && filters.indicators[0].id) === m.id
    );
  }
);

const addLinktoModelSelectedMetadata = createSelector(
  [getModelSelectedMetadata],
  model => {
    if (!model) return null;
    return {
      ...model,
      Link: `/pathways/models/${model.id}`
    };
  }
);

export const filterModelsByBlackList = createSelector(
  [addLinktoModelSelectedMetadata],
  data => {
    if (!data || isEmpty(data)) return null;
    const whiteList = remove(
      Object.keys(data),
      n => ESP_BLACKLIST.models.indexOf(n) === -1
    );
    return pick(data, whiteList);
  }
);

const filterIndicatorsByBlackList = createSelector(
  [getIndicatorSelectedMetadata],
  data => {
    if (!data || isEmpty(data)) return null;
    const whiteList = remove(
      Object.keys(data),
      n => ESP_BLACKLIST.indicators.indexOf(n) === -1
    );
    return pick(data, whiteList);
  }
);

export const parseObjectsInIndicators = createSelector(
  [filterIndicatorsByBlackList],
  data => {
    if (isEmpty(data)) return null;
    const parsedData = {};
    Object.keys(data).forEach(key => {
      let fieldData = data[key];
      if (
        fieldData &&
        typeof fieldData !== 'string' &&
        typeof fieldData !== 'number'
      ) {
        fieldData = fieldData.name;
      }
      parsedData[key] = fieldData;
    });
    return parsedData;
  }
);

export const getPathwaysMetodology = createSelector(
  [
    filterModelsByBlackList,
    getScenarioSelectedMetadata,
    parseObjectsInIndicators
  ],
  (model, scenario, indicator) => [model, scenario, indicator].filter(m => m)
);
