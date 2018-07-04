import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { PureComponent, createElement } from 'react';
import { getLocationParamUpdated } from 'utils/navigation';
import { PropTypes } from 'prop-types';
import qs from 'query-string';
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
  return {
    data: parseData(dataState),
    meta: getMethodology(dataState),
    metadataSection: !!location.hash && location.hash === '#meta',
    loading: state.dataExplorer && state.dataExplorer.loading,
    loadingMeta: state.dataExplorer && state.dataExplorer.loadingMeta,
    firstColumnHeaders: DATA_EXPLORER_FIRST_COLUMN_HEADERS,
    href: getLink(dataState),
    downloadHref: `/api/v1/data/${DATA_EXPLORER_SECTION_NAMES[
      section
    ]}/download.csv${filterQuery ? `?${filterQuery}` : ''}`,
    filters: DATA_EXPLORER_FILTERS[section],
    filterOptions: parseGroupsInOptions(dataState),
    selectedOptions: getSelectedOptions(dataState),
    anchorLinks,
    query: location.search,
    filterQuery,
    parsedExternalParams: parseExternalParams(dataState),
    search
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
    const SOURCE_AND_VERSION_KEY = 'source_IPCC_version';
    if (filterName === SOURCE_AND_VERSION_KEY) {
      const values = value && value.split(' - ');
      this.updateUrlParam([
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
      this.updateUrlParam({
        name: `${section}-${filterName}`,
        value
      });
    }
  };

  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  render() {
    return createElement(DataExplorerContentComponent, {
      ...this.props,
      handleFilterChange: this.handleFilterChange
    });
  }
}

DataExplorerContentContainer.propTypes = {
  section: PropTypes.string,
  parsedExternalParams: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  search: PropTypes.object
};

export default withRouter(
  connect(mapStateToProps, null)(DataExplorerContentContainer)
);
