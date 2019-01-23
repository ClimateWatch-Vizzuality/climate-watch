import { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getLocationParamUpdated } from 'utils/navigation';
import { actions } from 'components/modal-metadata';
import { getAllData } from './drivers-of-emissions-selectors';
import Component from './drivers-of-emissions-component';

class DriversOfEmissions extends PureComponent {
  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  handleTabChange = ({ value }) =>
    this.updateUrlParam([{ name: 'tab', value }]);

  handleCountryChange = ({ value }) => {
    this.updateUrlParam([{ name: 'emissionsCountry', value }]);
  };

  render() {
    return createElement(Component, {
      ...this.props,
      handleTabChange: this.handleTabChange,
      handleCountryChange: this.handleCountryChange
    });
  }
}

DriversOfEmissions.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = (state, { location }) => {
  const agricultureEmissions = state.agricultureEmissions;
  const { data: regions } = state.regions;
  const { data: countries } = state.countries;
  const ghgEmissions = state.emissions;
  const emissionsData = {
    agricultureEmissions,
    regions,
    countries,
    ghgEmissions,
    location
  };
  const getTargetsData = getAllData(emissionsData);
  return { ...getTargetsData };
};

export default withRouter(
  connect(mapStateToProps, actions)(DriversOfEmissions)
);
