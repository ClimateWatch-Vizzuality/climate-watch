/* eslint-disable max-len */
import React from 'react';
import Proptypes from 'prop-types';
import Header from 'components/header';
import Button from 'components/button';
import Intro from 'components/intro';
import { NET_ZERO } from 'data/SEO';
import { renderToString } from 'react-dom/server';
import { MetaDescription, SocialMetadata } from 'components/seo';

import layout from 'styles/layout.scss';
import styles from './net-zero-styles.scss';

const NetZero = ({ route }) => (
  <div>
    <MetaDescription descriptionContext={NET_ZERO} subtitle="LTS CONTENT" />
    <SocialMetadata descriptionContext={NET_ZERO} href={location.href} />
    <Header route={route}>
      <div className={layout.content}>
        <div className="grid-column-item">
          <div className={styles.headerLayout}>
            <Intro
              title="Net-Zero Tracker"
              description={renderToString(
                <React.Fragment>
                  <div className={styles.descriptionLine}>
                    To avoid the worst climate impacts, global greenhouse gas
                    (GHG) emissions will not only need to drop by half by 2030,
                    then reach net-zero around mid-century. Aside from
                    commitments made through NDCs and LTS, some Parties also
                    have already set net-zero emission targets. Net-zero targets
                    can be in a countries’ LTS or set in national laws and
                    policies and indicate Parties’ commitment to climate action
                    and may align with commitments under the Paris Agreement.
                  </div>
                  <div>
                    Explore net-zero target of countries, states, cities and
                    companies on the ECIU website:
                  </div>
                </React.Fragment>
              )}
            />
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              variant="primary"
              href="https://eciu.net/netzerotracker/map"
              target="_blank"
              className={styles.button}
            >
              Go to ECIU website
            </Button>
          </div>
        </div>
      </div>
    </Header>
    <div className={styles.wrapper}>
      {route.sections &&
        route.sections.length > 0 &&
        route.sections.map(section => (
          <div key={section.label} className={styles.section}>
            <div id={section.hash} className={styles.sectionHash} />
            <section.component />
          </div>
        ))}
    </div>
  </div>
);

NetZero.propTypes = {
  route: Proptypes.object.isRequired
};

export default NetZero;
