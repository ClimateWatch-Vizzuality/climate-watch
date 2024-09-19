import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import actions from './ndc-2025-timeline-actions';
import reducers, { initialState } from './ndc-2025-timeline-reducers';

import Ndc2025TimelineComponent from './ndc-2025-timeline-component';
import { getDates } from './ndc-2025-timeline-selectors';

const mapStateToProps = state => {
  const Ndc2025Timeline = {
    timeline: state.timeline
  };

  const documents = getDates(Ndc2025Timeline);
  const documentYears = documents && Object.keys(documents);

  return {
    documents,
    documentYears
  };
};

class Ndc2025TimelineContainer extends PureComponent {
  render() {
    return createElement(Ndc2025TimelineComponent, {
      ...this.props
    });
  }
}

Ndc2025TimelineContainer.propTypes = {};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(Ndc2025TimelineContainer)
);
