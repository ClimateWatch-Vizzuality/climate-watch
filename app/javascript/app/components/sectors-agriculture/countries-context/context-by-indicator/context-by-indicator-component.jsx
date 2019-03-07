import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import { Dropdown } from 'cw-components';
import { TabletLandscape } from 'components/responsive';
import Map from 'components/map';
import MapLegend from 'components/map-legend';
import ButtonGroup from 'components/button-group';
import Icon from 'components/icon';
import accordionArrow from 'assets/icons/accordion-arrow.svg';
import tooltipTheme from 'styles/themes/map-tooltip/map-tooltip.scss';
import styles from './context-by-indicator-styles';
import { MAP_COLORS } from './context-by-indicator-selectors';

const getTooltip = (country, tooltipTxt, { label }) => (
  <Link className={tooltipTheme.container} to={`/countries/${country.id}`}>
    <div className={tooltipTheme.info}>
      <div className={tooltipTheme.countryName}>{country.name}</div>
      <p className={tooltipTheme.text}>
        {label}: {tooltipTxt || 'No Data'}
      </p>
    </div>
    <Icon icon={accordionArrow} className={tooltipTheme.icon} />
  </Link>
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
  topTenCountries,
  updateIndicatorFilter,
  updateIndicatorYearFilter,
  handleCountryEnter,
  handleCountryClick
}) => (
  <TabletLandscape>
    {isTablet => (
      <React.Fragment>
        <div className={styles.actionsContainer}>
          <div className={styles.filtersGroup}>
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
          </div>
          {isTablet && (
            <ButtonGroup
              className={styles.btnGroup}
              buttonsConfig={buttonGroupConfig}
            />
          )}
        </div>
        <div className={styles.visualizationsContainer}>
          <div className="layout-container">
            <Map
              paths={paths}
              tooltipId="cc-map-tooltip"
              onCountryClick={handleCountryClick}
              onCountryEnter={handleCountryEnter}
              onCountryFocus={undefined}
              dragEnable={false}
            />
            <MapLegend
              mapColors={MAP_COLORS}
              buckets={legend}
              className={styles.legend}
            />
          </div>
          {topTenCountries && (
            <div className={styles.topTenSection}>
              <p
                className={styles.title}
              >{`${selectedIndicator.label} (${selectedIndicator.unit})`}</p>
              {topTenCountries.length ? (
                <ul className={styles.countriesContainer}>
                  {topTenCountries.map(c => (
                    <li
                      key={`${c.value}-${Math.random()}-${selectedIndicator.label}`}
                      className={styles.countryData}
                    >
                      <span
                        data-label={c.label}
                        data-value={c.valueLabel}
                        style={{
                          width: `${c.chartWidth}%`,
                          height: '12px',
                          backgroundColor: c.color,
                          display: 'block'
                        }}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <div
                  className={styles.noData}
                >{`No ${selectedIndicator.label} data for year ${indicatorSelectedYear.label}`}</div>
              )}
            </div>
          )}
        </div>
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
            delayHide={isTablet ? 0 : 2000}
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
  topTenCountries: PropTypes.arrayOf(PropTypes.shape({})),
  indicatorsYears: PropTypes.arrayOf(PropTypes.shape({})),
  selectedIndicator: PropTypes.shape({}),
  indicatorSelectedYear: PropTypes.shape({}),
  countryData: PropTypes.shape({}),
  legend: PropTypes.shape({}),
  paths: PropTypes.arrayOf(PropTypes.shape({})),
  tooltipTxt: PropTypes.string,
  updateIndicatorFilter: PropTypes.func.isRequired,
  updateIndicatorYearFilter: PropTypes.func.isRequired,
  handleCountryEnter: PropTypes.func.isRequired,
  handleCountryClick: PropTypes.func.isRequired
};

export default ContextByIndicatorComponent;
