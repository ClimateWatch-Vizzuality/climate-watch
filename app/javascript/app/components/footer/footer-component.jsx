import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import BottomBar from 'components/footer/bottom-bar';
import Contact from 'components/contact';

import layout from 'styles/layout.scss';
import styles from './footer-styles.scss';

class Footer extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { partners } = this.props;
    const className = cx(styles.footer, styles.border);
    return (
      <footer className={className}>
        <div className={cx(styles.row, styles.nav)}>
          <div className={styles.partnersContainer}>
            {partners.map(
              partner =>
                partner.img && (
                  <a
                    key={partner.img.alt}
                    className={
                      styles[partner.img.customClass] || styles.logoContainer
                    }
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={partner.img.src} alt={partner.img.alt} />
                  </a>
                )
            )}
          </div>
          <Contact />
        </div>
        <BottomBar className={layout.content} />
      </footer>
    );
  }
}

Footer.propTypes = {
  partners: PropTypes.array.isRequired
};

export default Footer;
