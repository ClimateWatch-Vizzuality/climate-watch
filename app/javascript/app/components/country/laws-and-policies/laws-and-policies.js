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

import {
  getSectors,
  getAllLawsAndPolicies,
  getCountryProfileLink,
  getNdcContent,
  getLawsAndPolicies,
  getCurrentSector,
  getCardsInRow
} from './laws-and-policies-selectors';

const actions = { ...ownActions, ...modalActions };

const mapStateToProps = (state, { location, match }) => {
  const { iso } = match.params;

  const lawsAndPoliciesData = {
    lawsAndPolicies: state.lawsAndPolicies,
    activeSector: qs.parse(location.search),
    iso
  };

  const sectors = getSectors(lawsAndPoliciesData);
  const ndcContent = getNdcContent(lawsAndPoliciesData);
  const lawsTargets = getLawsAndPolicies(lawsAndPoliciesData);
  const currentSector = getCurrentSector(lawsAndPoliciesData);
  const allLawsTargets = getAllLawsAndPolicies(lawsAndPoliciesData);
  const countryProfileLink = getCountryProfileLink(lawsAndPoliciesData);
  const countryData = {
    countries: state.countries.data,
    iso
  };

  const country = getCountry(countryData);

  const cardsInRow = getCardsInRow();

  return {
    sectors,
    ndcContent,
    lawsTargets,
    currentSector,
    cardsInRow,
    country,
    allLawsTargets,
    countryProfileLink
  };
};

class LawsAndPoliciesContainer extends PureComponent {
  updateUrlParam = (params, clear) => {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
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
