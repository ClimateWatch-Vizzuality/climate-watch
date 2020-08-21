/* eslint-disable no-mixed-operators */
import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';
import { setColumnWidth } from 'utils/table';

import Component from './ndcs-explore-table-component';

import {
  getISOCountries,
  removeIsoFromData,
  getDefaultColumns,
  getTitleLinks
} from './ndcs-explore-table-selectors';

const mapStateToProps = (state, { location }) => {
  const { data, loading } = state.ndcs;
  const { countries } = state;
  const search = qs.parse(location.search);
  const ndcsNDCSWithSelection = {
    ...state,
    ...data,
    countries: countries.data,
    query: search.search,
    search,
    categorySelected: search.category,
    indicatorSelected: search.indicator,
    emissions: state.emissions
  };
  return {
    loading,
    query: ndcsNDCSWithSelection.query,
    isoCountries: getISOCountries(ndcsNDCSWithSelection),
    tableData: removeIsoFromData(ndcsNDCSWithSelection),
    columns: getDefaultColumns(ndcsNDCSWithSelection),
    titleLinks: getTitleLinks(ndcsNDCSWithSelection)
  };
};

class NDCSExploreTableContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  setColumnWidth = column => {
    const { columns } = this.props;
    return setColumnWidth({
      column,
      columns,
      tableWidth: 1170,
      narrowColumnWidth: 180,
      narrowColumns: [0]
    });
  };

  updateUrlParam(param, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, param, clear));
  }

  handleSearchChange = query => {
    this.updateUrlParam({ name: 'search', value: query });
  };

  render() {
    const { query } = this.props;
    const noContentMsg = query
      ? 'No results found'
      : 'There is no data for this indicator';
    return createElement(Component, {
      ...this.props,
      noContentMsg,
      handleSearchChange: this.handleSearchChange,
      tableData: this.props.tableData,
      setColumnWidth: this.setColumnWidth
    });
  }
}

NDCSExploreTableContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  tableData: PropTypes.array,
  columns: PropTypes.array,
  query: PropTypes.string
};

export default withRouter(
  connect(mapStateToProps, null)(NDCSExploreTableContainer)
);
