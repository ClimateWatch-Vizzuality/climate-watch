import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import actions from './agriculture-land-area-provider-actions';

export { initialState } from './agriculture-land-area-provider-reducers';
export { default as reducers } from './agriculture-land-area-provider-reducers';
export { default as actions } from './agriculture-land-area-provider-actions';

class AgricultureLandAreaProvider extends PureComponent {
  componentDidMount() {
    const { fetchAgricultureLandArea, params } = this.props;
    if (params) fetchAgricultureLandArea(params);
  }

  componentDidUpdate(prevProps) {
    const { fetchAgricultureLandArea, params } = this.props;
    const { params: prevParams } = prevProps;

    if (!isEqual(prevParams, params)) fetchAgricultureLandArea(params);
  }

  render() {
    return null;
  }
}

AgricultureLandAreaProvider.propTypes = {
  fetchAgricultureLandArea: PropTypes.func.isRequired,
  params: PropTypes.shape({
    country: PropTypes.string,
    year: PropTypes.string
  })
};

AgricultureLandAreaProvider.defaultProps = {
  country: null,
  params: {}
};

export default connect(null, actions)(AgricultureLandAreaProvider);
