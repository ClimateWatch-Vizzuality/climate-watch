import React from 'react';
import PropTypes from 'prop-types';
import Tag from 'components/tag';
import cx from 'classnames';

import styles from './legend-styles';

const LegendComponent = ({ className, data = [] }) => (
  <div className={cx(className, styles.legend)}>
    <ul className={styles.tags}>
      {data.map(l => (
        <li key={l.label} className={styles.tagItem}>
          <Tag
            className={styles.tag}
            label={l.label}
            color={l.color}
          />
        </li>
      ))}
    </ul>
  </div>
);

LegendComponent.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array
};

export default LegendComponent;
