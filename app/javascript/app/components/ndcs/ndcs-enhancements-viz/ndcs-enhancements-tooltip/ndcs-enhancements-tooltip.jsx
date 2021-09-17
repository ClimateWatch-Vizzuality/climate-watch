import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import cx from 'classnames';
import Icon from 'components/icon';
import accordionArrow from 'assets/icons/accordion-arrow.svg';
import enhancementIcon from 'assets/icons/enhancement/icon-w-enhancement.png';
import noPreviousIcon from 'assets/icons/enhancement/icon-w-no-previous.png';
import noDocumentIcon from 'assets/icons/enhancement/icon-w-no-document.png';
import noEnhancementIcon from 'assets/icons/enhancement/icon-w-no-enhancement.png';
import noRevisionIcon from 'assets/icons/enhancement/icon-w-no-revision.png';
import unclearIcon from 'assets/icons/enhancement/icon-w-unclear.png';

import tooltipTheme from 'styles/themes/map-tooltip/map-tooltip.scss';
import styles from 'components/ndcs/ndcs-enhancements-viz/ndcs-enhancements-tooltip/ndcs-enhancements-tooltip-styles.scss';

const icons = {
  'Revised NDC compared with previous version': enhancementIcon,
  'Yes, enhancement in the revised submission': enhancementIcon,
  'No, no enhancement in the revised submission': noEnhancementIcon,
  Unclear: unclearIcon,
  'No revision compared with previous version': noRevisionIcon,
  'No previous submission available': noPreviousIcon,
  'No Document Submitted"': noDocumentIcon
};

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
        <p
          className={cx(tooltipTheme.text, styles.tooltipValue)}
          dangerouslySetInnerHTML={{ __html: tooltipValues.value }} // eslint-disable-line
        />
      )}
      {tooltipValues.statement && (
        <p className={tooltipTheme.text}>{tooltipValues.statement}</p>
      )}
      {tooltipValues.indicators && (
        <ul className={tooltipTheme.indicators}>
          {tooltipValues.indicators.map(([indicator, value]) => (
            <li
              key={`indicator-${indicator}-${tooltipValues.countryName}`}
              className={tooltipTheme.tooltipIndicator}
            >
              {icons[value] && (
                <img
                  className={tooltipTheme.tooltipIndicatorIcon}
                  src={icons[value]}
                />
              )}
              {indicator}
            </li>
          ))}
        </ul>
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
