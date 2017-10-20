import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './ndcs-sdgs-meta-provider-actions';
import reducers, { initialState } from './ndcs-sdgs-meta-provider-reducers';

class NdcsSdgsMetaProvider extends PureComponent {
  componentDidMount() {
    this.props.getNdcsSdgsMeta();
  }

  render() {
    return null;
  }
}

NdcsSdgsMetaProvider.propTypes = {
  getNdcsSdgsMeta: PropTypes.func.isRequired
};

export const redux = {
  actions,
  reducers,
  initialState
};
export default connect(null, actions)(NdcsSdgsMetaProvider);
