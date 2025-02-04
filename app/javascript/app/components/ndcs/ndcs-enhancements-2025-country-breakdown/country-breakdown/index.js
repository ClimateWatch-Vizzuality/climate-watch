import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { getData } from './selectors';
import CountryBreakdownComponent from './component';

const mapStateToProps = state => ({
  data: getData(state)
});

const actions = {};

export default withRouter(
  connect(mapStateToProps, actions)(CountryBreakdownComponent)
);
