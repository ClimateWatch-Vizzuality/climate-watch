import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import NdcsSdgsMetaProvider from 'providers/ndcs-sdgs-meta-provider';

import Header from 'components/header';
import Intro from 'components/intro';
import AutocompleteSearch from 'components/autocomplete-search';
import NdcSdgLinkagesContent from 'components/ndc-sdg/ndc-sdg-linkages-content';
import { NDC_SDG_LINKAGES } from 'data/SEO';
import { MetaDescription, SocialMetadata } from 'components/seo';

import layout from 'styles/layout';
import headerTheme from 'styles/themes/header';
import styles from './ndc-sdg-styles';

class NdcSdg extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { route } = this.props;
    return (
      <div className={styles.bg}>
        <MetaDescription
          descriptionContext={NDC_SDG_LINKAGES}
          subtitle="NDC-SDG Linkages"
        />
        <SocialMetadata
          descriptionContext={NDC_SDG_LINKAGES}
          href={location.href}
        />
        <NdcsSdgsMetaProvider />
        <Header size="small" route={route}>
          <div className={layout.content}>
            <div className={headerTheme.headerGrid}>
              <Intro
                title="NDC-SDG Linkages"
                description={`Identify potential alignment between the targets, actions, policies measures and needs in countries
                ’Nationally Determined Contributions (NDCs) and the targets of the Sustainable Development Goals (SDGs).`}
              />
              <AutocompleteSearch />
            </div>
          </div>
        </Header>
        <div className={styles.wrapper}>
          <NdcSdgLinkagesContent />
        </div>
      </div>
    );
  }
}

NdcSdg.propTypes = {
  route: PropTypes.object.isRequired
};

export default NdcSdg;
