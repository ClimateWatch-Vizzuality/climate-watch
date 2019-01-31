import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import actions from './agriculture-world-meat-consumption-provider-actions';

export {
  initialState
} from './agriculture-world-meat-consumption-provider-reducers';
export {
  default as reducers
} from './agriculture-world-meat-consumption-provider-reducers';
export {
  default as actions
} from './agriculture-world-meat-consumption-provider-actions';

class MeatConsumptionProvider extends PureComponent {
  componentDidMount() {
    const { fetchWorldMeatConsumption, params } = this.props;
    if (params) fetchWorldMeatConsumption(params);
  }

  componentDidUpdate(prevProps) {
    const { fetchWorldMeatConsumption, params } = this.props;
    const { params: prevParams } = prevProps;

    if (!isEqual(prevParams, params)) fetchWorldMeatConsumption(params);
  }

  render() {
    return null;
  }
}

MeatConsumptionProvider.propTypes = {
  fetchWorldMeatConsumption: PropTypes.func.isRequired,
  params: PropTypes.shape({
    year: PropTypes.string
  })
};

MeatConsumptionProvider.defaultProps = {
  params: {}
};

export default connect(null, actions)(MeatConsumptionProvider);
