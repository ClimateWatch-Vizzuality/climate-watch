import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import NdcsSdgsMetaProvider from 'providers/ndcs-sdgs-meta-provider';

import Header from 'components/header';
import Intro from 'components/intro';
import AutocompleteSearch from 'components/autocomplete-search';
import NdcSdgLinkagesContent from 'components/ndc-sdg/ndc-sdg-linkages-content';

import layout from 'styles/layout';
import headerTheme from 'styles/themes/header';
import styles from './ndc-sdg-styles';

class NdcSdg extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { route } = this.props;
    return (
      <div className={styles.bg}>
        <Helmet>
          <title>
            Climate Watch: Data for Climate Action - NDC-SDG Linkages
          </title>
          <meta
            name="description"
            content="Explore how Country’s emissions actions (NDCs) relate to the Sustainable Development Goals"
          />
        </Helmet>
        <NdcsSdgsMetaProvider />
        <Header size="small" route={route}>
          <div className={layout.content}>
            <div className={headerTheme.headerGrid}>
              <Intro
                title="NDC-SDG Linkages"
                description="Identify potential alignment between the targets, actions, policies measures and needs in countries’ Nationally Determined Contributions (NDCs) and the targets of the Sustainable Development Goals (SDGs)."
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
