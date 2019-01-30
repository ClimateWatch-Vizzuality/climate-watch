import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import actions from './agriculture-world-meat-trade-provider-actions';

export { initialState } from './agriculture-world-meat-trade-provider-reducers';
export {
  default as reducers
} from './agriculture-world-meat-trade-provider-reducers';
export {
  default as actions
} from './agriculture-world-meat-trade-provider-actions';

class MeatTradeProvider extends PureComponent {
  componentDidMount() {
    const { fetchWorldMeatTrade, params } = this.props;
    if (params) fetchWorldMeatTrade(params);
  }

  componentDidUpdate(prevProps) {
    const { fetchWorldMeatTrade, params } = this.props;
    const { params: prevParams } = prevProps;

    if (!isEqual(prevParams, params)) fetchWorldMeatTrade(params);
  }

  render() {
    return null;
  }
}

MeatTradeProvider.propTypes = {
  fetchWorldMeatTrade: PropTypes.func.isRequired,
  params: PropTypes.shape({
    country: PropTypes.string,
    year: PropTypes.string
  })
};

MeatTradeProvider.defaultProps = {
  country: null,
  params: {}
};

export default connect(null, actions)(MeatTradeProvider);
