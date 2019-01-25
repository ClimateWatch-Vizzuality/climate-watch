import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import qs from 'query-string';
import Component from './land-area-component';
import { landArea } from './land-area-selectors';

const mapStateToProps = (state, { location }) => {
  const search = qs.parse(location.search);
  const cc = { ...state, search };
  return {
    ...landArea(cc)
  };
};

class LandAreaContainer extends PureComponent {
  render() {
    return <Component {...this.props} />;
  }
}

LandAreaContainer.propTypes = {
  history: PropTypes.shape({})
};

export default withRouter(connect(mapStateToProps, null)(LandAreaContainer));
