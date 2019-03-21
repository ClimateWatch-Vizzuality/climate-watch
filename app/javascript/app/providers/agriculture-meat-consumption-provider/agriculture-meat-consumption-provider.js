import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import actions from './agriculture-meat-consumption-provider-actions';

export { initialState } from './agriculture-meat-consumption-provider-reducers';
export {
  default as reducers
} from './agriculture-meat-consumption-provider-reducers';
export {
  default as actions
} from './agriculture-meat-consumption-provider-actions';

class MeatConsumptionProvider extends PureComponent {
  componentDidMount() {
    const { fetchMeatConsumption, params } = this.props;
    if (params) fetchMeatConsumption(params);
  }

  componentDidUpdate(prevProps) {
    const { fetchMeatConsumption, params } = this.props;
    const { params: prevParams } = prevProps;

    if (!isEqual(prevParams, params)) fetchMeatConsumption(params);
  }

  render() {
    return null;
  }
}

MeatConsumptionProvider.propTypes = {
  fetchMeatConsumption: PropTypes.func.isRequired,
  params: PropTypes.shape({
    country: PropTypes.string,
    year: PropTypes.string
  })
};

MeatConsumptionProvider.defaultProps = {
  country: null,
  params: {}
};

export default connect(null, actions)(MeatConsumptionProvider);
