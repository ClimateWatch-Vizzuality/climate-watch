import React, { useState } from 'react';
import { Switch } from 'cw-components';

import ButtonGroup from 'components/button-group';

import globalChartPlaceholder from 'assets/placeholders/iconic-global-placeholder.png';

import styles from './styles.scss';

const conditionalSwitchOptions = [
  {
    name: 'Unconditional NDC',
    value: 'unconditional'
  },
  {
    name: 'Conditional NDC',
    value: 'conditional'
  }
];

const GlobalViewComponent = () => {
  const [conditionalNDC, setConditionalNDC] = useState(
    conditionalSwitchOptions[0]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.summaryHeader}>
        <div className={styles.summaryDescription}>
          <p>
            Historical emissions and projections of NDCs targets and global GHG
            Emissions.
          </p>
        </div>
        <div className={styles.buttonGroupContainer}>
          <ButtonGroup
            className={styles.buttonGroup}
            buttonsConfig={[
              {
                type: 'info',
                onClick: () => {}
              },
              {
                type: 'share',
                shareUrl: null
              },
              {
                type: 'download',
                options: [
                  {
                    label: 'Save as image (PNG)',
                    action: () => {}
                  }
                ]
              }
            ]}
          />
        </div>
      </div>

      <div className={styles.chartOptionsContainer}>
        <Switch
          options={conditionalSwitchOptions}
          selectedOption={conditionalNDC.value}
          onClick={setConditionalNDC}
          theme={{
            wrapper: styles.switchWrapper,
            checkedOption: styles.switchSelected
          }}
        />
      </div>

      <div className={styles.chartContainer}>
        <div>
          <img
            className={styles.chartPlaceholderImg}
            src={globalChartPlaceholder}
          />
        </div>
      </div>
    </div>
  );
};

GlobalViewComponent.PropTypes = {};

export default GlobalViewComponent;
