import { connect } from 'react-redux';
import qs from 'query-string';
import { withRouter } from 'react-router';

import Component from './compare-socioeconomics-component';
import {
  getCountrySocioeconomics,
  getLocationNames
} from './compare-socioeconomics-selectors';

const mapStateToProps = (state, { location }) => {
  const search = qs.parse(location.search);
  const locations = search.locations ? search.locations.split(',') : [];
  const socioeconomicsData = {
    locations,
    socioeconomics: state.socioeconomics,
    countriesData: state.countries.data
  };

  return {
    loading: state.socioeconomics.loading,
    countrySocioeconomics: getCountrySocioeconomics(socioeconomicsData),
    locationNames: getLocationNames(socioeconomicsData),
    locations
  };
};

export default withRouter(connect(mapStateToProps, null)(Component));
