import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './data-explorer-provider-actions';
import * as reducers from './data-explorer-provider-reducers';

const initialState = reducers.initialState;

class DataExplorerProvider extends PureComponent {
  componentDidMount() {
    const { fetchDataExplorer } = this.props;
    fetchDataExplorer();
  }

  render() {
    return null;
  }
}

DataExplorerProvider.propTypes = {
  fetchDataExplorer: PropTypes.func.isRequired
};

export { actions, reducers, initialState };

export default connect(null, actions)(DataExplorerProvider);
