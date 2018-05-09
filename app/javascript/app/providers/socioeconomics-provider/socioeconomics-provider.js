import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import isEqual from 'lodash/isEqual';

import actions from './socioeconomics-provider-actions';

export { initialState } from './socioeconomics-provider-reducers';
export { default as reducers } from './socioeconomics-provider-reducers';
export { default as actions } from './socioeconomics-provider-actions';

class SocioeconomicsProvider extends PureComponent {
  componentDidMount() {
    const { match, locations, fetchSocioeconomics } = this.props;
    const iso = match.params.iso;
    fetchSocioeconomics(iso || locations);
  }

  componentWillReceiveProps(nextProps) {
    const iso = this.props.match.params.iso;
    const nextIso = nextProps.match.params.iso;
    const locations = this.props.locations;
    const nextLocations = nextProps.locations;
    if (iso !== nextIso || !isEqual(locations.sort(), nextLocations.sort())) {
      this.props.fetchSocioeconomics(nextIso);
    }
  }

  render() {
    return null;
  }
}

SocioeconomicsProvider.propTypes = {
  fetchSocioeconomics: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  locations: PropTypes.array.isRequired
};

export default withRouter(connect(null, actions)(SocioeconomicsProvider));
