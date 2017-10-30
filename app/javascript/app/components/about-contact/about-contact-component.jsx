import React from 'react';
import styles from './about-contact-styles.scss';

const AboutContact = () => (
  <div className={styles.aboutContact}>
    <p>
      We’d love to hear from you. Please submit questions, comments or feedback
      to: <a href="mailto:ClimateWatch@WRI.org">ClimateWatch@WRI.org</a>
    </p>
    <p>
      Join our newsletter for updates and events on Climate Watch and other
      climate change related tools: [Submission form]
    </p>
  </div>
);

export default AboutContact;
