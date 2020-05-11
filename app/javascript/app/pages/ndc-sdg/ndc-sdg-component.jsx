import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import NdcsSdgsMetaProvider from 'providers/ndcs-sdgs-meta-provider';

import Header from 'components/header';
import Intro from 'components/intro';
import AutocompleteSearch from 'components/autocomplete-search';
import NdcSdgLinkagesContent from 'components/ndc-sdg/ndc-sdg-linkages-content';
import ModalShare from 'components/modal-share';
import { NDC_SDG_LINKAGES } from 'data/SEO';
import { MetaDescription, SocialMetadata } from 'components/seo';
import { isPageContained } from 'utils/navigation';

import styles from './ndc-sdg-styles';

class NdcSdg extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { route, location, isOpen } = this.props;
    return (
      <div className={cx(styles.bg, { [styles.bgOpen]: isOpen })}>
        <MetaDescription
          descriptionContext={NDC_SDG_LINKAGES}
          subtitle="NDC-SDG Linkages"
        />
        <SocialMetadata
          descriptionContext={NDC_SDG_LINKAGES}
          href={location.href}
        />
        <NdcsSdgsMetaProvider />
        {!isPageContained && (
          <Header
            size="small"
            route={route}
            className={cx({ [styles.headerOpen]: isOpen })}
          >
            <div className={styles.headerGrid}>
              <Intro
                title="NDC-SDG Linkages"
                description={`Identify potential alignment between the targets, actions, policy measures and needs in countries'
                  Nationally Determined Contributions (NDCs) and the targets of the Sustainable Development Goals (SDGs).`}
              />
              <AutocompleteSearch />
            </div>
          </Header>
        )}
        <div
          className={cx(styles.wrapper, {
            [styles.wrapperOpen]: isOpen
          })}
        >
          <NdcSdgLinkagesContent />
        </div>
        <ModalShare analyticsName={'Ndcs-Sdgs'} />
      </div>
    );
  }
}

NdcSdg.propTypes = {
  route: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  location: PropTypes.object.isRequired
};

export default NdcSdg;
