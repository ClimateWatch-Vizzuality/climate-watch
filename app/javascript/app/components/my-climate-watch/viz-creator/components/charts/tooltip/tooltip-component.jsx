import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { themr } from 'react-css-themr';

import theme from 'styles/themes/chart-tooltip/chart-tooltip.scss';

const Tooltip = ({ label, tooltip, payload }) => (
  <div className={theme.tooltip}>
    <div className={theme.tooltipHeader}>
      <span className={cx(theme.labelName, theme.labelNameBold)}>{label}</span>
      <span className={theme.unit}>{tooltip[0].unit}</span>
    </div>
    {tooltip.map((l, i) => (
      <div className={theme.label} key={l.label}>
        <div className={theme.legend}>
          <span
            className={theme.labelDot}
            style={{ backgroundColor: l.color }}
          />
          <p className={theme.labelName}>{l.label}</p>
        </div>
        {l.value ? <p className={theme.labelValue}>{l.value}</p> : null}
        {!l.value &&
        payload.length &&
        payload.length > 1 && (
            <p className={theme.labelValue}>{payload[i].value}</p>
          )}
        {!l.value &&
        payload.length &&
        payload.length === 1 && (
            <p className={theme.labelValue}>{payload[0].value}</p>
          )}
      </div>
    ))}
  </div>
);

Tooltip.propTypes = {
  label: PropTypes.any,
  tooltip: PropTypes.array,
  payload: PropTypes.array
};

export default themr('Tooltip', theme)(Tooltip);
