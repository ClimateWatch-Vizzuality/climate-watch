import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import qs from 'query-string';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as modalActions } from 'components/modal-metadata';
import { getCountry } from 'pages/ndc-country/ndc-country-selectors';
import { getLocationParamUpdated } from 'utils/navigation';

import ownActions from './laws-and-policies-actions';

import Component from './laws-and-policies-component';

import { getCardsInRow, getAllData } from './laws-and-policies-selectors';

const actions = { ...ownActions, ...modalActions };

const mapStateToProps = (state, { location, match }) => {
  const { iso } = match.params;

  const lawsAndPoliciesData = {
    lawsAndPolicies: state.lawsAndPolicies,
    activeSector: qs.parse(location.search),
    iso
  };

  const getTargetsData = getAllData(lawsAndPoliciesData);

  const countryData = {
    countries: state.countries,
    iso
  };

  const country = getCountry(countryData);
  const cardsInRow = getCardsInRow();

  const isInEu = country && country.is_in_eu;

  return {
    cardsInRow,
    country,
    isInEu,
    ...getTargetsData
  };
};

class LawsAndPoliciesContainer extends PureComponent {
  updateUrlParam = params => {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params));
  };

  render() {
    return <Component {...this.props} updateUrlParam={this.updateUrlParam} />;
  }
}

LawsAndPoliciesContainer.propTypes = {
  location: Proptypes.object,
  history: Proptypes.object,
  param: Proptypes.string
};

export default withRouter(
  connect(mapStateToProps, actions)(LawsAndPoliciesContainer)
);
