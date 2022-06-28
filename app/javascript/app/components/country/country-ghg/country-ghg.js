import React from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  isPageContained,
  isEmbededComponent,
  isPageNdcp
} from 'utils/navigation';
import { actions } from 'components/modal-metadata';
import { handleAnalytics } from 'utils/analytics';
import Component from './country-ghg-component';
import { getCountryName } from './country-ghg-selectors';

const mapStateToProps = (state, { location, match }) => {
  const search = qs.parse(location.search);
  const isEmbedded = isEmbededComponent(location);
  const iso = match.params.iso;
  const isNdcp = isPageNdcp(location) || isPageContained;

  return {
    search,
    isEmbedded,
    isNdcp,
    iso,
    countryName: getCountryName({ ...state, iso })
  };
};

function CountryGhgContainer(props) {
  const { setModalMetadata } = props;
  const handleAnalyticsClick = () => {
    handleAnalytics('Country', 'Leave page to explore data', 'Ghg emissions');
  };

  const handleInfoClick = () =>
    setModalMetadata({
      category: 'Country comparison',
      slugs: 'historical_emissions_cait',
      open: true
    });

  return (
    <Component
      {...props}
      handleAnalyticsClick={handleAnalyticsClick}
      handleInfoClick={handleInfoClick}
    />
  );
}

CountryGhgContainer.propTypes = {
  setModalMetadata: PropTypes.func.isRequired,
  indicators: PropTypes.object
};

export default withRouter(
  connect(mapStateToProps, actions)(CountryGhgContainer)
);
