import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './adaptations-provider-actions';

export { initialState } from './adaptations-provider-reducers';
export { default as reducers } from './adaptations-provider-reducers';
export { default as actions } from './adaptations-provider-actions';

class AdaptationsProvider extends PureComponent {
  componentDidMount() {
    const { fetchAdaptations } = this.props;
    fetchAdaptations();
  }

  render() {
    return null;
  }
}

AdaptationsProvider.propTypes = {
  fetchAdaptations: PropTypes.func.isRequired
};

export default connect(null, actions)(AdaptationsProvider);
