import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './legend-steps-styles.scss';

class LegendSteps extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const stepStyles = { backgroundColor: this.props.colour };
    return (
      <div className={cx(styles.container, this.props.className)}>
        <ul className={styles.steps}>
          <li>
            {' '}
            <span className={styles.stepsIcon} style={stepStyles} /> Target
            linked
          </li>
          <li>
            {' '}
            <span className={styles.stepsIcon} />Not linked
          </li>
        </ul>
      </div>
    );
  }
}

LegendSteps.propTypes = {
  colour: PropTypes.string,
  className: PropTypes.string
};

export default LegendSteps;
