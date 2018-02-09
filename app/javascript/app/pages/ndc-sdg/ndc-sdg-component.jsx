import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import qs from 'query-string';

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
    const { route, location } = this.props;
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
        <Header
          size="small"
          route={route}
          className={cx(styles.header, {
            [styles.isOpen]: qs.parse(location.search).goal !== ''
          })}
        >
          <div className={layout.content}>
            <div className={headerTheme.headerGrid}>
              <Intro
                title="NDC-SDG Linkages"
                description="Mapping of linkages between Nationally Determined Contributions (NDCs) and the Sustainable Development Goals (SDGs) and associated targets of the 2030 Agenda for Sustainable Development. Explore points of alignment across information communicated in the NDCs and SDGs at the global, regional, or individual level to help achieve targets in a synergistic way."
              />
              <AutocompleteSearch />
            </div>
          </div>
        </Header>
        <div
          className={cx(styles.wrapper, {
            [styles.isOpen]: qs.parse(location.search).goal !== ''
          })}
        >
          <NdcSdgLinkagesContent />
        </div>
      </div>
    );
  }
}

NdcSdg.propTypes = {
  route: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default NdcSdg;
