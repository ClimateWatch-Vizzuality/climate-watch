import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { themr } from 'react-css-themr';

import theme from 'styles/themes/chart-tooltip/chart-tooltip.scss';

const sortByValue = payload => {
  const compare = (a, b) => b.value - a.value;
  return payload.sort(compare);
};

const Tooltip = ({ label, tooltip, payload }) => (
  <div className={theme.tooltip}>
    <div className={theme.tooltipHeader}>
      <span className={cx(theme.labelName, theme.labelNameBold)}>{label}</span>
      <span className={theme.unit}>{tooltip.unit}</span>
    </div>
    {payload &&
      payload.length &&
      sortByValue(payload).map(v => (
        <div className={theme.label} key={v.name}>
          <div className={theme.legend}>
            <span
              className={theme.labelDot}
              style={
                v.color ? (
                  { backgroundColor: v.color }
                ) : (
                  { backgroundColor: v.payload.fill }
                )
              }
            />
            <p className={theme.labelName}>
              {tooltip.pie ? v.name : tooltip.names[0][v.name]}
            </p>
          </div>
          <p className={theme.labelValue}>{v.value}</p>
        </div>
      ))}
  </div>
);

Tooltip.propTypes = {
  label: PropTypes.any,
  tooltip: PropTypes.object,
  payload: PropTypes.array
};

export default themr('Tooltip', theme)(Tooltip);
