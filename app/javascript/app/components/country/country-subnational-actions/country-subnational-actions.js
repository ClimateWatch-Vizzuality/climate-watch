import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Component from './country-subnational-actions-component';

const mapStateToProps = (state, { match }) => {
  const iso = match.params.iso;
  return {
    iso
  };
};

export default withRouter(connect(mapStateToProps, null)(Component));
