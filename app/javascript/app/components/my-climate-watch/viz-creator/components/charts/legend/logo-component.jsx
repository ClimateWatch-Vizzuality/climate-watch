import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';

import styles from './logo-styles';

const Logo = ({ data, theme }) => (
  <div className={theme.logoContainer}>
    <div className={theme.logoTitle}>Data provided by:</div>
    <a href={data.modelUrl} target="_blank" className={theme.logo}>
      <img id="logoImage" src={`https:${data.logo}`} />
    </a>
  </div>
);

Logo.propTypes = {
  data: PropTypes.object,
  theme: PropTypes.object
};

export default themr('Logo', styles)(Logo);
