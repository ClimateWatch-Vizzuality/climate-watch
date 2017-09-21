import React from 'react';
import cx from 'classnames';

import NoContent from 'components/no-content';
import layout from 'styles/layout.scss';
import styles from './error-styles.scss';

const Error = () => (
  <div className={cx(layout.content, styles.container)}>
    <NoContent message="Oops that page does not exist" icon />
  </div>
);
export default Error;
