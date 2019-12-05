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
  tableRemoveIsoFromData,
  getDefaultColumns
} from './ndcs-explore-table-selectors';

const mapStateToProps = (state, { location }) => {
  const { data, loading } = state.ndcs;
  const { countries } = state;
  const search = qs.parse(location.search);
  const ndcsNDCSWithSelection = {
    ...data,
    countries: countries.data,
    query: search.search,
    search
  };
  return {
    loading,
    query: ndcsNDCSWithSelection.query,
    isoCountries: getISOCountries(ndcsNDCSWithSelection),
    tableData: tableRemoveIsoFromData(ndcsNDCSWithSelection),
    columns: getDefaultColumns(ndcsNDCSWithSelection)
  };
};

class NDCSExploreTableContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setColumnWidth = column => {
    const { columns } = this.props;
    const TABLE_WIDTH = 1170;
    const MIN_COLUMN_WIDTH = 180;
    const narrowColumns = [0];
    return setColumnWidth(
      column,
      columns,
      TABLE_WIDTH,
      MIN_COLUMN_WIDTH,
      narrowColumns
    );
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
  query: PropTypes.object
};

export default withRouter(
  connect(mapStateToProps, null)(NDCSExploreTableContainer)
);
