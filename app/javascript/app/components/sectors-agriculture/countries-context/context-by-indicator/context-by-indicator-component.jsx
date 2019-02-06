import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { Dropdown } from 'cw-components';
import { TabletLandscape } from 'components/responsive';
import Map from 'components/map';
import MapLegend from 'components/map-legend';
import ButtonGroup from 'components/button-group';

import tooltipTheme from 'styles/themes/map-tooltip/map-tooltip.scss';
import styles from './context-by-indicator-styles';
import { MAP_COLORS } from './context-by-indicator-selectors';

const getTooltip = (country, tooltipTxt, { label }) => (
  <div className={tooltipTheme.info}>
    <div className={tooltipTheme.countryName}>{country.name}</div>
    <p className={tooltipTheme.text}>
      {label}: {tooltipTxt}
    </p>
  </div>
);

const buttonGroupConfig = [
  {
    type: 'info',
    onClick: () => {
      // TODO: Implement info button click
    }
  },
  {
    type: 'share',
    analyticsGraphName: 'Country/Ghg-emissions',
    positionRight: true
  },
  {
    type: 'download',
    section: 'ghg-emissions'
  },
  {
    type: 'addToUser'
  }
];

const ContextByIndicatorComponent = ({
  indicators,
  selectedIndicator,
  indicatorsYears,
  indicatorSelectedYear,
  paths,
  legend,
  tooltipTxt,
  countryData,
  updateIndicatorFilter,
  updateIndicatorYearFilter,
  handleCountryEnter
}) => (
  <TabletLandscape>
    {isTablet => (
      <React.Fragment>
        <div className={styles.actionsContainer}>
          <Dropdown
            label={'Indicator'}
            value={selectedIndicator}
            options={indicators}
            onValueChange={updateIndicatorFilter}
            hideResetButton
          />
          <Dropdown
            label={'Year'}
            value={indicatorSelectedYear}
            options={indicatorsYears}
            onValueChange={updateIndicatorYearFilter}
            hideResetButton
          />
          <div className={styles.buttonGroupWrapper}>
            <ButtonGroup
              className={styles.btnGroup}
              buttonsConfig={buttonGroupConfig}
            />
          </div>
        </div>
        <div className={styles.visualizationsContainer}>
          <Map
            paths={paths}
            tooltipId="cc-map-tooltip"
            onCountryClick={() => {}}
            onCountryEnter={handleCountryEnter}
            onCountryFocus={() => {}}
            dragEnable={false}
          />
        </div>
        <MapLegend
          mapColors={MAP_COLORS}
          buckets={legend}
          className={styles.legend}
        />
        {!isTablet && (
          <ButtonGroup
            className={styles.btnGroup}
            buttonsConfig={buttonGroupConfig}
          />
        )}
        {countryData && (
          <ReactTooltip
            className={styles.tooltipContainer}
            id="cc-map-tooltip"
            delayHide={isTablet ? 0 : 3000}
          >
            {getTooltip(countryData, tooltipTxt, selectedIndicator)}
          </ReactTooltip>
        )}
      </React.Fragment>
    )}
  </TabletLandscape>
);

ContextByIndicatorComponent.propTypes = {
  indicators: PropTypes.arrayOf(PropTypes.shape({})),
  indicatorsYears: PropTypes.arrayOf(PropTypes.shape({})),
  selectedIndicator: PropTypes.shape({}),
  indicatorSelectedYear: PropTypes.shape({}),
  countryData: PropTypes.shape({}),
  legend: PropTypes.shape({}),
  paths: PropTypes.arrayOf(PropTypes.shape({})),
  tooltipTxt: PropTypes.string,
  updateIndicatorFilter: PropTypes.func.isRequired,
  updateIndicatorYearFilter: PropTypes.func.isRequired,
  handleCountryEnter: PropTypes.func.isRequired
};

export default ContextByIndicatorComponent;
