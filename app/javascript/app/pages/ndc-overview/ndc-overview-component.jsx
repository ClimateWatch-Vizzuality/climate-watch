import React from 'react';
// import styles from './ndc-overview-styles.scss';
import NdcCommitments from 'components/ndcs/ndcs-commitments';
import layout from 'styles/layout.scss';

const NdcOverview = () => (
  <div className={layout.content}>
    <NdcCommitments />
  </div>
);

export default NdcOverview;
