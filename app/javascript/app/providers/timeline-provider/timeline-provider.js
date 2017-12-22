import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import actions from './timeline-provider-actions';
import reducers, { initialState } from './timeline-provider-reducers';

class TimelineProvider extends PureComponent {
  componentDidMount() {
    const { match, getTimeline } = this.props;
    const iso = match.params.iso;
    getTimeline(iso);
  }

  componentWillReceiveProps(nextProps) {
    const iso = this.props.match.params.iso;
    const nextIso = nextProps.match.params.iso;
    if (iso !== nextIso) {
      this.props.getTimeline(nextIso);
    }
  }

  render() {
    return null;
  }
}

TimelineProvider.propTypes = {
  getTimeline: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export { actions, reducers, initialState };
export default withRouter(connect(null, actions)(TimelineProvider));
