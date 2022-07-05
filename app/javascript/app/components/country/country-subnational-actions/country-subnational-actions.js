import { createElement } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'components/modal-metadata';
import { getIndicators } from './country-subnational-actions-selectors';

import Component from './country-subnational-actions-component';

const mapStateToProps = (state, { match }) => {
  const iso = match.params.iso;

  return {
    iso,
    loading: state.countryProfileIndicators.loading,
    indicators: getIndicators({ ...state, iso }),
    countries: state.countries.data
  };
};

const SubnationalActions = props => {
  const { setModalMetadata } = props;

  const handleInfoClick = slug => {
    setModalMetadata({
      category: 'Subnational Climate Actions',
      slugs: slug,
      open: true
    });
  };

  return createElement(Component, {
    ...props,
    handleInfoClick
  });
};

export default withRouter(
  connect(mapStateToProps, actions)(SubnationalActions)
);
