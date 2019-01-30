import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import actions from './agriculture-world-meat-production-provider-actions';

export {
  initialState
} from './agriculture-world-meat-production-provider-reducers';
export {
  default as reducers
} from './agriculture-world-meat-production-provider-reducers';
export {
  default as actions
} from './agriculture-world-meat-production-provider-actions';

class MeatProductionProvider extends PureComponent {
  componentDidMount() {
    const { fetchWorldMeatProduction, params } = this.props;
    if (params) fetchWorldMeatProduction(params);
  }

  componentDidUpdate(prevProps) {
    const { fetchWorldMeatProduction, params } = this.props;
    const { params: prevParams } = prevProps;

    if (!isEqual(prevParams, params)) fetchWorldMeatProduction(params);
  }

  render() {
    return null;
  }
}

MeatProductionProvider.propTypes = {
  fetchWorldMeatProduction: PropTypes.func.isRequired,
  params: PropTypes.shape({
    country: PropTypes.string,
    year: PropTypes.string
  })
};

MeatProductionProvider.defaultProps = {
  country: null,
  params: {}
};

export default connect(null, actions)(MeatProductionProvider);
