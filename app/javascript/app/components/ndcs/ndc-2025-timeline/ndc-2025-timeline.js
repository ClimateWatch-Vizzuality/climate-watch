import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import actions from './ndc-2025-timeline-actions';
import reducers, { initialState } from './ndc-2025-timeline-reducers';

import CountryTimelineComponent from './ndc-2025-timeline-component';
import { getDates } from './ndc-2025-timeline-selectors';

const mapStateToProps = (state, { match }) => {
  const { iso } = match.params;
  const countryTimeline = {
    timeline: state.timeline,
    iso
  };

  const documents = getDates(countryTimeline);
  const documentYears = documents && Object.keys(documents);

  return {
    documents,
    documentYears
  };
};

class CountryTimelineContainer extends PureComponent {
  render() {
    return createElement(CountryTimelineComponent, {
      ...this.props
    });
  }
}

CountryTimelineContainer.propTypes = {};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(CountryTimelineContainer)
);
