import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';

import SDGCard from 'components/sdg-card';
import ReactTooltip from 'react-tooltip';
import NoContent from 'no-content';

import styles from './country-ndc-sdg-linkages-styles.scss';

class CountrySDGLinkages extends PureComponent {
  render() {
    const { sdgs } = this.props;
    return (
      <div>
        <h3 className={styles.title}>NDC-SDG Linkages</h3>
        <div className={styles.sdgs}>
          {sdgs &&
            Object.keys(sdgs).map(sdg => (
              <div key={sdgs[sdg].title} className={styles.card}>
                <SDGCard sdgIndex={sdg} sdgData={sdgs[sdg]} indicators />
                <ReactTooltip />
              </div>
            ))}
          {!sgds && <NoContent message="No SDG data available" />}
        </div>
        <ReactTooltip />
      </div>
    );
  }
}

CountrySDGLinkages.propTypes = {
  sdgs: Proptypes.object
};

export default CountrySDGLinkages;
