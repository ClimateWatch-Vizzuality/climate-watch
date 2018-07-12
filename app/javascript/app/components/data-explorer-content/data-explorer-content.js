import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { PureComponent, createElement } from 'react';
import { getStorageWithExpiration } from 'utils/localStorage';
import { getLocationParamUpdated } from 'utils/navigation';
import { PropTypes } from 'prop-types';
import qs from 'query-string';
import { actions } from 'components/modal-download';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import {
  DATA_EXPLORER_FIRST_COLUMN_HEADERS,
  DATA_EXPLORER_SECTION_NAMES,
  DATA_EXPLORER_FILTERS,
  DATA_EXPLORER_EXTERNAL_PREFIX
} from 'data/constants';
import DataExplorerContentComponent from './data-explorer-content-component';
import {
  parseData,
  getMethodology,
  parseGroupsInOptions,
  getSelectedOptions,
  getPathwaysMetodology,
  parseFilterQuery,
  parseExternalParams,
  getLink
} from './data-explorer-content-selectors';

const mapStateToProps = (state, { section, location }) => {
  const search = qs.parse(location.search);
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
    { label: 'Methodology', hash: 'meta', defaultActiveHash: true }
  ];
  const filterQuery = parseFilterQuery(dataState);
  const devESPURL =
    section === 'emission-pathways' ? 'https://data.emissionspathways.org' : '';
  const downloadHref = `${devESPURL}/api/v1/data/${DATA_EXPLORER_SECTION_NAMES[
    section
  ]}/download.csv${filterQuery ? `?${filterQuery}` : ''}`;
  const meta =
    section === 'emission-pathways'
      ? getPathwaysMetodology(dataState)
      : getMethodology(dataState);
  const data = parseData(dataState);
  const itemsPerPage = 7;
  const dataLenght =
    state.dataExplorer &&
    state.dataExplorer.data &&
    state.dataExplorer.data[section] &&
    state.dataExplorer.data[section].total;
  return {
    data,
    pageCount: dataLenght ? dataLenght / itemsPerPage : 0,
    meta,
    metadataSection: !!location.hash && location.hash === '#meta',
    loading: state.dataExplorer && state.dataExplorer.loading,
    loadingMeta: state.dataExplorer && state.dataExplorer.loadingMeta,
    firstColumnHeaders: DATA_EXPLORER_FIRST_COLUMN_HEADERS,
    href: getLink(dataState),
    downloadHref,
    filters: DATA_EXPLORER_FILTERS[section],
    filterOptions: parseGroupsInOptions(dataState),
    selectedOptions: getSelectedOptions(dataState),
    anchorLinks,
    query: location.search,
    filterQuery,
    parsedExternalParams: parseExternalParams(dataState),
    search,
    initialPage: parseInt(search.page, 10) - 1 || 0
  };
};

class DataExplorerContentContainer extends PureComponent {
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

  handleFilterChange = (filterName, value) => {
    const { section } = this.props;
    const SOURCE_AND_VERSION_KEY = 'source';
    const resetPageParam = {
      name: 'page',
      value: 1
    };
    const paramsToUpdate = [];
    if (filterName === SOURCE_AND_VERSION_KEY) {
      const values = value && value.split(' - ');
      paramsToUpdate.concat([
        {
          name: `${section}-data-sources`,
          value: value && values[0]
        },
        {
          name: `${section}-gwps`,
          value: value && values[1]
        }
      ]);
    } else {
      paramsToUpdate.push({
        name: `${section}-${filterName}`,
        value
      });
    }
    this.updateUrlParam(paramsToUpdate.concat(resetPageParam));
  };

  handlePageChange = page => {
    this.updateUrlParam({ name: 'page', value: page.selected + 1 });
  };

  handleDownloadModalOpen = () => {
    const { downloadHref, setModalDownloadParams } = this.props;
    if (getStorageWithExpiration('userSurvey')) {
      return window.location.assign(downloadHref);
    }

    return setModalDownloadParams({
      open: true,
      downloadUrl: downloadHref
    });
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
  search: PropTypes.object
};

export default withRouter(
  connect(mapStateToProps, actions)(DataExplorerContentContainer)
);
