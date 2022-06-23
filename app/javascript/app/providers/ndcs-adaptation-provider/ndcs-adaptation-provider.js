import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './ndcs-adaptation-provider-actions';

export { initialState } from './ndcs-adaptation-provider-reducers';
export { default as reducers } from './ndcs-adaptation-provider-reducers';
export { default as actions } from './ndcs-adaptation-provider-actions';

class NdcsAdaptationsProvider extends PureComponent {
  componentDidMount() {
    const { fetchNdcsAdaptations, params = {} } = this.props;
    fetchNdcsAdaptations(params);
  }

  render() {
    return null;
  }
}

NdcsAdaptationsProvider.propTypes = {
  params: PropTypes.shape({}).isRequired,
  fetchNdcsAdaptations: PropTypes.func.isRequired
};

export default connect(null, actions)(NdcsAdaptationsProvider);
