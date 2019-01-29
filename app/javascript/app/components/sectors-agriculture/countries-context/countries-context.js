import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';
import Component from './countries-context-component';
import { countriesContexts } from './countries-contexts-selectors';

const mapStateToProps = (state, { location }) => {
  const search = qs.parse(location.search);
  const cc = { ...state, search };
  return {
    ...countriesContexts(cc)
  };
};

class CountriesContextsContainer extends PureComponent {
  updateUrlParam = params => {
    const { history } = this.props;
    const { location } = history;
    history.replace(getLocationParamUpdated(location, params));
  };

  handleInfoBtnClick = () => {
    // TODO: Implement info button click
  };
  updateCountryFilter = country =>
    this.updateUrlParam({ name: 'country', value: country.value });

  updateYearFilter = year =>
    this.updateUrlParam({ name: 'year', value: year.value });

  handleSwitchClick = ({ value }) =>
    this.updateUrlParam({ name: 'contextBy', value });

  render() {
    return (
      <Component
        {...this.props}
        updateCountryFilter={this.updateCountryFilter}
        updateYearFilter={this.updateYearFilter}
        handleSwitchClick={this.handleSwitchClick}
        handleInfoBtnClick={this.handleInfoBtnClick}
      />
    );
  }
}

CountriesContextsContainer.propTypes = {
  history: PropTypes.shape({})
};

export default withRouter(
  connect(mapStateToProps, null)(CountriesContextsContainer)
);
