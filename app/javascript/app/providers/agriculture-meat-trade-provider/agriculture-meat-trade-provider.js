import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import actions from './agriculture-meat-trade-provider-actions';

export { initialState } from './agriculture-meat-trade-provider-reducers';
export {
  default as reducers
} from './agriculture-meat-trade-provider-reducers';
export { default as actions } from './agriculture-meat-trade-provider-actions';

class MeatTradeProvider extends PureComponent {
  componentDidMount() {
    const { fetchMeatTrade, params } = this.props;
    if (params) fetchMeatTrade(params);
  }

  componentDidUpdate(prevProps) {
    const { fetchMeatTrade, params } = this.props;
    const { params: prevParams } = prevProps;

    if (!isEqual(prevParams, params)) fetchMeatTrade(params);
  }

  render() {
    return null;
  }
}

MeatTradeProvider.propTypes = {
  fetchMeatTrade: PropTypes.func.isRequired,
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
