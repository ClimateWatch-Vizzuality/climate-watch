import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import reducers, { initialState } from './data-explorer-provider-reducers';
import * as actions from './data-explorer-provider-actions';

class DataExplorerProvider extends PureComponent {
  componentDidMount() {
    const {
      fetchDataExplorer,
      fetchSectionMetadata,
      fetchMetadata,
      section
    } = this.props;
    fetchDataExplorer(section);
    fetchSectionMetadata();
    fetchMetadata(section);
  }

  render() {
    return null;
  }
}

DataExplorerProvider.propTypes = {
  fetchDataExplorer: PropTypes.func.isRequired,
  fetchSectionMetadata: PropTypes.func.isRequired,
  fetchMetadata: PropTypes.func.isRequired,
  section: PropTypes.string
};

export { actions, reducers, initialState };

export default connect(null, actions)(DataExplorerProvider);
