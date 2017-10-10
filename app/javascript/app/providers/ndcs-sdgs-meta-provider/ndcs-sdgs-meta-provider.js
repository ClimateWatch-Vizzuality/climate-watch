import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './ndcs-sdgs-meta-provider-actions';

export { initialState } from './ndcs-sdgs-meta-provider-reducers';
export { default as reducers } from './ndcs-sdgs-meta-provider-reducers';
export { default as actions } from './ndcs-sdgs-meta-provider-actions';

class NdcsSdgsMetaProvider extends PureComponent {
  componentDidMount() {
    const { getNdcsSdgsMeta } = this.props;
    getNdcsSdgsMeta();
  }

  render() {
    return null;
  }
}

NdcsSdgsMetaProvider.propTypes = {
  getNdcsSdgsMeta: PropTypes.func.isRequired
};

export default connect(null, actions)(NdcsSdgsMetaProvider);
