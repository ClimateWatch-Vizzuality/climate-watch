import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import reducers, { initialState } from './data-explorer-provider-reducers';
import * as actions from './data-explorer-provider-actions';

class DataExplorerProvider extends PureComponent {
  componentDidMount() {
    const { fetchSectionMetadata, fetchMetadata, section } = this.props;
    fetchSectionMetadata();
    fetchMetadata(section);
  }

  componentDidUpdate(prevProps) {
    const { fetchDataExplorer, section, query } = this.props;
    const { section: prevSection, query: prevQuery } = prevProps;
    if (section !== prevSection || query !== prevQuery) {
      fetchDataExplorer({ section, query });
    }
  }

  render() {
    return null;
  }
}

DataExplorerProvider.propTypes = {
  fetchDataExplorer: PropTypes.func.isRequired,
  fetchSectionMetadata: PropTypes.func.isRequired,
  fetchMetadata: PropTypes.func.isRequired,
  query: PropTypes.string,
  section: PropTypes.string
};

export { actions, reducers, initialState };

export default connect(null, actions)(DataExplorerProvider);
