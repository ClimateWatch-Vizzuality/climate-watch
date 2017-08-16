import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import qs from 'query-string';
import Component from './accordion-component';

const mapStateToProps = (state, { location, match }) => {
  const search = qs.parse(location.search);
  return {
    data: state.ndc.data,
    country: match.params.iso,
    activeSection: search.activeSection,
    compare: parseInt(search.compare, 10) === 1,
    countriesToCompare: search.countriesToCompare
      ? search.countriesToCompare.split(',')
      : [],
    search,
    location
  };
};

export default withRouter(connect(mapStateToProps, null)(Component));
