import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './ghg-emissions-meta-provider-actions';

export { initialState } from './ghg-emissions-meta-provider-reducers';
export { default as reducers } from './ghg-emissions-meta-provider-reducers';
export { default as actions } from './ghg-emissions-meta-provider-actions';

class EmissionsMetaProvider extends PureComponent {
  componentDidMount() {
    const { fetchEmissionsMeta } = this.props;
    fetchEmissionsMeta();
  }

  render() {
    return null;
  }
}

EmissionsMetaProvider.propTypes = {
  fetchEmissionsMeta: PropTypes.func.isRequired
};

export default connect(null, actions)(EmissionsMetaProvider);
