import React from 'react';
import Proptypes from 'prop-types';
import layout from 'styles/layout.scss';
import Header from 'components/header';
import Intro from 'components/intro';
import { SEO_PAGES } from 'data/seo';
import SEOTags from 'components/seo-tags';
import { renderRoutes } from 'react-router-config';
import styles from './ndc-overview-styles.scss';

const NdcOverview = ({ route }) => (
  <div>
    <SEOTags page={SEO_PAGES.ndcOverview} href={location.href} />
    <Header route={route}>
      <div className={layout.content}>
        <div className="grid-column-item">
          <div className={styles.headerLayout}>
            <Intro
              title="Overview"
              description="The Paris Agreement aims to limit global temperature rise to well below 2°C and to pursue efforts to further limit it to 1.5°C. Progress toward this goal comes from countries, which came together in 2015, each submitting individual contributions toward mitigation and/ or adaptation that should be strengthened over time. Importantly, these commitments are only the first step in the process that continues with implementation – here we only track submission of commitments and targets, but not implementation."
            />
          </div>
        </div>
      </div>
    </Header>
    {renderRoutes(route.routes)}
  </div>
);

NdcOverview.propTypes = {
  route: Proptypes.object.isRequired
};

export default NdcOverview;
