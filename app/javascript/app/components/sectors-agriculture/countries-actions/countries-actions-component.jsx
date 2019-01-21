import React, { PureComponent } from 'react';
import { Switch } from 'cw-components';
import NdcsMap from './ndcs-map';
import styles from './countries-actions-styles';

const tabs = [
  {
    name: 'MAP',
    value: 'map',
    disabled: false
  },
  {
    name: 'TABLE',
    value: 'table',
    disabled: true
  }
];

class CountriesActions extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <div className={styles.page}>
          <h3 className={styles.title}>Countries’ Actions in their NDCs</h3>
          <div className={styles.descriptionWrapper}>
            <span className={styles.description}>
              As part of the Paris Agreement, (X) countries have proposed
              agricultural mitigation and adaptation actions. See what countries
              are saying about agriculture in their NDCs.
            </span>
            <Switch
              options={tabs}
              selectedOption={tabs[0].value}
              onClick={() => {}}
              theme={{
                wrapper: styles.switch,
                option: styles.switchOption,
                checkedOption: styles.switchSelected
              }}
            />
          </div>
          <NdcsMap />
        </div>
      </React.Fragment>
    );
  }
}

export default CountriesActions;
