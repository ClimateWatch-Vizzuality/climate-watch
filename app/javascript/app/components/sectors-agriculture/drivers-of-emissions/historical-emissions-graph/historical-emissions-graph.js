import { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getLocationParamUpdated } from 'utils/navigation';
import { actions } from 'components/modal-metadata';
import { getAllData } from './historical-emissions-graph-selectors';
import Component from './historical-emissions-graph-component';

class HistoricalEmissionsGraph extends PureComponent {
  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  handleCountryChange = ({ value }) => {
    this.updateUrlParam([{ name: 'emissionsCountry', value }]);
  };

  handleEmissionTypeChange = ({ value }) => {
    this.updateUrlParam([{ name: 'emissionType', value }, { name: 'filter', value: '' }]);
  };

  handleMetricTypeChange = ({ value }) => {
    this.updateUrlParam([{ name: 'emissionMetric', value }]);
  };

  handleInfoClick = () => {
    this.props.setModalMetadata({
      category: 'Agriculture - Historical Emissions',
      slugs: 'FAOSTAT_1',
      open: true
    });
  };

  render() {
    return createElement(Component, {
      ...this.props,
      handleCountryChange: this.handleCountryChange,
      handleEmissionTypeChange: this.handleEmissionTypeChange,
      handleMetricTypeChange: this.handleMetricTypeChange,
      handleInfoClick: this.handleInfoClick
    });
  }
}

HistoricalEmissionsGraph.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  setModalMetadata: PropTypes.func.isRequired
};

const mapStateToProps = (state, { location }) => {
  const agricultureEmissions = state.agricultureEmissions;
  const { data: regions } = state.regions;
  const { data: countries } = state.countries;
  const ghgEmissions = state.emissions;
  const ghgEmissionsMeta = state.ghgEmissionsMeta;
  const wbCountryData = state.wbCountryData;
  const emissionsData = {
    agricultureEmissions,
    regions,
    countries,
    ghgEmissions,
    ghgEmissionsMeta,
    wbCountryData,
    location
  };
  const getTargetsData = getAllData(emissionsData);
  return { ...getTargetsData };
};

export default withRouter(connect(mapStateToProps, actions)(HistoricalEmissionsGraph));
