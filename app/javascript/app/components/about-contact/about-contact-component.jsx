import React from 'react';
import styles from './about-contact-styles.scss';

const AboutContact = () => (
  <div className={styles.aboutContact}>
    <p>
      We’d love to hear from you. Please submit questions, comments or feedback
      to <a href="mailto:ClimateWatch@WRI.org">ClimateWatch@WRI.org</a>
    </p>
    <h3>Sign Up for Updates</h3>
    <p>
      <a
        href="http://connect.wri.org/l/120942/2017-09-11/3khdjq"
        target="_blank"
        className={styles.link}
        rel="noopener noreferrer"
      >
        Subscribe to our newsletter
      </a>{' '}
      for updates and events on Climate Watch and other climate-related tools.
    </p>
  </div>
);

export default AboutContact;
