import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import NdcsSdgsMetaProvider from 'providers/ndcs-sdgs-meta-provider';

import Header from 'components/header';
import Intro from 'components/intro';
import AutocompleteSearch from 'components/autocomplete-search';
import NdcSdgLinkagesContent from 'components/ndc-sdg/ndc-sdg-linkages-content';
import { SEO_PAGES } from 'data/seo';
import SEOTags from 'components/seo-tags';
import { isPageContained } from 'utils/navigation';

import styles from './ndc-sdg-styles';

class NdcSdg extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { route, location, isOpen } = this.props;
    return (
      <div className={cx(styles.bg, { [styles.bgOpen]: isOpen })}>
        <SEOTags page={SEO_PAGES.ndcSdg} href={location.href} />
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
