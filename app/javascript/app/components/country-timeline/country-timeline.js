import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { withRouter } from 'react-router';

import actions from './country-timeline-actions';
import reducers, { initialState } from './country-timeline-reducers';

import CountryTimelineComponent from './country-timeline-component';
// import { countryTimelineSelector } from './country-timeline-selectors';

const mapStateToProps = () => ({
  dates: ['1990-01-01', '1995-01-01', '2000-01-01', '2008-01-01', '2010-01-01'] // get this real data from store
});

class CountryTimelineContainer extends PureComponent {
  render() {
    return createElement(CountryTimelineComponent, {
      ...this.props
    });
  }
}

CountryTimelineContainer.propTypes = {};

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(CountryTimelineContainer);
