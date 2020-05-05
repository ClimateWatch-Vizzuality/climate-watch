import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import reducers, {
  initialState
} from './countries-documents-provider-reducers';
import * as actions from './countries-documents-provider-actions';

class CountriesDocumentsProvider extends PureComponent {
  componentDidMount() {
    const { fetchCountriesDocuments, location } = this.props;
    fetchCountriesDocuments(location);
  }

  componentDidUpdate(prevProps) {
    const { fetchCountriesDocuments, location } = this.props;
    const { location: prevLocation } = prevProps;

    if (prevLocation !== location) fetchCountriesDocuments(location);
  }
  render() {
    return null;
  }
}

CountriesDocumentsProvider.propTypes = {
  fetchCountriesDocuments: PropTypes.func.isRequired,
  location: PropTypes.string
};

export { actions, reducers, initialState };

export default connect(null, actions)(CountriesDocumentsProvider);
