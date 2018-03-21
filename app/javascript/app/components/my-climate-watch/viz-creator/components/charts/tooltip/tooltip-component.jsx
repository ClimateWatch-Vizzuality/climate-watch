import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { themr } from 'react-css-themr';

import theme from 'styles/themes/chart-tooltip/chart-tooltip.scss';

const Tooltip = ({ label, tooltip }) => (
  <div className={theme.tooltip}>
    <div className={theme.tooltipHeader}>
      <span className={cx(theme.labelName, theme.labelNameBold)}>{label}</span>
      <span className={theme.unit}>{tooltip[0].unit}</span>
    </div>
    {tooltip.map(l => (
      <div className={theme.label} key={l.label}>
        <div className={theme.legend}>
          <span
            className={theme.labelDot}
            style={{ backgroundColor: l.color }}
          />
          <p className={theme.labelName}>{l.label}</p>
        </div>
        <p className={theme.labelValue}>{l.value}</p>
      </div>
    ))}
  </div>
);

Tooltip.propTypes = {
  label: PropTypes.any,
  tooltip: PropTypes.array
};

export default themr('Tooltip', theme)(Tooltip);
