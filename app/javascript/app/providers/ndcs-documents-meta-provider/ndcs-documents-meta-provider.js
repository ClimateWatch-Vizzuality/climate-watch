import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import actions from './ndcs-documents-meta-provider-actions';
import reducers, {
  initialState
} from './ndcs-documents-meta-provider-reducers';

class NdcsDocumentsMetaProvider extends PureComponent {
  componentDidMount() {
    const { fetchNdcsDocumentsMeta } = this.props;
    fetchNdcsDocumentsMeta();
  }

  render() {
    return null;
  }
}

NdcsDocumentsMetaProvider.propTypes = {
  fetchNdcsDocumentsMeta: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default withRouter(connect(null, actions)(NdcsDocumentsMetaProvider));
