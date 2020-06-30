import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './regions-provider-actions';
import reducers, { initialState } from './regions-provider-reducers';

class RegionsProvider extends PureComponent {
  componentDidMount() {
    const { getRegions, includeGHGSources } = this.props;
    getRegions(includeGHGSources);
  }

  render() {
    return null;
  }
}

RegionsProvider.propTypes = {
  getRegions: PropTypes.func.isRequired,
  includeGHGSources: PropTypes.bool
};

export { actions, reducers, initialState };
export default connect(null, actions)(RegionsProvider);
