import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import actions from './esp-indicators-provider-actions';

export { initialState } from './esp-indicators-provider-reducers';
export { default as reducers } from './esp-indicators-provider-reducers';
export { default as actions } from './esp-indicators-provider-actions';

class EspIndicatorsProvider extends PureComponent {
  componentDidMount() {
    const { fetchEspIndicators } = this.props;
    fetchEspIndicators();
  }

  render() {
    return null;
  }
}

EspIndicatorsProvider.propTypes = {
  fetchEspIndicators: PropTypes.func.isRequired
};

export default withRouter(connect(null, actions)(EspIndicatorsProvider));
