import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './agriculture-countries-context-provider-actions';

export {
  initialState
} from './agriculture-countries-context-provider-reducers';
export {
  default as reducers
} from './agriculture-countries-context-provider-reducers';
export {
  default as actions
} from './agriculture-countries-context-provider-actions';

class AgricultureCountriesContextsProvider extends PureComponent {
  componentDidMount() {
    const { fetchAgricultureCountriesContexts, country } = this.props;
    if (country) fetchAgricultureCountriesContexts(country);
  }

  componentWillUpdate(newProps) {
    const { fetchAgricultureCountriesContexts, country } = newProps;
    fetchAgricultureCountriesContexts(country);
  }

  render() {
    return null;
  }
}

AgricultureCountriesContextsProvider.propTypes = {
  fetchAgricultureCountriesContexts: PropTypes.func.isRequired,
  country: PropTypes.string
};

AgricultureCountriesContextsProvider.defaultProps = {
  country: null
};

export default connect(null, actions)(AgricultureCountriesContextsProvider);
