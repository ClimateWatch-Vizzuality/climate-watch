import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';

import Component from './ndcs-enhancements-table-component';

import {
  getISOCountries,
  getFilteredData,
  getDefaultColumns,
  getLoadingCompareLinks
} from './ndcs-enhancements-table-selectors';

const mapStateToProps = (state, { location }) => {
  const { data, loading } = state.ndcs || {};
  const { countries } = state;
  const search = qs.parse(location.search);
  const ndcsEnhancementsWithSelection = {
    ...state,
    ...data,
    countries: countries.data,
    query: search.search,
    search
  };

  return {
    loading: loading || getLoadingCompareLinks(ndcsEnhancementsWithSelection),
    query: ndcsEnhancementsWithSelection.query,
    isoCountries: getISOCountries(ndcsEnhancementsWithSelection),
    tableData: getFilteredData(ndcsEnhancementsWithSelection),
    columns: getDefaultColumns(ndcsEnhancementsWithSelection)
  };
};

class NDCSEnhancementsTableContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSearchChange = query => {
    this.updateUrlParam({ name: 'search', value: query });
  };

  updateUrlParam(param, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, param, clear));
  }

  render() {
    const { query } = this.props;
    const noContentMsg = query
      ? 'No results found'
      : 'There is no data for this indicator';
    return createElement(Component, {
      ...this.props,
      noContentMsg,
      handleSearchChange: this.handleSearchChange,
      tableData: this.props.tableData
    });
  }
}

NDCSEnhancementsTableContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  query: PropTypes.string,
  tableData: PropTypes.array
};

export default withRouter(
  connect(mapStateToProps, null)(NDCSEnhancementsTableContainer)
);
