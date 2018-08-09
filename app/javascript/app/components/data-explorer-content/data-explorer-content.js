import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { PureComponent, createElement } from 'react';
import { openDownloadModal } from 'utils/data-explorer';
import { getSearch, getLocationParamUpdated } from 'utils/navigation';
import { PropTypes } from 'prop-types';
import { actions } from 'components/modal-download';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import {
  DATA_EXPLORER_SECTIONS,
  DATA_EXPLORER_FILTERS,
  DATA_EXPLORER_EXTERNAL_PREFIX,
  DATA_EXPLORER_DEPENDENCIES,
  DATA_EXPLORER_PER_PAGE
} from 'data/data-explorer-constants';
import { ESP_HOST } from 'data/constants';
import DataExplorerContentComponent from './data-explorer-content-component';
import {
  parseData,
  getActiveFilterRegion,
  getMethodology,
  getSectionLabel,
  getFirstTableHeaders,
  getFilteredOptions,
  getSelectedOptions,
  getPathwaysMetodology,
  parseFilterQuery,
  parseExternalParams,
  getLink
} from './data-explorer-content-selectors';

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
  const anchorLinks = [
    {
      label: 'Raw Data',
      hash: 'data',
      defaultActiveHash: true
    },
    { label: 'Sources', hash: 'meta', defaultActiveHash: true }
  ];
  const filterQuery = parseFilterQuery(dataState);
  const devESPURL = section === 'emission-pathways' ? ESP_HOST : '';
  const downloadHref = `${devESPURL}/api/v1/data/${DATA_EXPLORER_SECTIONS[
    section
  ].label}/download.csv${filterQuery ? `?${filterQuery}` : ''}`;
  const meta =
    section === 'emission-pathways'
      ? getPathwaysMetodology(dataState)
      : getMethodology(dataState);
  const data = parseData(dataState);
  const hasFetchedData =
    state.dataExplorer &&
    state.dataExplorer.data &&
    state.dataExplorer.data[section];
  const dataLength = hasFetchedData && state.dataExplorer.data[section].total;
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
    data,
    pageCount: dataLength ? dataLength / DATA_EXPLORER_PER_PAGE : 0,
    initialPage: search.page && parseInt(search.page, 10) - 1,
    meta,
    metadataSection: !!location.hash && location.hash === '#meta',
    isDisabled,
    firstColumnHeaders: getFirstTableHeaders(dataState),
    href: getLink(dataState),
    sectionLabel: getSectionLabel(dataState),
    downloadHref,
    filters: DATA_EXPLORER_FILTERS[section],
    filterOptions: getFilteredOptions(dataState),
    selectedOptions,
    anchorLinks,
    query: location.search,
    filterQuery,
    parsedExternalParams: parseExternalParams(dataState),
    activeFilterRegion: getActiveFilterRegion(dataState),
    search,
    loading,
    loadingMeta
  };
};

const getDependentKeysToDelete = (value, section, filterName) => {
  const dependentKeysToDelete = [];
  if (value === undefined && DATA_EXPLORER_DEPENDENCIES[section]) {
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
  componentDidMount() {
    const { search } = this.props;
    if (!search.page) {
      this.updateUrlParam(resetPageParam);
    }
  }

  componentDidUpdate(prevProps) {
    const { parsedExternalParams, search } = this.props;
    if (
      prevProps.parsedExternalParams !== parsedExternalParams &&
      !isEmpty(parsedExternalParams)
    ) {
      const validKeys = Object.keys(search).filter(
        k => !k.startsWith(DATA_EXPLORER_EXTERNAL_PREFIX)
      );
      const validParams = {
        ...pick(search, validKeys),
        ...parsedExternalParams
      };

      const paramsToUpdate = Object.keys(validParams).map(key => ({
        name: key,
        value: validParams[key]
      }));
      this.updateUrlParam(paramsToUpdate, true);
    }
  }

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
      : value
        .filter(x => oldFilters.indexOf(x) === -1)
        .concat(oldFilters.filter(x => value.indexOf(x) === -1))[0];
    const filtersParam = [];
    if (!removing && selectedFilter.groupId === 'regions') {
      filtersParam.push(selectedFilter.value);
      selectedFilter.members.forEach(m =>
        filtersParam.push(m.wri_standard_name)
      );
    } else {
      value.forEach(filter => {
        if (filter.groupId !== 'regions') {
          filtersParam.push(filter.value);
        }
      });
    }
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

  handlePageChange = page => {
    this.updateUrlParam({ name: 'page', value: page.selected + 1 });
  };

  handleDataDownload = () => {
    const { downloadHref } = this.props;
    return window.location.assign(downloadHref);
  };

  handleDownloadModalOpen = () => {
    const { setModalDownloadParams, downloadHref } = this.props;
    openDownloadModal(downloadHref, setModalDownloadParams);
  };

  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  render() {
    return createElement(DataExplorerContentComponent, {
      ...this.props,
      handleFilterChange: this.handleFilterChange,
      handlePageChange: this.handlePageChange,
      handleDataDownload: this.handleDataDownload,
      handleDownloadModalOpen: this.handleDownloadModalOpen
    });
  }
}

DataExplorerContentContainer.propTypes = {
  section: PropTypes.string,
  parsedExternalParams: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  downloadHref: PropTypes.string,
  setModalDownloadParams: PropTypes.func,
  search: PropTypes.object,
  selectedOptions: PropTypes.object
};

export default withRouter(
  connect(mapStateToProps, actions)(DataExplorerContentContainer)
);
