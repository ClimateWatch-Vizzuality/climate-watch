import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import cx from 'classnames';
import Icon from 'components/icon';
import accordionArrow from 'assets/icons/accordion-arrow.svg';

import tooltipTheme from 'styles/themes/map-tooltip/map-tooltip.scss';
import styles from 'components/ndcs/ndcs-enhancements-viz/ndcs-enhancements-tooltip/ndcs-enhancements-tooltip-styles.scss';

const NDCSEnhancementsTooltip = props => {
  const { isTablet, tooltipValues, id } = props;
  return (
    <ReactTooltip
      className={cx(tooltipTheme.tooltipContainer, styles.tooltipContainer)}
      id={id}
      delayHide={isTablet ? 0 : 3000}
    >
      <div className={tooltipTheme.countryName}>{tooltipValues.label}</div>
      {tooltipValues.value && (
        <p className={cx(tooltipTheme.text, styles.tooltipValue)}>
          {tooltipValues.value}
        </p>
      )}
      {tooltipValues.statement && (
        <p className={tooltipTheme.text}>{tooltipValues.statement}</p>
      )}
      {tooltipValues.note && (
        <p className={cx(tooltipTheme.text, styles.tooltipNote)}>
          {tooltipValues.note}
        </p>
      )}
      <Icon icon={accordionArrow} className={tooltipTheme.icon} />
    </ReactTooltip>
  );
};

NDCSEnhancementsTooltip.propTypes = {
  isTablet: PropTypes.bool,
  tooltipValues: PropTypes.object,
  id: PropTypes.string
};

export default NDCSEnhancementsTooltip;
