import React, { PureComponent } from 'react';
import layout from 'styles/layout.scss';
import { Switch } from 'cw-components';
import PropTypes from 'prop-types';

import * as styles from './drivers-of-emissions-styles.scss';

class DriversOfEmissions extends PureComponent {
  render() {
    const { handleTabChange, emissionTabs, activeTab } = this.props;
    return (
      <div className={layout.content}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2>Drivers of emissions</h2>
            <div className={styles.intro}>
              <p>
                Many processes result in agricultural emissions, with
                fermentation, manure and rice cultivation contributing the major
                share (XX%). This graph contains all the emissions produced in
                the different agricultural emissions sub-domains, providing a
                picture of the contribution to the total amount of GHG emissions
                from agriculture. GHG emissions from agriculture consist of
                non-CO2 gases produced by crop and livestock production and
                management activities. Explore the history and potential future
                pathways of those drivers.
              </p>
              <Switch
                options={emissionTabs}
                selectedOption={activeTab}
                onClick={handleTabChange}
                theme={{
                  wrapper: styles.switch,
                  // option: styles.switchOption
                  checkedOption: styles.switchSelected
                }}
              />
            </div>
          </div>
          <div>Data content here</div>
        </div>
      </div>
    );
  }
}

DriversOfEmissions.propTypes = {
  handleTabChange: PropTypes.func.isRequired,
  emissionTabs: PropTypes.array.isRequired,
  activeTab: PropTypes.string.isRequired
};

export default DriversOfEmissions;
