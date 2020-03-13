import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { PureComponent, createElement } from 'react';
import { parseQuery, openDownloadModal } from 'utils/data-explorer';
import { isANumber } from 'utils/utils';
import { getSearch, getLocationParamUpdated } from 'utils/navigation';
import { PropTypes } from 'prop-types';
import { actions } from 'components/modal-download';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import {
  DATA_EXPLORER_SECTIONS,
  DATA_EXPLORER_EXTERNAL_PREFIX,
  DATA_EXPLORER_PER_PAGE,
  DATA_EXPLORER_TABLE_COLUMNS_WIDTH
} from 'data/data-explorer-constants';
import { ESP_HOST } from 'data/constants';
import DataExplorerContentComponent from './data-explorer-content-component';
import {
  parseData,
  getMethodology,
  getSectionLabel,
  getLinkLabel,
  getFirstTableHeaders,
  parseFilterQuery,
  parseExternalParams,
  getLink,
  getTitleLinks,
  getSortDefaults
} from './data-explorer-content-selectors';
import { getPathwaysMetodology } from './data-explorer-content-pathways-modal-selectors';

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
    { label: 'Sources & Metadata', hash: 'meta', defaultActiveHash: true }
  ];
  const filterQuery = parseFilterQuery(dataState);
  const devESPURL = section === 'emission-pathways' ? ESP_HOST : '';
  const downloadHref = `${devESPURL}/api/v1/data/${
    DATA_EXPLORER_SECTIONS[section].label
  }/download.zip${filterQuery ? `?${parseQuery(filterQuery)}` : ''}`;
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
  const loading =
    (state.dataExplorer && state.dataExplorer.loading) || !hasFetchedData;
  const loadingMeta = state.dataExplorer && state.dataExplorer.loadingMeta;
  return {
    data,
    pageCount: dataLength ? dataLength / DATA_EXPLORER_PER_PAGE : 0,
    tableColumnsWidth: DATA_EXPLORER_TABLE_COLUMNS_WIDTH,
    initialPage: search.page && parseInt(search.page, 10) - 1,
    meta,
    metadataSection: !!location.hash && location.hash === '#meta',
    firstColumnHeaders: getFirstTableHeaders(dataState),
    href: getLink(dataState),
    sectionLabel: getSectionLabel(dataState),
    linkLabel: getLinkLabel(dataState),
    downloadHref,
    anchorLinks,
    query: location.search,
    filterQuery,
    sortDefaults: getSortDefaults(dataState),
    parsedExternalParams: parseExternalParams(dataState),
    titleLinks: getTitleLinks(dataState),
    search,
    loading,
    loadingMeta
  };
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
    const { parsedExternalParams } = this.props;
    if (
      prevProps.parsedExternalParams !== parsedExternalParams &&
      !isEmpty(parsedExternalParams)
    ) {
      this.addExternalParamsToURL();
    }
  }

  addExternalParamsToURL() {
    const { parsedExternalParams, search } = this.props;
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

  handlePageChange = page => {
    this.updateUrlParam({ name: 'page', value: page.selected + 1 });
  };

  handleSortChange = ({ sortBy, sortDirection }) => {
    if (!(this.props.section === 'emission-pathways' && isANumber(sortBy))) {
      this.updateUrlParam([
        { name: 'sort_col', value: sortBy },
        { name: 'sort_dir', value: sortDirection }
      ]);
    }
  };

  handleDownloadModalOpen = () => {
    const { setModalDownloadParams, downloadHref, section } = this.props;
    openDownloadModal(downloadHref, setModalDownloadParams, section);
  };

  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  render() {
    return createElement(DataExplorerContentComponent, {
      ...this.props,
      hasParamsReady: this.hasParamsReady,
      handleFilterChange: this.handleFilterChange,
      handlePageChange: this.handlePageChange,
      handleDataDownload: this.handleDataDownload,
      handleSortChange: this.handleSortChange,
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
