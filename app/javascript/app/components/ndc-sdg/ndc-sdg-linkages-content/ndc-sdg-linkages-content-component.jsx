import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import NdcsSdgsMetaProvider from 'providers/ndcs-sdgs-meta-provider';
import NdcSdgLinkagesTable from 'components/ndc-sdg/ndc-sdg-linkages-table';
import NdcSdgLinkagesMap from 'components/ndc-sdg/ndc-sdg-linkages-map';
import ModalMetadata from 'components/modal-metadata';
import { TabletLandscape } from 'components/responsive';

import layout from 'styles/layout';
import styles from './ndc-sdg-linkages-content-styles.scss';

class NdcSdgLinkagesContent extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      goalHover,
      targetHover,
      responsiveMapIsOpen,
      handleGoalHover,
      handleTargetHover
    } = this.props;
    return (
      <TabletLandscape>
        {matches => (
          <div
            className={cx({ [layout.content]: matches === true }, styles.grid)}
          >
            <NdcsSdgsMetaProvider />
            <NdcSdgLinkagesTable
              goalHover={goalHover}
              onGoalHover={handleGoalHover}
              targetHover={targetHover}
              onTargetHover={handleTargetHover}
            />
            <NdcSdgLinkagesMap
              goalHover={goalHover}
              targetHover={targetHover}
              responsiveMapIsOpen={responsiveMapIsOpen}
            />
            <ModalMetadata />
          </div>
        )}
      </TabletLandscape>
    );
  }
}

NdcSdgLinkagesContent.propTypes = {
  goalHover: PropTypes.number,
  targetHover: PropTypes.string,
  responsiveMapIsOpen: PropTypes.bool,
  handleGoalHover: PropTypes.func.isRequired,
  handleTargetHover: PropTypes.func.isRequired
};

export default NdcSdgLinkagesContent;
