import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as modalActions } from 'components/modal-metadata';
import ownActions from './laws-and-policies-actions';

import Component from './laws-and-policies-component';

import { getCards, getCardsInRow } from './laws-and-policies-selectors';

const actions = { ...ownActions, ...modalActions };

const mapStateToProps = (state, { match }) => {
  const cards = getCards(match);
  const cardsInRow = getCardsInRow();

  return {
    cards,
    cardsInRow
  };
};

export default withRouter(connect(mapStateToProps, actions)(Component));
