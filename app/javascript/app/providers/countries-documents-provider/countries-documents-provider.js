import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import reducers, {
  initialState
} from './countries-documents-provider-reducers';
import * as actions from './countries-documents-provider-actions';

class CountriesDocumentsProvider extends PureComponent {
  componentDidMount() {
    const { fetchCountriesDocuments } = this.props;
    fetchCountriesDocuments();
  }

  render() {
    return null;
  }
}

CountriesDocumentsProvider.propTypes = {
  fetchCountriesDocuments: PropTypes.func.isRequired
};

export { actions, reducers, initialState };

export default connect(null, actions)(CountriesDocumentsProvider);
