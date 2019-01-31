import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'cw-components';
import { get } from 'lodash';

import { format } from 'd3-format';

import styles from './tooltip-styles.scss';

const Tooltip = ({ content, config }) => {
  const payload = get(content, 'payload[0].payload');
  const name = get(payload, 'data.name') || '';
  const value = payload && payload.value;
  const percentageValue = get(payload, 'data.percentageValue') || '';

  const color = get(config, `theme[${name}].stroke`) || '';
  const unit = get(config, 'axes.yLeft.unit') || '';
  const formattedValue = `${format('.2s')(value)}`;
  const formattedPercentage = `${format('.2f')(percentageValue)}`;

  return (
    <div className={styles.tooltip}>
      <Tag
        key="agr"
        label={name}
        theme={{
          tag: styles.tag
        }}
        canRemove={false}
        color={color}
      />
      <div className={styles.value}>
        {formattedValue} {unit}
      </div>
      <div className={styles.value}>{formattedPercentage}%</div>
    </div>
  );
};

Tooltip.propTypes = {
  content: PropTypes.object.isRequired,
  config: PropTypes.object
};

export default Tooltip;
