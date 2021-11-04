import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Component from './country-climate-enhancements-component';
import { getPreviousComparisonCountryValues } from './country-climate-enhancements-selectors';

const mapStateToProps = (state, { match }) => {
  const stateWithIso = {
    iso: match && match.params.iso,
    ...state
  };
  return {
    previousComparisonValues: getPreviousComparisonCountryValues(stateWithIso)
  };
};

export default withRouter(connect(mapStateToProps, null)(Component));
