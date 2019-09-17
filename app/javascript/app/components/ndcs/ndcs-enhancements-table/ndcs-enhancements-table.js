import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { handleAnalytics } from 'utils/analytics';
import { isCountryIncluded } from 'app/utils';
import { getLocationParamUpdated } from 'utils/navigation';
import { europeSlug, europeanCountries } from 'app/data/european-countries';

import { actions as fetchActions } from 'pages/ndcs-enhancements';

import Component from './ndcs-enhancements-table-component';

import {
  getISOCountries,
  tableRemoveIsoFromData
} from './ndcs-enhancements-table-selectors';

const actions = { ...fetchActions };

const mapStateToProps = (state, { location }) => {
  const { data, loading } = state.ndcsEnhancements;
  const { countries } = state;
  const search = qs.parse(location.search);
  const ndcsEnhancementsWithSelection = {
    ...data,
    countries: countries.data,
    query: search.search,
    search
  };
  return {
    loading,
    query: ndcsEnhancementsWithSelection.query,
    isoCountries: getISOCountries(ndcsEnhancementsWithSelection),
    tableData: tableRemoveIsoFromData(ndcsEnhancementsWithSelection)
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

  componentWillMount() {
    this.props.fetchNDCSEnhancements();
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
  isoCountries: PropTypes.array.isRequired,
  fetchNDCSEnhancements: PropTypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, actions)(NDCSEnhancementsTableContainer)
);
