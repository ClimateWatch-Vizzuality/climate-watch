import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import actions from './ndc-compare-all-targets-provider-actions';
import reducers, {
  initialState
} from './ndc-compare-all-targets-provider-reducers';

class NdcsCompareAllTargetsProvider extends PureComponent {
  componentDidMount() {
    const { fetchCompareAll } = this.props;
    fetchCompareAll();
  }

  render() {
    return null;
  }
}

NdcsCompareAllTargetsProvider.propTypes = {
  fetchCompareAll: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default withRouter(
  connect(null, actions)(NdcsCompareAllTargetsProvider)
);
