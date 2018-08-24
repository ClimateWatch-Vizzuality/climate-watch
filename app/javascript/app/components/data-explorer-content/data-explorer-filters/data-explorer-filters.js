import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { PureComponent, createElement } from 'react';
import { getSearch, getLocationParamUpdated } from 'utils/navigation';
import { PropTypes } from 'prop-types';
import { actions } from 'components/modal-download';
import isArray from 'lodash/isArray';
import {
  DATA_EXPLORER_FILTERS,
  DATA_EXPLORER_DEPENDENCIES,
  FILTER_DEFAULTS
} from 'data/data-explorer-constants';
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
      Object.keys(selectedOptions).includes(k)
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
    activeFilterRegion: getActiveFilterLabel(dataState)
  };
};

const getParamsFromDependentKeysToDelete = (section, filters) => {
  if (!DATA_EXPLORER_DEPENDENCIES[section]) return [];
  const filterName = Object.keys(filters)[0];
  return getDependentKeysToDelete(section, filterName).map(key => ({
    name: `${section}-${key}`,
    value: undefined
  }));
};

const getDependentKeysToDelete = (section, filterName) => {
  const dependencies = DATA_EXPLORER_DEPENDENCIES[section];
  return Object.keys(dependencies).filter(dependentFilterKey =>
    dependencies[dependentFilterKey].includes(filterName)
  );
};

const sourceAndVersionParam = (value, section) => {
  const values = value && value.split('-');
  return [
    {
      name: `${section}-data-sources`,
      value: value && values[0]
    },
    {
      name: `${section}-gwps`,
      value: value && values[1]
    }
  ];
};

const parsedMultipleValues = value => {
  const selectedValue = value[value.length - 1];
  if (
    selectedValue &&
    selectedValue.groupId &&
    selectedValue.groupId === 'regions'
  ) {
    return [selectedValue.value];
  }
  return value.map(filter => filter.value).toString();
};

const getParamsToUpdate = (updatedFilters, section) => {
  const SOURCE_AND_VERSION_KEY = 'source';
  let paramsToUpdate = [];
  Object.keys(updatedFilters).forEach(filterName => {
    const value = updatedFilters[filterName];
    const parsedValue = isArray(value) ? parsedMultipleValues(value) : value;
    if (filterName === SOURCE_AND_VERSION_KEY) {
      paramsToUpdate = paramsToUpdate.concat(
        sourceAndVersionParam(value, section)
      );
    } else {
      paramsToUpdate.push({
        name: `${section}-${filterName}`,
        value: parsedValue
      });
    }
  });
  return paramsToUpdate;
};

const resetPageParam = {
  name: 'page',
  value: 1
};

class DataExplorerFiltersContainer extends PureComponent {
  componentDidUpdate() {
    const { selectedOptions, filterOptions, section } = this.props;
    const defaultOptionsToUpdate = {};
    const selectedOptionKeys =
      selectedOptions &&
      Object.keys(selectedOptions).filter(k => selectedOptions[k].length > 0); // Sometimes the value is empty when removing
    const filterDefaultKeys = Object.keys(FILTER_DEFAULTS[section]);
    if (
      selectedOptions &&
      !filterDefaultKeys.every(r => selectedOptionKeys.includes(r))
    ) {
      filterDefaultKeys.forEach(key => {
        if (!selectedOptionKeys.includes(key)) {
          const defaultValues = FILTER_DEFAULTS[section][key].split(',');
          const defaultOptions = filterOptions[key].filter(
            f =>
              defaultValues.includes(f.value) || defaultValues.includes(f.label)
          );
          if (
            defaultOptions &&
            defaultOptions.length &&
            defaultOptions[0].value
          ) {
            defaultOptionsToUpdate[key] = defaultOptions
              .map(o => o.value)
              .join(',');
          }
        }
      });
      this.handleFiltersChange(defaultOptionsToUpdate, true);
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
      handleFiltersChange: this.handleFiltersChange
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
