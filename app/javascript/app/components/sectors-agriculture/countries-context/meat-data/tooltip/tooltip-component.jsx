import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'cw-components';
import { get } from 'lodash';

import { format } from 'd3-format';

import styles from './tooltip-styles.scss';

const Tooltip = ({ content, config }) => {
  const payload = get(content, 'payload[0].payload');
  const category = (payload && payload.x) || '';

  const countryValue = payload && payload.yCountry;
  const otherCountriesValue = payload && payload.yOthers;

  const countryName = get(config, 'tooltip.yCountry.label');
  const othersName = get(config, 'tooltip.yOthers.label');

  const countryColor = get(config, 'theme.yCountry.stroke') || '';
  const othersColor = get(config, 'theme.yOthers.stroke') || '';
  const unit = get(config, 'axes.yLeft.unit') || '';

  const renderTag = (label, color) => (
    <Tag
      key={label}
      label={label}
      theme={{
        tag: styles.tag,
        label: styles.label
      }}
      canRemove={false}
      color={color}
    />
  );

  return (
    <div className={styles.tooltip}>
      <div className={styles.category}>{category}</div>
      <p className={styles.info}>
        {renderTag(countryName, countryColor)}
        <div className={styles.value}>
          {countryValue ? `${format(',.2f')(countryValue)} ${unit}` : 'n/a'}
        </div>
      </p>
      <p className={styles.info}>
        {renderTag(othersName, othersColor)}
        <div className={styles.value}>
          {otherCountriesValue ? (
            `${format(',.2f')(otherCountriesValue)} ${unit}`
          ) : (
            'n/a'
          )}
        </div>
      </p>
    </div>
  );
};

Tooltip.propTypes = {
  content: PropTypes.object.isRequired,
  config: PropTypes.object
};

export default Tooltip;
