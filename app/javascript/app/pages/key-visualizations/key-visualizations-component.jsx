import React from 'react';
import Proptypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import { MetaDescription, SocialMetadata } from 'components/seo/seo';
import { KEY_VISUALIZATIONS } from 'data/SEO';
import { isPageContained } from 'utils/navigation';

import layout from 'styles/layout.scss';
import styles from './key-visualizations-styles.scss';

const KeyVisualizations = ({ route }) => (
  <div>
    <MetaDescription
      descriptionContext={KEY_VISUALIZATIONS}
      subtitle="KEY VISUALIZATIONS"
    />
    <SocialMetadata
      descriptionContext={KEY_VISUALIZATIONS}
      href={location.href}
    />
    {!isPageContained && (
      <Header route={route}>
        <div className={layout.content}>
          <div className="grid-column-item">
            <div className={styles.headerLayout}>
              <Intro title="Key Visualizations" />
            </div>
          </div>
        </div>
      </Header>
    )}
  </div>
);

KeyVisualizations.propTypes = {
  route: Proptypes.object.isRequired
};

export default KeyVisualizations;
