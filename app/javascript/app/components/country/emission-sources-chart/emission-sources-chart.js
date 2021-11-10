import { createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import {
  getEmissions,
  getSectorData,
  getEmissionProviderFilters,
  getOtherParties,
  getCountryNames
} from './emission-sources-chart-selectors';

import EmissionSourcesChartComponent from './emission-sources-chart-component';

const mapStateToProps = (state, { match }) => {
  const { iso } = match.params;
  return {
    iso,
    emissions: getEmissions(state, { iso }),
    sectorData: getSectorData(state, { iso }),
    emissionProviderFilters: getEmissionProviderFilters(state, { iso }),
    otherParties: getOtherParties(state, { iso }),
    countryNames: getCountryNames(state, { iso })
  };
};

function EmissionSourcesChartContainer(props) {
  return createElement(EmissionSourcesChartComponent, {
    ...props
  });
}

EmissionSourcesChartContainer.propTypes = {
  iso: PropTypes.string,
  emissions: PropTypes.array,
  emissionProviderFilters: PropTypes.object
};

export default withRouter(
  connect(mapStateToProps, null)(EmissionSourcesChartContainer)
);
