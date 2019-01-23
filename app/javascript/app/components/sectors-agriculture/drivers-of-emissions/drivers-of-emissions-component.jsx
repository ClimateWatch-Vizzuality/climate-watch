import React, { PureComponent } from 'react';
import { Switch } from 'cw-components';
import PropTypes from 'prop-types';
import * as styles from './drivers-of-emissions-styles.scss';
import { emissionTabs } from './drivers-of-emissions-data';
import HistoricalEmissionsGraph from './historical-emissions-graph/historical-emissions-graph';
import EmissionPathwaysGraph from './emission-pathways-graph/emission-pathways-graph';

const switchOptions = {
  HISTORICAL_EMISSIONS: HistoricalEmissionsGraph,
  FUTURE_PATHWAYS: EmissionPathwaysGraph
};

class DriversOfEmissions extends PureComponent {
  render() {
    const { handleTabChange, activeTab, pieChartData } = this.props;
    const agriculturePercentage =
      pieChartData && pieChartData.emissionPercentage;

    const selectedOption = activeTab.value || emissionTabs[0].value;
    const Component = switchOptions[selectedOption];

    return (
      <div>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2>Drivers of emissions</h2>
            <div className={styles.intro}>
              <p>
                Many processes result in agricultural emissions, with
                fermentation, manure and rice cultivation contributing the major
                share{agriculturePercentage && ` (${agriculturePercentage})`}.
                This graph contains all the emissions produced in the different
                agricultural emissions sub-domains, providing a picture of the
                contribution to the total amount of GHG emissions from
                agriculture. GHG emissions from agriculture consist of non-CO<sub>2</sub>{' '}
                gases produced by crop and livestock production and management
                activities. Explore the history and potential future pathways of
                those drivers.
              </p>
              <Switch
                options={emissionTabs}
                selectedOption={activeTab.value}
                onClick={handleTabChange}
                theme={{
                  wrapper: styles.switch,
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
