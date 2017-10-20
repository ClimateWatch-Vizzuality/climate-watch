import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './ghg-emissions-meta-provider-actions';
import reducers, { initialState } from './ghg-emissions-meta-provider-reducers';

class EmissionsMetaProvider extends PureComponent {
  componentDidMount() {
    this.props.fetchEmissionsMeta();
  }

  render() {
    return null;
  }
}

EmissionsMetaProvider.propTypes = {
  fetchEmissionsMeta: PropTypes.func.isRequired
};

export const redux = {
  actions,
  reducers,
  initialState
};
export default connect(null, actions)(EmissionsMetaProvider);
