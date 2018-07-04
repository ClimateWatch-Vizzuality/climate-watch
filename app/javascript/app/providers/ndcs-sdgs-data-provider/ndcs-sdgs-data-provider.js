import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import actions from './ndcs-sdgs-data-provider-actions';
import reducers, { initialState } from './ndcs-sdgs-data-provider-reducers';

class NdcsSdgsDataProvider extends PureComponent {
  componentDidMount() {
    const { getNdcsSdgsData, match, document } = this.props;
    getNdcsSdgsData({ iso: match.params.iso, document });
  }

  componentWillReceiveProps(nextProps) {
    const iso = this.props.match.params.iso;
    const nextIso = nextProps.match.params.iso;

    if (iso !== nextIso || this.props.document !== nextProps.document) {
      this.props.getNdcsSdgsData({
        iso: nextIso,
        document: nextProps.document
      });
    }
  }

  render() {
    return null;
  }
}

NdcsSdgsDataProvider.propTypes = {
  getNdcsSdgsData: PropTypes.func.isRequired,
  match: PropTypes.object,
  document: PropTypes.string
};

export { actions, reducers, initialState };
export default withRouter(connect(null, actions)(NdcsSdgsDataProvider));
