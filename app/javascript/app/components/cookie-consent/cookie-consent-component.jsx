import React, { PureComponent } from 'react';
import cx from 'classnames';

import Button from 'components/button';
import styles from './cookie-consent-styles';

const COOKIE_BANNER_KEY = 'closed_cookie_banner';

const cookieConsentText =
  'This website uses cookies to provide you with an improved user experience. By continuing to browse this site, you consent to the use of cookies and similar technologies. For further detailes, please visit our ';
const privacyPolicyLink = 'https://www.wri.org/about/privacy-policy';

class CookieConsent extends PureComponent {
  constructor() {
    super();
    this.state = {
      isCookieConsentAccepted: JSON.parse(
        localStorage.getItem(COOKIE_BANNER_KEY)
      )
    };
  }

  handleClick = () => {
    this.setState({ isCookieConsentAccepted: true });
    localStorage.setItem(COOKIE_BANNER_KEY, 'true');
  };

  render() {
    const { isCookieConsentAccepted } = this.state;
    return (
      <div
        className={cx(styles.container, {
          [styles.containerHidden]: isCookieConsentAccepted
        })}
      >
        <span>
          {cookieConsentText}{' '}
          <a className={styles.link} href={privacyPolicyLink}>
            privacy policy
          </a>.
        </span>
        <Button className={styles.button} onClick={this.handleClick}>
          Ok, got it
        </Button>
      </div>
    );
  }
}

export default CookieConsent;
