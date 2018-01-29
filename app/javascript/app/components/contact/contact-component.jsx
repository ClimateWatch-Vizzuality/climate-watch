import React from 'react';
import cx from 'classnames';

import Icon from 'components/Icon';
import contactIcon from 'assets/icons/contact.svg';

import styles from './contact-styles.scss';

const contact = () => (
  <div className={cx(styles.contactContainer)}>
    <a className={styles.contact} href="mailto:climatewatch@wri.org">
      CONTACT US
    </a>
    <Icon icon={contactIcon} />
  </div>
);

export default contact;
