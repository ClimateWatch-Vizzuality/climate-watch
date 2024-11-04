import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import actions from './ndc-2025-timeline-actions';
import reducers, { initialState } from './ndc-2025-timeline-reducers';

import CountryTimelineComponent from './ndc-2025-timeline-component';
import { getTimelineDates } from './ndc-2025-timeline-selectors';

const mapStateToProps = state => {
  const documents = getTimelineDates(state);
  const documentYears = documents?.map(d => d.date) || [];

  return {
    documents,
    documentYears
  };
};

class CountryTimelineContainer extends PureComponent {
  componentDidMount() {
    this.props.fetchCountryTimelineData();
  }

  render() {
    return createElement(CountryTimelineComponent, {
      ...this.props
    });
  }
}

CountryTimelineContainer.propTypes = {
  fetchCountryTimelineData: PropTypes.func.isRequired
};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(CountryTimelineContainer)
);
