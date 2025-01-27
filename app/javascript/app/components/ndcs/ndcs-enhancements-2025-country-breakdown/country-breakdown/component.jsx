import React, { useState } from 'react';
import { Dropdown, Switch } from 'cw-components';

import NdcContentCountryEmissionsProvider from 'providers/ndc-content-country-emissions-provider';
import ButtonGroup from 'components/button-group';

import countryChartPlaceholder from 'assets/placeholders/iconic-country-placeholder.png';

import styles from './styles.scss';
import TagsComponent from './tags';

const viewDropdownOptions = [
  { label: 'Baseline Year Comparison', value: 'baseline-year-comparison' },
  { label: '2030-2035 Target Comparison', value: '2030-2035-target-comparison' }
];

const locationDropdownOptions = [
  { label: 'Top Emitters', value: 'top-emitters' }
];

const baselineYearDropdownOptions = [
  { label: '1990 Historical Emissions', value: '1990' },
  { label: '2005 Historical Emissions', value: '1990' },
  { label: '2018 Historical Emissions', value: '1990' }
];

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

const CountryBreakdownComponent = () => {
  const [view, setView] = useState(viewDropdownOptions[0]);
  const [location, setLocation] = useState(locationDropdownOptions[0]);
  const [baselineYear, setBaselineYear] = useState(
    baselineYearDropdownOptions[0]
  );
  const [conditionalNDC, setConditionalNDC] = useState(
    conditionalSwitchOptions[0]
  );

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.summaryHeader}>
          <div className={styles.summaryDescription}>
            <p>
              Compare countries' 2030 and 2035 NDC targets to various baseline
              years and evaluate the differences between the two target years.
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
          <div className={styles.chartDropdownsContainer}>
            <Dropdown
              label="View"
              value={view}
              options={viewDropdownOptions}
              onValueChange={setView}
              hideResetButton
            />
            <Dropdown
              label="Location"
              value={location}
              options={locationDropdownOptions}
              onValueChange={setLocation}
              hideResetButton
            />
            <Dropdown
              label="Baseline Year"
              value={baselineYear}
              options={baselineYearDropdownOptions}
              onValueChange={setBaselineYear}
              hideResetButton
            />
          </div>
          <div className={styles.conditionalSwitchContainer}>
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
        </div>

        <div className={styles.chartContainer}>
          <div>
            <div>
              <img
                className={styles.chartPlaceholderImg}
                src={countryChartPlaceholder}
              />
            </div>
          </div>
        </div>
        <TagsComponent />
        {/* <div className={styles.lastUpdated}>Last updated on June 12,2024</div> */}
        <div className={styles.footnote}>
          * Percentage Change in Emissions relative to Baseline
        </div>
      </div>
      <NdcContentCountryEmissionsProvider />
    </>
  );
};

CountryBreakdownComponent.PropTypes = {};

export default CountryBreakdownComponent;
