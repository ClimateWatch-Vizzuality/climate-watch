import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';
import Component from './countries-actions-component';

import { getCountriesCountWithProposedActions } from './ndcs-map/ndcs-map-selectors';

const mapStateToProps = (state, { location }) => {
  const search = qs.parse(location.search);

  const { data } = state.ndcs;
  const { countries } = state;
  const ndcsWithSelection = {
    ...data,
    countries: countries.data,
    categorySelected: search.category,
    indicatorSelected: search.indicator,
    search
  };

  return {
    search,
    countriesCountWithProposedActions: getCountriesCountWithProposedActions(
      ndcsWithSelection
    )
  };
};

class CountriesActionsContainer extends PureComponent {
  updateUrlParam = params => {
    const { history } = this.props;
    const { location } = history;
    history.replace(getLocationParamUpdated(location, params));
  };

  handleSwitchClick = option =>
    this.updateUrlParam({ name: 'display', value: option.value });

  render() {
    const { history } = this.props;
    const { location } = history;
    const query = qs.parse(location.search);

    return (
      <Component
        {...this.props}
        query={query}
        handleSwitchClick={this.handleSwitchClick}
      />
    );
  }
}

CountriesActionsContainer.propTypes = {
  history: PropTypes.shape({})
};

export default withRouter(
  connect(mapStateToProps, null)(CountriesActionsContainer)
);
