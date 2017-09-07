import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';

import SDGCard from 'components/sdg-card';
import ReactTooltip from 'react-tooltip';

import styles from './country-ndc-sdg-linkages-styles.scss';

const sdgTest = {
  index: '1',
  title: 'No poverty',
  color: 'red',
  sections: [
    {
      number: 1.1,
      title:
        'By 2030, eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day',
      sectors: [77, 76, 75]
    },
    {
      number: 1.2,
      title:
        'By 2030, reduce at least by half the proportion of men, women and children of all ages living in poverty in all its dimensions according to national definitions'
    }
  ]
};

class CountrySDGLinkages extends PureComponent {
  render() {
    const { sdgs } = this.props;
    return (
      <div className={styles.sdgs}>
        <h3 className={styles.title}>NDC-SDG Linkages</h3>
        <div className={styles.threeFold}>
          {sdgs &&
            Object.keys(sdgs).map(sdg => (
              <SDGCard key={sdg.title} sdg={sdgTest} indicators />
            ))}
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
