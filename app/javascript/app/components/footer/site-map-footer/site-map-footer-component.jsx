import React from 'react';
import { Icon } from 'cw-components';
import cwLogo from 'assets/icons/cw-logo.svg';

import { siteMapData } from './site-map-footer-data';

import styles from './site-map-footer-styles';

const Component = () => (
  <section className={styles.siteMapContainer}>
    <div className={styles.contentWrapper}>
      <div className={styles.link}>
        <Icon theme={{ icon: styles.logo }} icon={cwLogo} />
      </div>
      <div>
        <div className={styles.sectionsContainer}>
          {siteMapData.map(section => (
            <div className={styles.sectionWrapper}>
              <h4 className={styles.sectionHeader}>{section.title}</h4>
              <ul className={styles.linksList}>
                {section.links.map(l => (
                  <li>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      {l.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Component;
