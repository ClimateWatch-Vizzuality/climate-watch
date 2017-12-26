import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import NdcsSdgsMetaProvider from 'providers/ndcs-sdgs-meta-provider';
import NdcSdgLinkagesTable from 'components/ndc-sdg/ndc-sdg-linkages-table';
import NdcSdgLinkagesMap from 'components/ndc-sdg/ndc-sdg-linkages-map';
import ModalMetadata from 'components/modal-metadata';

import layout from 'styles/layout';
import styles from './ndc-sdg-linkages-content-styles.scss';

class NdcSdgLinkagesContent extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      goalHover,
      targetHover,
      handleGoalHover,
      handleTargetHover
    } = this.props;
    return (
      <div className={cx(layout.content, styles.grid)}>
        <NdcsSdgsMetaProvider />
        <NdcSdgLinkagesTable
          goalHover={goalHover}
          onGoalHover={handleGoalHover}
          targetHover={targetHover}
          onTargetHover={handleTargetHover}
        />
        <NdcSdgLinkagesMap goalHover={goalHover} targetHover={targetHover} />
        <ModalMetadata />
      </div>
    );
  }
}

NdcSdgLinkagesContent.propTypes = {
  goalHover: PropTypes.number,
  targetHover: PropTypes.string,
  handleGoalHover: PropTypes.func.isRequired,
  handleTargetHover: PropTypes.func.isRequired
};

export default NdcSdgLinkagesContent;
