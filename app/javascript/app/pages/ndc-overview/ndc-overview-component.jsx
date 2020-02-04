import React from 'react';
import Proptypes from 'prop-types';
import layout from 'styles/layout.scss';
import Header from 'components/header';
import Intro from 'components/intro';
import { NDCS_OVERVIEW } from 'data/SEO';
import { MetaDescription, SocialMetadata } from 'components/seo';
import { renderRoutes } from 'react-router-config';
import ModalMetadata from 'components/modal-metadata';
import styles from './ndc-overview-styles.scss';

const NdcOverview = ({ route }) => (
  <div>
    <MetaDescription
      descriptionContext={NDCS_OVERVIEW}
      subtitle="NDC OVERVIEW"
    />
    <SocialMetadata descriptionContext={NDCS_OVERVIEW} href={location.href} />
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
    <ModalMetadata />
  </div>
);

NdcOverview.propTypes = {
  route: Proptypes.object.isRequired
};

export default NdcOverview;
