import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import layout from 'styles/layout.scss';
import styles from './thank-you-styles.scss';

const ThankYou = () => (
  <div className={cx(layout.content, styles.container)}>
    <div className={styles.content}>
      <h1 className={styles.title}>Thank you!</h1>
      <p>Thank you for subscribing to Climate Watch updates.</p>
      <p>
        <Link to={'/about/contact'} className={styles.link}>
          Click here
        </Link>{' '}
        if you want to subscribe with a different email.
      </p>
    </div>
  </div>
);
export default ThankYou;
