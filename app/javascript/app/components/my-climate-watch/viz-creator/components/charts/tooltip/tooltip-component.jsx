import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { themr } from 'react-css-themr';

import theme from 'styles/themes/chart-tooltip/chart-tooltip.scss';

const Tooltip = ({ label, tooltip }) => (
  <div className={theme.tooltip}>
    <div className={theme.tooltipHeader}>
      <span className={cx(theme.labelName, theme.labelNameBold)}>{label}</span>
      <span
        className={theme.unit}
        // dangerouslySetInnerHTML={{ __html: unit }} // eslint-disable-line
      />
    </div>
    {tooltip.map(l => (
      <div className={theme.legend} key={l.label}>
        <span className={theme.labelDot} style={{ backgroundColor: l.color }} />
        <span className={theme.labelName}>{l.label}</span>
        <span className={theme.labelValue}>{l.value}</span>
      </div>
    ))}
  </div>
);

Tooltip.propTypes = {
  label: PropTypes.any,
  tooltip: PropTypes.array
};

export default themr('Tooltip', theme)(Tooltip);
