import { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getLocationParamUpdated } from 'utils/navigation';
import { actions } from 'components/modal-metadata';

import { getEmissionsTabSelected } from './drivers-of-emissions-selectors';
import Component from './drivers-of-emissions-component';
import { emissionTabs } from './drivers-of-emissions-data';

class DriversOfEmissions extends PureComponent {
  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  handleTabChange = ({ value }) =>
    this.updateUrlParam([{ name: 'tab', value }]);

  render() {
    return createElement(Component, {
      ...this.props,
      handleTabChange: this.handleTabChange,
      emissionTabs
    });
  }
}

DriversOfEmissions.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = (state, { route, location }) => {
  const routeData = { route, location, hash: location.hash };
  return {
    activeTab: getEmissionsTabSelected(routeData)
  };
};

export default withRouter(
  connect(mapStateToProps, actions)(DriversOfEmissions)
);
