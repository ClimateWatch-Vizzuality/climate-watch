import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './countries-provider-actions';
import reducers, { initialState } from './countries-provider-reducers';

class CountriesProvider extends PureComponent {
  componentDidMount() {
    const { getCountries, isSubnationalSource } = this.props;
    getCountries(isSubnationalSource);
  }

  componentWillReceiveProps(nextProps) {
    const { getCountries, isSubnationalSource } = nextProps;
    if (isSubnationalSource && !this.props.isSubnationalSource) {
      getCountries(isSubnationalSource);
    }
  }

  render() {
    return null;
  }
}

CountriesProvider.propTypes = {
  getCountries: PropTypes.func.isRequired,
  isSubnationalSource: PropTypes.bool
};

export { actions, reducers, initialState };
export default connect(null, actions)(CountriesProvider);
