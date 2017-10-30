import React from 'react';
import styles from './about-contact-styles.scss';

const AboutContact = () => (
  <div className={styles.aboutContact}>
    <p>
      We’d love to hear from you. Please submit questions, comments or feedback
      to <a href="mailto:ClimateWatch@WRI.org">ClimateWatch@WRI.org</a>
    </p>
    <h3>Join Climate Watch</h3>
    <p>
      Join the growing Climate Watch community of contributing users to the
      platform’s growing set of data. Fill out the submission form for resources
      to be included: our newsletter for updates and events on Climate Watch and
      other climate change related tools.
    </p>
    <iframe
      title="contact-form"
      className={styles.contactIframe}
      src="http://connect.wri.org/l/120942/2017-09-11/3khdjq"
      frameBorder="0"
    />
  </div>
);

export default AboutContact;
