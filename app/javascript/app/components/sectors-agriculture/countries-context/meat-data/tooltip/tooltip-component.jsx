import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'cw-components';
import { get } from 'lodash';

import { format } from 'd3-format';

import styles from './tooltip-styles.scss';

const Tooltip = ({ content, config }) => {
  const payload = get(content, 'payload[0].payload');
  const category = (payload && payload.x) || '';
  const isCountrySelected = payload && payload.yCountry;
  const isOtherCountriesSelected = payload && payload.yOthers;

  const countryValue = (payload && payload.yCountry) || 'n/a';
  const otherCountriesValue = (payload && payload.yOthers) || 'n/a';

  const countryName = get(config, 'tooltip.yCountry.label');
  const othersName = get(config, 'tooltip.yOthers.label');

  const countryColor = get(config, 'theme.yCountry.stroke') || '';
  const othersColor = get(config, 'theme.yOthers.stroke') || '';
  const unit = get(config, 'axes.yLeft.unit') || '';

  return (
    <div className={styles.tooltip}>
      <div className={styles.category}>{category}</div>
      <p className={styles.info}>
        {isCountrySelected && (
          <React.Fragment>
            <Tag
              key="countryAgr"
              label={countryName}
              theme={{
                tag: styles.tag,
                label: styles.label
              }}
              canRemove={false}
              color={countryColor}
            />
            <div className={styles.value}>
              {format('.2s')(countryValue)} {unit}
            </div>
          </React.Fragment>
        )}
      </p>
      <p className={styles.info}>
        {isOtherCountriesSelected && (
          <React.Fragment>
            <Tag
              key="othersAgr"
              label={othersName}
              theme={{
                tag: styles.tag,
                label: styles.label
              }}
              canRemove={false}
              color={othersColor}
            />
            <div className={styles.value}>
              {format('.2s')(otherCountriesValue)} {unit}
            </div>
          </React.Fragment>
        )}
      </p>
    </div>
  );
};

Tooltip.propTypes = {
  content: PropTypes.object.isRequired,
  config: PropTypes.object
};

export default Tooltip;
