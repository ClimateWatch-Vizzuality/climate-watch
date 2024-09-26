import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './ndc-2025-timeline-provider-actions';
import reducers, { initialState } from './ndc-2025-timeline-provider-reducers';

class Ndc2025TimelineProvider extends PureComponent {
  componentDidMount() {
    const { getNdc2025Timeline } = this.props;
    getNdc2025Timeline();
  }

  componentWillReceiveProps() {
    this.props.getNdc2025Timeline();
  }

  render() {
    return null;
  }
}

Ndc2025TimelineProvider.propTypes = {
  getNdc2025Timeline: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default connect(null, actions)(Ndc2025TimelineProvider);

