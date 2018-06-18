import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import reducers, { initialState } from './data-explorer-provider-reducers';
import * as actions from './data-explorer-provider-actions';

class DataExplorerProvider extends PureComponent {
  componentDidMount() {
    const { fetchDataExplorer, fetchInitialMetadata, section } = this.props;
    fetchDataExplorer(section);
    fetchInitialMetadata();
  }

  render() {
    return null;
  }
}

DataExplorerProvider.propTypes = {
  fetchDataExplorer: PropTypes.func.isRequired,
  fetchInitialMetadata: PropTypes.func.isRequired,
  section: PropTypes.string
};

export { actions, reducers, initialState };

export default connect(null, actions)(DataExplorerProvider);
