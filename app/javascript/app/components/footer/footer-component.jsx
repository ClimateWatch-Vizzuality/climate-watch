import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import BottomBar from 'components/footer/bottom-bar';
import SiteMap from 'components/footer/site-map-footer';
import Contact from 'components/contact';

import layout from 'styles/layout.scss';
import styles from './footer-styles.scss';

class Footer extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      partners,
      includePartners,
      includeContact,
      includeBottom,
      isContained
    } = this.props;
    return (
      <footer>
        {!isContained && <SiteMap />}
        {includePartners && (
          <div
            className={cx(styles.border, { [styles.isContained]: isContained })}
          >
            <div className={cx(layout.content, styles.nav)}>
              <div className={styles.partners}>
                <span className={styles.partnersHeadline}>
                  {isContained ? 'Data contributed by' : 'Partners'}
                </span>
              </div>
              <div className="grid-column-item">
                <div className={styles.contentWrapper}>
                  <div className="grid-column-item">
                    <div className={styles.partnersContainer}>
                      {partners.map(
                        partner =>
                          partner.img && (
                            <div
                              key={partner.img.alt}
                              className={styles.logoContainer}
                            >
                              <a
                                className={cx(
                                  styles.logo,
                                  styles[partner.img.customClass] ||
                                    styles.defaultLogo
                                )}
                                href={partner.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img
                                  src={partner.img.src}
                                  alt={partner.img.alt}
                                />
                              </a>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                  {includeContact && <Contact />}
                </div>
              </div>
            </div>
          </div>
        )}
        {includeBottom && <BottomBar className={layout.content} />}
      </footer>
    );
  }
}

Footer.propTypes = {
  partners: PropTypes.array.isRequired,
  includePartners: PropTypes.bool,
  includeContact: PropTypes.bool,
  includeBottom: PropTypes.bool,
  isContained: PropTypes.bool
};

Footer.defaultProps = {
  includePartners: true,
  includeContact: true,
  includeBottom: true,
  isContained: false
};

export default Footer;
