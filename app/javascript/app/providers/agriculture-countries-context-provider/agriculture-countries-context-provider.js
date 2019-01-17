import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './agriculture-countries-context-provider-actions';

export { initialState } from './agriculture-countries-context-provider-reducers';
export { default as reducers } from './agriculture-countries-context-provider-reducers';
export { default as actions } from './agriculture-countries-context-provider-actions';

class AgricultureCountriesContextsProvider extends PureComponent {
  componentDidMount() {
    const { fetchAgricultureCountriesContexts, country, year } = this.props;
    console.log(country, year)
    fetchAgricultureCountriesContexts(country, year);
  }

  render() {
    return null;
  }
}

AgricultureCountriesContextsProvider.propTypes = {
  fetchAgricultureCountriesContexts: PropTypes.func.isRequired,
  country: PropTypes.number,
  year: PropTypes.number
};

AgricultureCountriesContextsProvider.defaultProps = {
  country: 16,
  year: 2011
};

export default connect(null, actions)(AgricultureCountriesContextsProvider);
