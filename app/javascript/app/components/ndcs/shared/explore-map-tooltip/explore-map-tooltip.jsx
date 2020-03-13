import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import cx from 'classnames';
import Button from 'components/button';

import tooltipTheme from 'styles/themes/map-tooltip/map-tooltip.scss';
import styles from './explore-map-tooltip-styles.scss';

const ExploreMapTooltip = props => {
  const {
    isTablet,
    countryData,
    handleCountryClick,
    tooltipValues,
    id
  } = props;
  return (
    <ReactTooltip id={id} delayHide={isTablet ? 0 : 3000}>
      <Button
        onClick={() => handleCountryClick(null, countryData)}
        className={cx(tooltipTheme.container, styles.tooltipButton)}
      >
        <div className={cx(tooltipTheme.countryName, tooltipTheme.link)}>
          <div className={styles.tooltipCountry}>
            {tooltipValues.countryName}
          </div>
          <div className={styles.tooltipValue}>{tooltipValues.value}</div>
          {tooltipValues.emissionsValue && (
            <div className={styles.tooltipValue}>
              {tooltipValues.emissionsValue} of global emissions
            </div>
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
