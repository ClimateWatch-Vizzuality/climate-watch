/* eslint-disable max-len */
import React from 'react';
import Proptypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import { LTS_EXPLORE } from 'data/SEO';
import { MetaDescription, SocialMetadata } from 'components/seo';

import layout from 'styles/layout.scss';
import styles from './lts-explore-styles.scss';

const LTSExplore = ({ route }) => (
  <div>
    <MetaDescription descriptionContext={LTS_EXPLORE} subtitle="LTS CONTENT" />
    <SocialMetadata descriptionContext={LTS_EXPLORE} href={location.href} />
    <Header route={route}>
      <div className={layout.content}>
        <div className="grid-column-item">
          <div className={styles.headerLayout}>
            <Intro
              title="Explore National determined Contributions (LTS)"
              description="Under the Paris Agreement, nearly every nation made a commitment to tackle climate change and strengthen their efforts over time. Explore the content of these nationally determined contributions (NDCs) by searching for key terms. You can analyze and compare NDCs using over 150 structured indicators."
            />
          </div>
        </div>
      </div>
    </Header>
    <div className={styles.wrapper}>
      <div className={styles.wrapper}>
        <div className={layout.content}>
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
    </div>
  </div>
);

LTSExplore.propTypes = {
  route: Proptypes.object.isRequired
};

export default LTSExplore;
