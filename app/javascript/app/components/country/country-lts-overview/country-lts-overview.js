import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import Proptypes from 'prop-types';

import { isEmbededComponent } from 'utils/navigation';
import { actions } from 'components/modal-metadata';
import { actions as fetchActions } from 'components/ndcs/ndcs-country-accordion';
import CountryLtsOverviewComponent from './country-lts-overview-component';
import { getCardsData } from './country-lts-overview-selectors';

const mapStateToProps = (state, { location, match }) => {
  const { iso } = match.params;
  const indicatorsData =
    state.ndcCountryAccordion.data && state.ndcCountryAccordion.data.indicators;
  const isEmbed = isEmbededComponent(location);
  const data = {
    state,
    iso
  };
  return {
    iso,
    isEmbed,
    cardData: getCardsData(data),
    loading: state.ndcCountryAccordion.loading,
    sectors: state.ndcCountryAccordion.data
      ? state.ndcCountryAccordion.data.sectors
      : null,
    fetched: !isEmpty(indicatorsData)
  };
};

const CountryLtsOverviewContainer = props => {
  const { iso, fetchNdcsCountryAccordion } = props;
  useEffect(() => {
    fetchNdcsCountryAccordion({
      locations: iso,
      category: 'summary',
      compare: false,
      lts: true
    });
  }, [iso]);
  return <CountryLtsOverviewComponent {...props} />;
};

CountryLtsOverviewContainer.propTypes = {
  iso: Proptypes.string,
  fetchNdcsCountryAccordion: Proptypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, {
    ...actions,
    ...fetchActions
  })(CountryLtsOverviewContainer)
);
