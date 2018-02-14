import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './emissions-provider-actions';
import reducers, { initialState } from './emissions-provider-reducers';

class EmissionsProvider extends PureComponent {
  componentDidMount() {
    const { filters, getEmissions } = this.props;
    getEmissions(filters);
  }

  componentWillReceiveProps(nextProps) {
    const { filters, getEmissions } = nextProps;
    if (filters !== this.props.filters) {
      getEmissions(filters);
    }
  }

  render() {
    return null;
  }
}

EmissionsProvider.propTypes = {
  getEmissions: PropTypes.func.isRequired,
  filters: PropTypes.array
};

export { actions, reducers, initialState };
export default connect(null, actions)(EmissionsProvider);
