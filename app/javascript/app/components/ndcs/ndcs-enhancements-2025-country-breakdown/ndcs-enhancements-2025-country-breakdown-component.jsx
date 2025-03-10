import React, { Fragment, useState } from 'react';
import { Switch } from 'cw-components';

import layout from 'styles/layout';

import RegionsProvider from 'providers/regions-provider/regions-provider';
import CountriesProvider from 'providers/countries-provider/countries-provider';
import NdcContentGlobalEmissionsProvider from 'providers/ndc-content-global-emissions-provider';
import NdcContentCountryEmissionsProvider from 'providers/ndc-content-country-emissions-provider';

import styles from './ndcs-enhancements-2025-country-breakdown-styles.scss';
import GlobalViewComponent from './global-view';
// import CountryBreakdownComponent from './country-breakdown';
import CountryBreakdownFlourishComponent from './country-breakdown-flourish';

const tabs = [
  {
    name: 'Global View',
    value: 'global',
    Component: GlobalViewComponent
  },
  {
    name: 'Country Breakdown',
    value: 'country',
    Component: CountryBreakdownFlourishComponent
  }
];

const Ndc2025CountryBreakdownComponent = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[1]);
  const ViewComponent = selectedTab?.Component || Fragment;

  return (
    <>
      <div className={styles.wrapper}>
        <div className={layout.content}>
          <div className={styles.summary}>
            <div className={styles.summaryHeader}>
              <h2>How much could new NDCs reduce emissions by 2035?</h2>
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
      <CountriesProvider />
      <RegionsProvider />
      <NdcContentGlobalEmissionsProvider />
      <NdcContentCountryEmissionsProvider />
    </>
  );
};

Ndc2025CountryBreakdownComponent.propTypes = {};

export default Ndc2025CountryBreakdownComponent;
