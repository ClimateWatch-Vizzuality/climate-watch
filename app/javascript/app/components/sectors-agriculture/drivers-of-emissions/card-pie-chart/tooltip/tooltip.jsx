import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'cw-components';
import { has } from 'lodash';
import styles from './tooltip-styles.scss';

const Tooltip = ({ content }) => {
  const color = has(content, 'payload[0].payload.fill')
    ? content.payload[0].payload.fill
    : '';
  const payload =
    has(content, 'payload[0].payload.payload') &&
    content.payload[0].payload.payload;
  const sector = payload ? payload.sector : '';
  const formattedValue = payload ? payload.formattedValue : '';
  const formattedPercentage = payload ? payload.formattedPercentage : '';

  return (
    <div className={styles.tooltip}>
      <Tag
        key="agr"
        label={sector}
        theme={{
          tag: styles.tag
        }}
        canRemove={false}
        color={color}
      />
      <span className={styles.value}>
        {`${formattedPercentage} (${formattedValue} `}
        <span>
          MtCO<sub>2</sub>
        </span>)
      </span>
    </div>
  );
};

Tooltip.propTypes = {
  content: PropTypes.object
};

export default Tooltip;
