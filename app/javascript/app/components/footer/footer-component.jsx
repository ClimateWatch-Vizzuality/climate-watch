import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Nav from 'components/nav';
import Initiators from 'components/footer/initiators';
import BottomBar from 'components/footer/bottom-bar';
import Icon from 'components/icon';

import contactIcon from 'assets/icons/contact.svg';
import layout from 'styles/layout.scss';
import styles from './footer-styles.scss';

class Footer extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { routes } = this.props;
    return (
      <footer className={styles.footer}>
        <Initiators className={layout.content} />
        <div className={cx(layout.content, styles.nav)}>
          <Nav routes={routes} hideLogo />
          <div className={styles.contactContainer}>
            <a
              className={styles.contact}
              href="mailto:climatewatch@ndcpartnership.org"
            >
              CONTACT US
            </a>
            <Icon icon={contactIcon} />
          </div>
        </div>
        <BottomBar className={layout.content} />
      </footer>
    );
  }
}

Footer.propTypes = {
  routes: PropTypes.array.isRequired
};

export default Footer;
