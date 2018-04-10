import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { themr } from 'react-css-themr';
import { format } from 'd3-format';
import theme from 'styles/themes/chart-tooltip/chart-tooltip.scss';

const sortByValue = payload => {
  const compare = (a, b) => b.value - a.value;
  return payload.sort(compare);
};

const Tooltip = ({ label, tooltip, payload, sort }) => (
  <div className={theme.tooltip}>
    <div className={theme.tooltipHeader}>
      <span className={cx(theme.labelName, theme.labelNameBold)}>{label}</span>
      <span className={theme.unit}>{tooltip.unit}</span>
    </div>
    {payload &&
      payload.length &&
      (sort ? sortByValue(payload) : payload.reverse()).map(v => (
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
          <p className={theme.labelValue}>{format('.3f')(v.value)}</p>
        </div>
      ))}
  </div>
);

Tooltip.propTypes = {
  label: PropTypes.any,
  tooltip: PropTypes.object,
  payload: PropTypes.array,
  sort: PropTypes.bool.isRequired
};

Tooltip.defaultProps = {
  sort: false
};

export default themr('Tooltip', theme)(Tooltip);
