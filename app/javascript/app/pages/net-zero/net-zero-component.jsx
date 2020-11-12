/* eslint-disable max-len */
import React from 'react';
import Proptypes from 'prop-types';
import Header from 'components/header';
import Button from 'components/button';
import Intro from 'components/intro';
import { SEO_PAGES } from 'data/SEO';
import { renderToString } from 'react-dom/server';
import SEO from 'components/seo';

import layout from 'styles/layout.scss';
import styles from './net-zero-styles.scss';

const NetZero = ({ route }) => (
  <div>
    <SEO page={SEO_PAGES.netZero} href={location.href} />
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
                    (GHG) emissions must be slashed in half during the next
                    decade and reach net-zero early in the second half of the
                    century. Given this need, a growing number of Parties to the
                    Paris Agreement have adopted net-zero emissions targets.
                    Net-zero targets can be communicated in a country’s
                    Nationally Determined Contribution (NDC), Long-term Low GHG
                    Emissions Development Strategy (LTS), or set in national
                    laws and policies in order to drive Parties’ commitment to
                    climate action.
                  </div>
                  <div>
                    Explore net-zero targets that have been formally adopted by
                    countries here.
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
