import React, { PureComponent } from 'react';

import styles from './ndc-translation-disclaimer-styles.scss';

class NdcTranslationDisclaimer extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.disclaimer}>
        Please note the following text has been translated for the purposes of
        Climate Watch using an automated service (Google Translate). This text
        has no status whatsoever under the UNFCCC, nor does it purport to be an
        official or unofficial version of the INDC or NDC communicated by the
        Party to the Registry. This text is for informational purposes only and
        should not be treated as an official INDC or NDC and should not be cited
        or referenced without this disclaimer.
      </div>
    );
  }
}

export default NdcTranslationDisclaimer;
