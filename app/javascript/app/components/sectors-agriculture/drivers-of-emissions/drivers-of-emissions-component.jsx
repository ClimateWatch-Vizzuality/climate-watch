import React, { PureComponent } from 'react';
import { Switch } from 'cw-components';
import PropTypes from 'prop-types';
import styles from './drivers-of-emissions-styles.scss';
import { emissionTabs } from './drivers-of-emissions-data';
import HistoricalEmissionsGraph from './historical-emissions-graph/historical-emissions-graph';
import EmissionPathwaysGraph from './emission-pathways-graph/emission-pathways-graph';

// eslint-disable-next-line react/prop-types
const emissionDescription = ({ agriculturePercentage }) => (
  <p>
    Many processes result in agricultural emissions, with fermentation, manure
    and rice cultivation contributing the major share{agriculturePercentage &&
      ` (${agriculturePercentage})`}. This graph contains all the emissions
    produced in the different agricultural emissions sub-domains, providing a
    picture of the contribution to the total amount of GHG emissions from
    agriculture. GHG emissions from agriculture consist of non-CO<sub>2</sub>{' '}
    gases produced by crop and livestock production and management activities.
    Explore the history and potential future pathways of those drivers.
  </p>
);

const pathwaysDescription = () => (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
);

const switchOptions = {
  HISTORICAL_EMISSIONS: {
    Component: HistoricalEmissionsGraph,
    Description: emissionDescription
  },
  FUTURE_PATHWAYS: {
    Component: EmissionPathwaysGraph,
    Description: pathwaysDescription
  }
};

class DriversOfEmissions extends PureComponent {
  render() {
    const { handleTabChange, activeTab, pieChartData } = this.props;
    const agriculturePercentage =
      pieChartData && pieChartData.emissionPercentage;
    const selectedOption = activeTab.value || emissionTabs[0].value;
    const { Component, Description } = switchOptions[selectedOption];

    return (
      <div>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2>Drivers of Emissions</h2>
            <div className={styles.intro}>
              <Description agriculturePercentage={agriculturePercentage} />
              <Switch
                options={emissionTabs}
                selectedOption={activeTab.value}
                onClick={handleTabChange}
                theme={{
                  wrapper: styles.switchWrapper,
                  checkedOption: styles.switchSelected
                }}
              />
            </div>
          </div>
          <Component />
        </div>
      </div>
    );
  }
}

DriversOfEmissions.propTypes = {
  handleTabChange: PropTypes.func,
  activeTab: PropTypes.object,
  pieChartData: PropTypes.object
};

DriversOfEmissions.defaultProps = {
  handleTabChange: () => {},
  activeTab: emissionTabs[0],
  pieChartData: null
};

export default DriversOfEmissions;
