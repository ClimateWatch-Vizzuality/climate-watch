import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './regions-provider-actions';
import reducers, { initialState } from './regions-provider-reducers';

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

export const redux = {
  actions,
  reducers,
  initialState
};
export default connect(null, actions)(RegionsProvider);
