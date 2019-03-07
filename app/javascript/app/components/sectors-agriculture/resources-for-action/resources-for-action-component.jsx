import React, { PureComponent } from 'react';

// logos
import faostatLogo from 'assets/partners/partners-FAOSTAT.png';
import cgiarLogo from 'assets/partners/partners-CGIAR.png';
import resourcewatchLogo from 'assets/partners/partners-resourcewatch.png';
import gaezLogo from 'assets/partners/partners-GAEZ.png';
import gizLogo from 'assets/partners/giz.png';
import resilienceLogo from 'assets/partners/partners-partnership-on-resilience.png';

import styles from './resources-for-action-styles.scss';

const partners = [
  {
    img: faostatLogo,
    link: 'http://www.fao.org/faostat/en/',
    title: 'FAOSTAT',
    description:
      'FAOSTAT provides free access to food and agriculture data for over 245 countries and territories from 1961 to the most recent year available.'
  },
  {
    img: cgiarLogo,
    link: 'https://www.cgiar.org/',
    title: 'CGIAR',
    description:
      'The CGIAR Research Program on Climate Change, Agriculture and Food Security (CCAFS) provides research, data and tools.'
  },
  {
    img: resourcewatchLogo,
    link: 'https://resourcewatch.org/',
    title: 'Resource Watch',
    description:
      'Resource Watch features hundreds of data sets all in one place on the state of the planet’s resources and citizens. Users can visualize challenges facing people and the planet, from climate change to food.'
  },
  {
    img: resilienceLogo,
    link: 'https://prepdata.org/',
    title: 'The Partnership for Resilience & Preparedness',
    description:
      'The Partnership for Resilience and Preparedness seeks to improve access to useful data and empower communities and businesses to better plan for and build climate resilience.'
  },
  {
    img: gizLogo,
    link: 'https://www.giz.de/en/html/index.html',
    title: 'GIZ',
    description:
      'GIZ provides a series of briefing papers discussing the sectoral implementation of nationally determined contributions (NDCs).'
  },
  {
    img: gaezLogo,
    link: 'http://www.fao.org/nr/gaez/en/',
    title: 'Global Agro-Ecological Zones',
    description:
      'Global Ago-Ecological Zones provides data on land and water resources, agro-climatic resources, crop yields, and other pertinent data.'
  }
];

class ResourcesForAction extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <div className={styles.page}>
          <h3 className={styles.title}>Resources for Action</h3>
          <div className={styles.descriptionWrapper}>
            <span className={styles.description}>
              To plan and implement actions, countries need the right financial
              support and tools. Explore highlighted resources from our partners
              below.
            </span>
          </div>
          <div className={styles.logosContainer}>
            {partners.map(partner => (
              <div key={partner.title} className={styles.partnerWrapper}>
                <a
                  href={partner.link}
                  target="_blank"
                  className={styles.imgContainer}
                >
                  <img src={partner.img} alt={partner.title} />
                </a>
                <p className={styles.partnerDescription}>
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ResourcesForAction;
