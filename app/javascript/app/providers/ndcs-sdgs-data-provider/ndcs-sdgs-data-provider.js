import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import actions from './ndcs-sdgs-data-provider-actions';
import reducers, { initialState } from './ndcs-sdgs-data-provider-reducers';

class NdcsSdgsDataProvider extends PureComponent {
  componentDidMount() {
    const { getNdcsSdgsData, match } = this.props;
    getNdcsSdgsData(match.params.iso);
  }

  render() {
    return null;
  }
}

NdcsSdgsDataProvider.propTypes = {
  getNdcsSdgsData: PropTypes.func.isRequired,
  match: PropTypes.object
};

export { actions, reducers, initialState };
export default withRouter(connect(null, actions)(NdcsSdgsDataProvider));
