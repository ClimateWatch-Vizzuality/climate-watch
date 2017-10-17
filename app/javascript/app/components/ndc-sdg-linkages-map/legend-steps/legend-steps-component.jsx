import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './legend-steps-styles.scss';

class LegendSteps extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={cx(styles.container, this.props.className)}>
        <ul className={styles.steps}>
          <li>Target linked</li>
          <li>Not linked</li>
        </ul>
      </div>
    );
  }
}

LegendSteps.propTypes = {
  className: PropTypes.string
};

export default LegendSteps;
