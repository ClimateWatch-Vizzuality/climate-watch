import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import { deburrUpper } from 'app/utils';

const getModel = data => data.model || null;
const getState = data => data.state || null;
const getQuery = data => deburrUpper(data.query) || '';

const getModelData = createSelector([getState, getModel], (state, model) => {
  const modelData = state[`esp${model}`];
  if (!modelData || isEmpty(modelData.data)) return null;
  return modelData.data;
});

export const filteredModelData = createSelector(
  [getModelData, getModel],
  (data, model) => {
    if (!data) return null;
    const modelWhiteListedFields = {
      Models: [
        'full_name',
        'abbreviation',
        'availability',
        'current_version',
        'development_year',
        'expertise',
        'license',
        'maintainer_name'
      ],
      Scenarios: [
        'name',
        'model_abbreviation',
        'category',
        'geographic_coverage_country',
        'geographic_coverage_region',
        'purpose_or_objective',
        'time_horizon'
      ],
      Indicators: ['name', 'category', 'subcategory', 'definition', 'unit']
    };
    return data.map(d => pick(d, modelWhiteListedFields[model]));
  }
);

export const filteredDataBySearch = createSelector(
  [filteredModelData, getQuery],
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

export default {
  filteredDataBySearch
};
