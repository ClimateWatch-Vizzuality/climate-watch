import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import actions from './agriculture-meat-production-provider-actions';

export { initialState } from './agriculture-meat-production-provider-reducers';
export {
  default as reducers
} from './agriculture-meat-production-provider-reducers';
export {
  default as actions
} from './agriculture-meat-production-provider-actions';

class MeatProductionProvider extends PureComponent {
  componentDidMount() {
    const { fetchMeatProduction, params } = this.props;
    if (params) fetchMeatProduction(params);
  }

  componentDidUpdate(prevProps) {
    const { fetchMeatProduction, params } = this.props;
    const { params: prevParams } = prevProps;

    if (!isEqual(prevParams, params)) fetchMeatProduction(params);
  }

  render() {
    return null;
  }
}

MeatProductionProvider.propTypes = {
  fetchMeatProduction: PropTypes.func.isRequired,
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
