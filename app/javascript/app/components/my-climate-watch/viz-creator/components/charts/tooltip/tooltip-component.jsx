import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { themr } from 'react-css-themr';

import tooltipTheme from 'styles/themes/chart-tooltip/chart-tooltip.scss';

const Tooltip = ({ theme, label, legend, payload }) => (
  <div className={theme.tooltip}>
    <div className={theme.tooltipHeader}>
      <span className={cx(theme.labelName, theme.labelNameBold)}>{label}</span>
      <span
        className={theme.unit}
        // dangerouslySetInnerHTML={{ __html: unit }} // eslint-disable-line
      />
    </div>
    {legend.map((l, index) => (
      <div className={theme.legend} key={l.label}>
        <span className={theme.labelDot} style={{ backgroundColor: l.color }} />
        <span className={theme.labelName}>{l.label}</span>
        {payload &&
        payload.length && (
            <span className={theme.labelValue}>{payload[index].value}</span>
          )}
      </div>
    ))}
  </div>
);

Tooltip.propTypes = {
  theme: PropTypes.object,
  label: PropTypes.any,
  legend: PropTypes.array,
  payload: PropTypes.array
};

export default themr('Tooltip', tooltipTheme)(Tooltip);
