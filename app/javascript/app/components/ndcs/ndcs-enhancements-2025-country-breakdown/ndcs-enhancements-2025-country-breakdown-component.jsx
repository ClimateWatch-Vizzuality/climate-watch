import React, { Fragment, useState } from 'react';
import { Switch } from 'cw-components';

import layout from 'styles/layout';

import NdcContentGlobalEmissionsProvider from 'providers/ndc-content-global-emissions-provider';
import NdcContentCountryEmissionsProvider from 'providers/ndc-content-country-emissions-provider';

import styles from './ndcs-enhancements-2025-country-breakdown-styles.scss';
import GlobalViewComponent from './global-view';
import CountryBreakdownComponent from './country-breakdown';

const tabs = [
  {
    name: 'Global View',
    value: 'global',
    Component: GlobalViewComponent
  },
  {
    name: 'Country Breakdown',
    value: 'country',
    Component: CountryBreakdownComponent
  }
];

const Ndc2025CountryBreakdownComponent = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const ViewComponent = selectedTab?.Component || Fragment;

  return (
    <>
      <div className={styles.wrapper}>
        <div className={layout.content}>
          <div className={styles.summary}>
            <div className={styles.summaryHeader}>
              <h2>
                How are countries collectively reducing their emissions for
                2035?
              </h2>
            </div>
            <div className={styles.summaryDescription}>
              <p>
                Explore how countries are collectively and individually
                contributing to reduce their emissions by 2035, and find out how
                far the world is from closing the emission gap to reach a 2C or
                a 1.5C aligned future.
              </p>
            </div>
          </div>
          <div className={styles.switchWrapper}>
            <Switch
              options={tabs}
              selectedOption={selectedTab.value}
              onClick={setSelectedTab}
              theme={{
                wrapper: styles.switchWrapper,
                checkedOption: styles.switchSelected
              }}
            />
          </div>
          <div className={styles.chartWrapper}>
            <ViewComponent />
          </div>
        </div>
      </div>
      <NdcContentGlobalEmissionsProvider />
      <NdcContentCountryEmissionsProvider />
    </>
  );
};

Ndc2025CountryBreakdownComponent.propTypes = {};

export default Ndc2025CountryBreakdownComponent;
