import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './legend-range-styles.scss';

class LegendRange extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={cx(styles.container, this.props.className)}>
        <span className={styles.startPoint} />
        <span className={styles.range} />
        <ul className={styles.scale}>
          <li>All targets linked</li>
          <li>Some tagets linked</li>
          <li>Not linked</li>
        </ul>
      </div>
    );
  }
}

LegendRange.propTypes = {
  className: PropTypes.string
};

export default LegendRange;
