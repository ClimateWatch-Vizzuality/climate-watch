import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './loading-styles.scss';

class Loading extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div
        className={cx(styles.container, this.props.className)}
        style={{ height: this.props.height }}
      >
        <div
          className={cx(styles.loader, {
            [styles.loaderMini]: this.props.mini
          })}
        >
          <span className={styles.loaderTrack} />
          <span className={styles.loaderLight} />
        </div>
      </div>
    );
  }
}

Loading.propTypes = {
  className: PropTypes.string,
  height: PropTypes.any,
  mini: PropTypes.bool
};

Loading.defaultProps = {
  height: 'auto',
  mini: false
};

export default Loading;
