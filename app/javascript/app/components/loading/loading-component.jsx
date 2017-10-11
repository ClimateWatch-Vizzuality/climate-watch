import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './loading-styles.scss';

class Loading extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const className = cx(styles.container, {
      [styles.light]: this.props.light
    });
    return (
      <div className={className}>
        <div className={styles.loader}>
          <span className={styles.loaderTrack} />
          <span className={styles.loaderLight} />
        </div>
      </div>
    );
  }
}

Loading.propTypes = {
  light: PropTypes.bool
};

export default Loading;
