import React, { useState, useEffect, useMemo } from 'react';
import { Dropdown, Switch } from 'cw-components';

import NdcContentCountryEmissionsProvider from 'providers/ndc-content-country-emissions-provider';
import ButtonGroup from 'components/button-group';
import GhgMultiselectDropdown from 'components/ghg-multiselect-dropdown';

import styles from './styles.scss';
import TagsComponent from './tags';
import CountryChartComponent from './country-chart/component';
import {
  VIEW_OPTIONS,
  LOCATION_GROUPS,
  BASELINE_YEAR_OPTIONS,
  CONDITIONAL_SWITCH_OPTIONS
} from './constants';

const CountryBreakdownComponent = ({ data }) => {
  const [view, setView] = useState(VIEW_OPTIONS[1]);
  const [locations, setLocations] = useState(undefined);
  const [baselineYear, setBaselineYear] = useState(BASELINE_YEAR_OPTIONS[0]);
  const [conditionalNDC, setConditionalNDC] = useState(
    CONDITIONAL_SWITCH_OPTIONS[0]
  );
  const [chartData, setChartData] = useState(undefined);

  // Locations ISOs (de-duplicated) from selection
  const locationsISOs = useMemo(() => {
    const selectedLocations = locations?.reduce((acc, entry) => {
      const isos = entry?.groupId === 'regions' ? entry?.expandsTo : [entry?.iso];
      return [...acc, ...isos];
    }, []);
    return [...new Set(selectedLocations)];
  }, [locations]);

  // Option to default to when no location is selected
  // const defaultLocationOption = useMemo(
  //   () =>
  //     data?.locations?.find(
  //       ({ iso }) => iso === 'G20' // WORLD | G20 | TOP | BRA (20) | CHN (29) | IDN (65)
  //     ),
  //   [data]
  // );

  const defaultLocationOptions = useMemo(
    () =>
      data?.locations?.filter(
        // ({ iso }) => ['GBR', 'RUS', 'CHN', 'PRT', 'ESP', 'EUU']?.includes(iso)
        ({ iso }) => ['TOP']?.includes(iso)
      ),
    [data]
  );

  // Set default location when data changes
  useEffect(() => {
    // setLocations(defaultLocationOption ? [defaultLocationOption] : []);
    setLocations(defaultLocationOptions || []);
  }, [data]);

  // Parse data to a format the chart expects
  useEffect(() => {
    const baselineData =
      Object.values(data?.emissions || {})
        ?.filter((entry) => locationsISOs?.includes(entry?.location?.iso_code3))
        ?.reduce((acc, { location: entryLocation, baseline: entryBaseline }) => {
          const target = entryBaseline?.[baselineYear?.value]?.target;
          return [
            ...acc,
            {
              iso: entryLocation?.iso_code3,
              name: entryLocation?.cait_name,
              unconditional: {
                2030: target?.['2030']?.unconditional?.percentage,
                2035: target?.['2035']?.unconditional?.percentage
              },
              conditional: {
                2030: target?.['2030']?.conditional?.percentage,
                2035: target?.['2035']?.conditional?.percentage
              }
            }
          ];
        }, []);

    const targetData = Object.values(data?.emissions || {})
      ?.filter((entry) => locationsISOs?.includes(entry?.location?.iso_code3))
      ?.reduce((acc, { location: entryLocation, target: entryTarget }) => [
        ...acc,
        {
          iso: entryLocation?.iso_code3,
          name: entryLocation?.cait_name,
          unconditional: entryTarget?.unconditional,
          conditional: entryTarget?.conditional
        }
      ], []);

    setChartData({
      baseline: baselineData,
      target: targetData
    });
  }, [data, view, locations, baselineYear, conditionalNDC]);

  // Handle location change - when no location selected, we'll pre-selected the default one
  const handleLocationSelectionChange = (entries) => {
    if (!entries?.length) {
      // setLocations(defaultLocationOption ? [defaultLocationOption] : []);
      setLocations(defaultLocationOptions || []);
      return;
    }
    setLocations(entries);
  };

  // Chart settings
  const chartSettings = useMemo(
    () => ({
      view,
      locations: locationsISOs,
      baselineYear,
      conditionalNDC
    }),
    [view, locations, baselineYear, conditionalNDC]
  );

  const { locations: locationsOptions } = data;
  const displayBaselineYearOptions = view?.value === 'baseline';

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
              options={VIEW_OPTIONS}
              onValueChange={setView}
              hideResetButton
            />
            <GhgMultiselectDropdown
              label={'Location'}
              values={locations || []}
              options={locationsOptions || []}
              groups={LOCATION_GROUPS}
              onSelectionChange={handleLocationSelectionChange}
            />
            {displayBaselineYearOptions && (
              <Dropdown
                label="Baseline Year"
                value={baselineYear}
                options={BASELINE_YEAR_OPTIONS}
                onValueChange={setBaselineYear}
                hideResetButton
              />
            )}
          </div>
          <div className={styles.conditionalSwitchContainer}>
            <Switch
              options={CONDITIONAL_SWITCH_OPTIONS}
              selectedOption={conditionalNDC.value}
              onClick={setConditionalNDC}
              theme={{
                wrapper: styles.switchWrapper,
                checkedOption: styles.switchSelected
              }}
            />
          </div>
        </div>

        <CountryChartComponent data={chartData} settings={chartSettings} />

        <TagsComponent type={conditionalNDC.value} />
        {/* <div className={styles.lastUpdated}>Last updated on June 12,2024</div> */}
        <div className={styles.footnote}>
          * Percentage Change in Emissions relative to Baseline
        </div>
      </div>
      <NdcContentCountryEmissionsProvider />
    </>
  );
};

CountryBreakdownComponent.propTypes = {};

export default CountryBreakdownComponent;
