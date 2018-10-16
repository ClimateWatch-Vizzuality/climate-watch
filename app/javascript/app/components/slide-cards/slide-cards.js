import { connect } from 'react-redux';

import Component from './slide-cards-component';
import { getCards } from './slide-cards-selectors';

const mapStateToProps = getCards;

export default connect(mapStateToProps, null)(Component);
