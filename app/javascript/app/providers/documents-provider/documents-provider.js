import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import reducers, { initialState } from './documents-provider-reducers';
import * as actions from './documents-provider-actions';

class DocumentsProvider extends PureComponent {
  componentDidMount() {
    const { fetchNDCSDocuments } = this.props;
    fetchNDCSDocuments();
  }

  render() {
    return null;
  }
}

DocumentsProvider.propTypes = {
  fetchNDCSDocuments: PropTypes.func.isRequired
};

export { actions, reducers, initialState };

export default connect(null, actions)(DocumentsProvider);
