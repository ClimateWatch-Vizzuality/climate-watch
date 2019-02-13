import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';
import { actions } from 'components/modal-metadata';
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

  handleInfoClick = () => {
    const { setModalMetadata } = this.props;
    setModalMetadata({
      customTitle: 'Socioeconomic indicators',
      category: 'Countries Context',
      slugs: 'socioenconomic_all indicators',
      open: true
    });
  };

  updateCountryFilter = ({ value }) =>
    this.updateUrlParam({ name: 'country', value });

  updateCountryYearFilter = ({ value }) =>
    this.updateUrlParam({ name: 'countryYear', value });

  updateIndicatorYearFilter = ({ value }) =>
    this.updateUrlParam({ name: 'indicatorYear', value });

  updateIndicatorFilter = ({ value }) =>
    this.updateUrlParam({ name: 'contextMapIndicator', value });

  handleSwitchClick = ({ value }) =>
    this.updateUrlParam({ name: 'contextBy', value });

  updateFilter = ({ value, filter }) =>
    this.updateUrlParam({ name: filter, value });

  render() {
    return (
      <Component
        {...this.props}
        updateCountryFilter={this.updateCountryFilter}
        updateCountryYearFilter={this.updateCountryYearFilter}
        updateIndicatorYearFilter={this.updateIndicatorYearFilter}
        updateIndicatorFilter={this.updateIndicatorFilter}
        handleSwitchClick={this.handleSwitchClick}
        handleInfoBtnClick={this.handleInfoBtnClick}
        handleInfoClick={this.handleInfoClick}
      />
    );
  }
}

CountriesContextsContainer.propTypes = {
  history: PropTypes.shape({}),
  setModalMetadata: PropTypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, actions)(CountriesContextsContainer)
);
