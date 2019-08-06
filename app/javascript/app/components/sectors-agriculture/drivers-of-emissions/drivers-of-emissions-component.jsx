import React, { PureComponent } from 'react';
import { Switch } from 'cw-components';
import PropTypes from 'prop-types';
import styles from './drivers-of-emissions-styles.scss';
import { emissionTabs } from './drivers-of-emissions-data';
import HistoricalEmissionsGraph from './historical-emissions-graph/historical-emissions-graph';
import EmissionPathwaysGraph from './emission-pathways-graph/emission-pathways-graph';

const switchOptions = {
  HISTORICAL_EMISSIONS: HistoricalEmissionsGraph,
  FUTURE_PATHWAYS: EmissionPathwaysGraph
};

class DriversOfEmissions extends PureComponent {
  render() {
    const { handleTabChange, activeTab } = this.props;
    const selectedOption = activeTab.value || emissionTabs[0].value;
    const Component = switchOptions[selectedOption];
    const emissionDescription = (
      <div className={styles.description}>
        <p>
          Agriculture activities are responsible for more land-clearing than any
          other sector, contributing a significant amount of emissions in
          developing countries. GHG emissions from agriculture consist mainly of
          non-CO<sub>2</sub> gases produced by crop and livestock production and
          management activities.
        </p>
        <p>
          Explore what activities are driving agricultural emissions in the
          chart below and see future pathways of those drivers.
        </p>
      </div>
    );

    return (
      <div>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2>Drivers of Emissions</h2>
            <div className={styles.intro}>
              {emissionDescription}
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
  activeTab: PropTypes.object
};

DriversOfEmissions.defaultProps = {
  handleTabChange: () => {},
  activeTab: emissionTabs[0]
};

export default DriversOfEmissions;
