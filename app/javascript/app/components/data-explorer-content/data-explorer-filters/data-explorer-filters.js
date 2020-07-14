import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { PureComponent, createElement } from 'react';
import { getSearch, getLocationParamUpdated } from 'utils/navigation';
import { noEmptyValues } from 'utils/utils';
import { PropTypes } from 'prop-types';
import { actions } from 'components/modal-download';
import isArray from 'lodash/isArray';
import last from 'lodash/last';
import {
  DATA_EXPLORER_FILTERS,
  DATA_EXPLORER_DEPENDENCIES,
  FILTER_DEFAULTS,
  NON_COLUMN_KEYS
} from 'data/data-explorer-constants';
import { ALL_SELECTED } from 'data/constants';
import { handleAnalytics } from 'utils/analytics';
import DataExplorerFiltersComponent from './data-explorer-filters-component';
import {
  getActiveFilterLabel,
  addYearOptions,
  getSelectedOptions
} from '../data-explorer-content-selectors';

const mapStateToProps = (state, { section, location }) => {
  const search = getSearch(location);
  const dataState = {
    data: state.dataExplorer && state.dataExplorer.data,
    countries: state.countries && state.countries.data,
    regions: state.regions && state.regions.data,
    meta: state.dataExplorer && state.dataExplorer.metadata,
    section,
    search
  };
  const hasFetchedData =
    state.dataExplorer &&
    state.dataExplorer.data &&
    state.dataExplorer.data[section];
  const metadataSection = !!location.hash && location.hash === '#meta';
  const loading =
    (state.dataExplorer && state.dataExplorer.loading) || !hasFetchedData;
  const loadingMeta = state.dataExplorer && state.dataExplorer.loadingMeta;
  const selectedOptions = getSelectedOptions(dataState);
  const filterDependencyMissing = key =>
    DATA_EXPLORER_DEPENDENCIES[section] &&
    DATA_EXPLORER_DEPENDENCIES[section][key] &&
    selectedOptions &&
    !DATA_EXPLORER_DEPENDENCIES[section][key].every(k =>
      Object.keys(noEmptyValues(selectedOptions)).includes(k)
    );
  const isDisabled = key =>
    (!metadataSection && loading) ||
    (metadataSection && loadingMeta) ||
    filterDependencyMissing(key);
  return {
    isDisabled,
    filters: DATA_EXPLORER_FILTERS[section],
    filterOptions: addYearOptions(dataState),
    selectedOptions,
    activeFilterLabel: getActiveFilterLabel(dataState)
  };
};

const getParamsFromDependentKeysToDelete = (section, filters) => {
  if (!DATA_EXPLORER_DEPENDENCIES[section]) return [];
  const filterName = Object.keys(filters)[0];
  return getDependentKeysToDelete(section, filterName).map(key => ({
    name: `${section}-${key}`,
    value: ''
  }));
};

const getDependentKeysToDelete = (section, filterName) => {
  const dependencies = DATA_EXPLORER_DEPENDENCIES[section];
  return Object.keys(dependencies).filter(dependentFilterKey =>
    dependencies[dependentFilterKey].includes(filterName)
  );
};

const parsedMultipleValues = value => {
  if (last(value) && last(value).value === ALL_SELECTED) return ALL_SELECTED;
  const parseValue = value.map(filter => filter.value);
  return parseValue.length === 0 ? undefined : parseValue.toString();
};

const getParamsToUpdate = (updatedFilters, section) => {
  const paramsToUpdate = [];
  Object.keys(updatedFilters).forEach(filterName => {
    const value = updatedFilters[filterName];
    const parsedValue = isArray(value) ? parsedMultipleValues(value) : value;
    const blankValue = NON_COLUMN_KEYS.includes(filterName) ? '' : ALL_SELECTED;
    paramsToUpdate.push({
      name: `${section}-${filterName}`,
      value: parsedValue || blankValue // Allow blank value to override the defaults. These won't be fetched
    });
  });
  return paramsToUpdate;
};

const resetPageParam = {
  name: 'page',
  value: 1
};

const handleChangeSelectorAnalytics = () => {
  handleAnalytics('Data Explorer', 'Change selector', 'Click');
};

class DataExplorerFiltersContainer extends PureComponent {
  componentDidUpdate() {
    this.checkDefaultFilters();
  }

  updateDefaultFilters(selectedOptionKeys, filterDefaultKeys) {
    const { filterOptions, section } = this.props;
    const defaultOptionsToUpdate = {};
    filterDefaultKeys.forEach(key => {
      if (!selectedOptionKeys.includes(key)) {
        if (NON_COLUMN_KEYS.includes(key)) {
          defaultOptionsToUpdate[key] = FILTER_DEFAULTS[section][key];
        } else {
          const defaultValues = FILTER_DEFAULTS[section][key].split(',');
          const defaultOptions = filterOptions[key].filter(
            f =>
              defaultValues.includes(f.slug) || defaultValues.includes(f.label)
          );
          let updatedOptions = '';
          if (
            defaultOptions &&
            defaultOptions.length &&
            defaultOptions[0].slug
          ) {
            updatedOptions = defaultOptions.map(o => o.slug).join(',');
          }
          defaultOptionsToUpdate[key] = updatedOptions;
        }
      }
    });
    this.handleFiltersChange(defaultOptionsToUpdate, true);
  }

  checkDefaultFilters() {
    const { selectedOptions, section } = this.props;
    const selectedOptionKeys = selectedOptions && Object.keys(selectedOptions);
    const filterDefaultKeys = Object.keys(FILTER_DEFAULTS[section]);
    if (
      selectedOptions &&
      !filterDefaultKeys.every(r => selectedOptionKeys.includes(r))
    ) {
      this.updateDefaultFilters(selectedOptionKeys, filterDefaultKeys);
    }
  }

  handleFiltersChange = (updatedFilters, isFilterDefaultChange) => {
    const { section } = this.props;
    const dependentKeysToDeleteParams = isFilterDefaultChange
      ? []
      : getParamsFromDependentKeysToDelete(section, updatedFilters);
    this.updateUrlParam(
      getParamsToUpdate(updatedFilters, section)
        .concat(resetPageParam)
        .concat(dependentKeysToDeleteParams)
    );
  };

  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  render() {
    return createElement(DataExplorerFiltersComponent, {
      ...this.props,
      handleFiltersChange: this.handleFiltersChange,
      handleChangeSelectorAnalytics
    });
  }
}

DataExplorerFiltersContainer.propTypes = {
  section: PropTypes.string,
  history: PropTypes.object,
  location: PropTypes.object,
  selectedOptions: PropTypes.object,
  filterOptions: PropTypes.object
};

export default withRouter(
  connect(mapStateToProps, actions)(DataExplorerFiltersContainer)
);
