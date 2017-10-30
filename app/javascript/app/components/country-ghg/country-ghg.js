import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import { connect } from 'react-redux';
import Component from './country-ghg-component';

const mapStateToProps = (state, { location }) => {
  const search = qs.parse(location.search);
  return { search };
};

export default withRouter(connect(mapStateToProps, null)(Component));
