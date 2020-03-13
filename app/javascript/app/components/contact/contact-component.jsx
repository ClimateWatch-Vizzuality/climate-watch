import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import Icon from 'components/icon';
import contactIcon from 'assets/icons/contact.svg';

import styles from './contact-styles.scss';

const Contact = ({ className }) => (
  <div className={cx(styles.contactContainer, className)}>
    <a className={styles.contact} href="mailto:climatewatch@wri.org">
      Contact us
    </a>
    <Icon icon={contactIcon} />
  </div>
);

Contact.propTypes = {
  className: PropTypes.string
};

export default Contact;
