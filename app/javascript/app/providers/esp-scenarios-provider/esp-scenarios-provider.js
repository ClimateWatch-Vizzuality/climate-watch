import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './esp-scenarios-provider-actions';

export { initialState } from './esp-scenarios-provider-reducers';
export { default as reducers } from './esp-scenarios-provider-reducers';
export { default as actions } from './esp-scenarios-provider-actions';

class EspScenariosProvider extends PureComponent {
  componentDidMount() {
    const { fetchEspScenarios } = this.props;
    fetchEspScenarios();
  }

  render() {
    return null;
  }
}

EspScenariosProvider.propTypes = {
  fetchEspScenarios: PropTypes.func.isRequired
};

export default connect(null, actions)(EspScenariosProvider);
