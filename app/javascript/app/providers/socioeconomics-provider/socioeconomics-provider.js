import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import actions from './socioeconomics-provider-actions';

export { initialState } from './socioeconomics-provider-reducers';
export { default as reducers } from './socioeconomics-provider-reducers';
export { default as actions } from './socioeconomics-provider-actions';

class SocioeconomicsProvider extends PureComponent {
  componentDidMount() {
    const { match, fetchSocioeconomics } = this.props;
    const iso = match.params.iso;
    fetchSocioeconomics(iso);
  }

  render() {
    return null;
  }
}

SocioeconomicsProvider.propTypes = {
  fetchSocioeconomics: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default withRouter(connect(null, actions)(SocioeconomicsProvider));
