import React, { PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import KeyVisualizationsTable from 'components/key-visualizations/key-visualizations-table';
import { MetaDescription, SocialMetadata } from 'components/seo/seo';
import { KEY_VISUALIZATIONS } from 'data/SEO';
import { isPageContained } from 'utils/navigation';

import layout from 'styles/layout.scss';
import styles from './key-visualizations-styles.scss';

class KeyVisualizations extends PureComponent {
  render() {
    const { route } = this.props;

    return (
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
            <div className={cx(layout.content, styles.header)}>
              <Intro title="Key Visualizations" />
            </div>
          </Header>
        )}
        <div className={styles.wrapper}>
          <div className={layout.content}>
            <KeyVisualizationsTable />
          </div>
        </div>
      </div>
    );
  }
}

KeyVisualizations.propTypes = {
  route: PropTypes.object.isRequired
};

export default KeyVisualizations;
