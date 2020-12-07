import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './key-visualizations-actions';
import reducers, { initialState } from './key-visualizations-reducers';

class KeyVisualizationsProvider extends PureComponent {
  componentDidMount() {
    const { getKeyVisualizations } = this.props;
    getKeyVisualizations();
  }

  render() {
    return null;
  }
}

KeyVisualizationsProvider.propTypes = {
  getKeyVisualizations: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default connect(null, actions)(KeyVisualizationsProvider);
