import React from 'react';
import cx from 'classnames';

import NoContent from 'components/no-content';
import layout from 'styles/layout.scss';
import styles from './error-styles.scss';

const Error = () => (
  <div className={cx(layout.content, styles.container)}>
    <NoContent
      message="Oops! We can't seem to find the page you are looking for."
      icon
    />
  </div>
);
export default Error;
