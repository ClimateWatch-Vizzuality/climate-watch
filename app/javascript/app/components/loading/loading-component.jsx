import React, { PureComponent } from 'react';

import styles from './loading-styles.scss';

class Loading extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.loader}>
        <span className={styles.loaderTrack} />
        <span className={styles.loaderLight} />
      </div>
    );
  }
}

Loading.propTypes = {};

export default Loading;
