import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import cx from 'classnames';
import Button from 'components/button';

import tooltipTheme from 'styles/themes/map-tooltip/map-tooltip.scss';
import styles from './explore-map-tooltip-styles.scss';

const icons = {
  'No revision compared to the provious submission': 'A'
};

const ExploreMapTooltip = props => {
  const {
    isTablet,
    countryData,
    handleCountryClick,
    tooltipValues,
    id
  } = props;

  return (
    <ReactTooltip
      id={id}
      delayHide={isTablet ? 0 : 3000}
      className={cx({
        [styles.withIndicators]: tooltipValues.indicators
      })}
    >
      <Button
        onClick={() => handleCountryClick(null, countryData)}
        className={cx(tooltipTheme.container, styles.tooltipButton)}
      >
        <div className={cx(tooltipTheme.countryName, tooltipTheme.link)}>
          <div className={styles.tooltipCountry}>
            {tooltipValues.countryName}
          </div>
          <div
            className={styles.tooltipValue}
            dangerouslySetInnerHTML={{ __html: tooltipValues.value }} // eslint-disable-line
          />
          {tooltipValues.indicators && (
            <ul className={styles.indicators}>
              {tooltipValues.indicators.map(([indicator, value]) => (
                <li
                  key={`indicator-${indicator}-${tooltipValues.countryName}`}
                  className={styles.indicator}
                >
                  {icons[value]} {indicator}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Button>
    </ReactTooltip>
  );
};

ExploreMapTooltip.propTypes = {
  isTablet: PropTypes.bool,
  countryData: PropTypes.object,
  handleCountryClick: PropTypes.func.isRequired,
  tooltipValues: PropTypes.object,
  id: PropTypes.string
};

export default ExploreMapTooltip;
