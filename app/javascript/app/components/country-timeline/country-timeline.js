import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import actions from './country-timeline-actions';
import reducers, { initialState } from './country-timeline-reducers';

import CountryTimelineComponent from './country-timeline-component';
import { getDates } from './country-timeline-selectors';

const mapStateToProps = (state, { match }) => {
  const { iso } = match.params;
  const countryTimeline = {
    timeline: state.timeline,
    iso
  };

  return {
    dates: getDates(countryTimeline)
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
