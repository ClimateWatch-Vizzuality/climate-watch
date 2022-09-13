import React, { useState } from 'react';
import cx from 'classnames';
import layout from 'styles/layout';
import Loading from 'components/loading';
import { SEO_PAGES } from 'data/seo';
import { PropTypes } from 'prop-types';
import SEOTags from 'components/seo-tags';

import styles from './about-contact-styles.scss';

const AboutContact = ({ location }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  return (
    <div className={cx(styles.aboutContact, layout.content)}>
      <SEOTags page={SEO_PAGES.aboutContact} href={location.href} />
      <p>
        We’d love to hear from you. Please submit questions, comments or
        feedback to{' '}
        <a href="mailto:ClimateWatch@WRI.org">ClimateWatch@WRI.org</a>
      </p>
      <h3>Sign Up for Updates</h3>
      <p>
        Subscribe to our newsletter for updates and events on Climate Watch and
        other climate-related tools.
      </p>
      {!iframeLoaded && <Loading light className={styles.loader} />}
      <iframe
        onLoad={() => setIframeLoaded(true)}
        title="contact-form"
        id="contact-form"
        className={styles.contactIframe}
        src="//connect.wri.org/l/120942/2017-09-11/3khdjq"
        frameBorder="0"
      />
    </div>
  );
};

AboutContact.propTypes = {
  location: PropTypes.object
};

export default AboutContact;
