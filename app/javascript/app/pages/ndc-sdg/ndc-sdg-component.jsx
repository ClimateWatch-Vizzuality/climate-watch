import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import NdcsSdgsMetaProvider from 'providers/ndcs-sdgs-meta-provider';

import Header from 'components/header';
import Intro from 'components/intro';
import AutocompleteSearch from 'components/autocomplete-search';
import NDCSDGS from 'components/ndc-sdg-linkages-table';
import Map from 'components/map';

import layout from 'styles/layout';
import headerTheme from 'styles/themes/header';
import styles from './ndc-sdg-styles';

class NdcSdg extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { route } = this.props;
    return (
      <div className={styles.bg}>
        <NdcsSdgsMetaProvider />
        <Header size="medium" route={route}>
          <div className={layout.content}>
            <div className={headerTheme.headerGrid}>
              <Intro title="NDC-SDG Linkages" />
              <AutocompleteSearch />
            </div>
          </div>
        </Header>
        <div className={styles.wrapper}>
          <div className={cx(layout.content, styles.grid)}>
            <NDCSDGS />
            <Map style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </div>
    );
  }
}

NdcSdg.propTypes = {
  route: PropTypes.object.isRequired
};

export default NdcSdg;
