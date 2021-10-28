import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import cx from 'classnames';
import Icon from 'components/icon';
import PreviousSubmissionIcon from 'components/previous-submission-icon';
import accordionArrow from 'assets/icons/accordion-arrow.svg';
import tooltipTheme from 'styles/themes/map-tooltip/map-tooltip.scss';
import styles from 'components/ndcs/ndcs-enhancements-map/ndcs-enhancements-tooltip/ndcs-enhancements-tooltip-styles.scss';

const FEATURE_ENHANCEMENT_CHANGES =
  process.env.FEATURE_ENHANCEMENT_CHANGES === 'true';

const NDCSEnhancementsTooltip = props => {
  const { tooltipValues, id } = props;
  return (
    <ReactTooltip
      className={cx(tooltipTheme.tooltipContainer, styles.tooltipContainer)}
      id={id}
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
      {FEATURE_ENHANCEMENT_CHANGES && tooltipValues.indicators && (
        <ul className={tooltipTheme.indicators}>
          {tooltipValues.indicators.map(([indicator, value]) => (
            <li
              key={`indicator-${indicator}-${tooltipValues.countryName}`}
              className={tooltipTheme.tooltipIndicator}
            >
              <PreviousSubmissionIcon
                value={value}
                white
                className={tooltipTheme.tooltipIndicatorIcon}
              />
              {indicator}
            </li>
          ))}
        </ul>
      )}
      {FEATURE_ENHANCEMENT_CHANGES && tooltipValues.note && (
        <p className={cx(tooltipTheme.text, styles.tooltipNote)}>
          {tooltipValues.note}
        </p>
      )}
      <Icon icon={accordionArrow} className={tooltipTheme.icon} />
    </ReactTooltip>
  );
};

NDCSEnhancementsTooltip.propTypes = {
  tooltipValues: PropTypes.object,
  id: PropTypes.string
};

export default NDCSEnhancementsTooltip;
