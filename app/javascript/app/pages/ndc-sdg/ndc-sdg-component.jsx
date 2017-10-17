import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import NdcsSdgsMetaProvider from 'providers/ndcs-sdgs-meta-provider';

import Header from 'components/header';
import Intro from 'components/intro';
import AutocompleteSearch from 'components/autocomplete-search';
import NdcSdgLinkagesTable from 'components/ndc-sdg-linkages-table';
import NdcSdgLinkagesMap from 'components/ndc-sdg-linkages-map';

import layout from 'styles/layout';
import headerTheme from 'styles/themes/header';
import styles from './ndc-sdg-styles';

class NdcSdg extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      route,
      goalHover,
      targetHover,
      handleGoalHover,
      handleTargetHover
    } = this.props;
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
            <NdcSdgLinkagesTable
              goalHover={goalHover}
              onGoalHover={handleGoalHover}
              targetHover={targetHover}
              onTargetHover={handleTargetHover}
            />
            <NdcSdgLinkagesMap
              goalHover={goalHover}
              targetHover={targetHover}
            />
          </div>
        </div>
      </div>
    );
  }
}

NdcSdg.propTypes = {
  route: PropTypes.object.isRequired,
  goalHover: PropTypes.number,
  targetHover: PropTypes.string,
  handleGoalHover: PropTypes.func.isRequired,
  handleTargetHover: PropTypes.func.isRequired
};

export default NdcSdg;
