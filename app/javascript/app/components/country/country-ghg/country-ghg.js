import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import { isEmbededComponent } from 'utils/navigation';
import { connect } from 'react-redux';
import Component from './country-ghg-component';

const mapStateToProps = (state, { location }) => {
  const search = qs.parse(location.search);
  const isEmbedded = isEmbededComponent(location);
  return { search, isEmbedded };
};

export default withRouter(connect(mapStateToProps, null)(Component));
