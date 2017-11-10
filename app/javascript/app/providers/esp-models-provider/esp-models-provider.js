import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import actions from './esp-models-provider-actions';

export { initialState } from './esp-models-provider-reducers';
export { default as reducers } from './esp-models-provider-reducers';
export { default as actions } from './esp-models-provider-actions';

class EspModelsProvider extends PureComponent {
  componentDidMount() {
    const { fetchEspModels } = this.props;
    fetchEspModels();
  }

  render() {
    return null;
  }
}

EspModelsProvider.propTypes = {
  fetchEspModels: PropTypes.func.isRequired
};

export default withRouter(connect(null, actions)(EspModelsProvider));
