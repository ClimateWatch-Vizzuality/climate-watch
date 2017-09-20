import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './regions-provider-actions';

export { initialState } from './regions-provider-reducers';
export { default as reducers } from './regions-provider-reducers';
export { default as actions } from './regions-provider-actions';

class RegionsProvider extends PureComponent {
  componentDidMount() {
    const { getRegions } = this.props;
    getRegions();
  }

  render() {
    return null;
  }
}

RegionsProvider.propTypes = {
  getRegions: PropTypes.func.isRequired
};

export default connect(null, actions)(RegionsProvider);
