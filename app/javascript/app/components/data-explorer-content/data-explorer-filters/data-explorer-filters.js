import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { PureComponent, createElement } from 'react';
import { getSearch, getLocationParamUpdated } from 'utils/navigation';
import { PropTypes } from 'prop-types';
import { actions } from 'components/modal-download';
import {
  DATA_EXPLORER_FILTERS,
  DATA_EXPLORER_DEPENDENCIES
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

const getDependentKeysToDelete = (value, section, filterName) => {
  const dependentKeysToDelete = [];
  if (DATA_EXPLORER_DEPENDENCIES[section]) {
    Object.keys(
      DATA_EXPLORER_DEPENDENCIES[section]
    ).forEach(dependentFilterKey => {
      const parentFilterKeys =
        DATA_EXPLORER_DEPENDENCIES[section][dependentFilterKey];
      if (parentFilterKeys.includes(filterName)) {
        dependentKeysToDelete.push(dependentFilterKey);
      }
    });
  }
  return dependentKeysToDelete;
};

const resetPageParam = {
  name: 'page',
  value: 1
};

class DataExplorerContentContainer extends PureComponent {
  sourceAndVersionParam = (value, section) => {
    const values = value && value.split(' - ');
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

  parsedMultipleValues = (filterName, value) => {
    const { selectedOptions } = this.props;
    const oldFilters = selectedOptions[filterName];
    const removing = oldFilters && value.length < oldFilters.length;
    const selectedFilter = !oldFilters
      ? value[0]
      : value.filter(f => Object.keys(oldFilters).includes(!f.label));
    const filtersParam = [];
    if (!removing) filtersParam.push(selectedFilter.value);
    value.forEach(filter => {
      filtersParam.push(filter.value);
    });
    return filtersParam.toString();
  };

  handleFilterChange = (filterName, value, multiple) => {
    const { section } = this.props;
    const SOURCE_AND_VERSION_KEY = 'source';
    let paramsToUpdate = [];
    const dependentKeysToDeleteParams = getDependentKeysToDelete(
      value,
      section,
      filterName
    ).map(k => ({ name: `${section}-${k}`, value: undefined }));
    let parsedValue = value;
    if (multiple) parsedValue = this.parsedMultipleValues(filterName, value);
    parsedValue = parsedValue === '' ? undefined : parsedValue;
    if (filterName === SOURCE_AND_VERSION_KEY) {
      paramsToUpdate = paramsToUpdate.concat(
        this.sourceAndVersionParam(value, section)
      );
    } else {
      paramsToUpdate.push({
        name: `${section}-${filterName}`,
        value: parsedValue
      });
    }
    this.updateUrlParam(
      paramsToUpdate.concat(resetPageParam).concat(dependentKeysToDeleteParams)
    );
  };

  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  render() {
    return createElement(DataExplorerFiltersComponent, {
      ...this.props,
      handleFilterChange: this.handleFilterChange
    });
  }
}

DataExplorerContentContainer.propTypes = {
  section: PropTypes.string,
  history: PropTypes.object,
  location: PropTypes.object,
  selectedOptions: PropTypes.object
};

export default withRouter(
  connect(mapStateToProps, actions)(DataExplorerContentContainer)
);
