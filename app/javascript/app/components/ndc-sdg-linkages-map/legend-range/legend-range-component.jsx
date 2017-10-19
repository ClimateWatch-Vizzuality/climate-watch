import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './legend-range-styles.scss';

class LegendRange extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const colour = this.props.colour || '#e5243b';
    const rangeStyle = {
      backgroundImage: `linear-gradient(to bottom, ${colour}, #fff)`
    };
    return (
      <div className={cx(styles.container, this.props.className)}>
        <span className={styles.startPoint} />
        <span className={styles.range} style={rangeStyle} />
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
  colour: PropTypes.string,
  className: PropTypes.string
};

export default LegendRange;
