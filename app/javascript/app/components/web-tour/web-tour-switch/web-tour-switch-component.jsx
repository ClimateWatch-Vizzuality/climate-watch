import React from 'react';
import PropTypes from 'prop-types';
import { CheckInput } from 'cw-components';
import yellowCheckboxTheme from 'styles/themes/checkbox/yellow-checkbox.scss';
import styles from './web-tour-switch-styles.scss';

const WebTourSwitch = ({ isOpen, setOpen }) => (
  <div className={styles.webTourSwitch}>
    <CheckInput
      label="Web tour"
      checked={isOpen}
      theme={yellowCheckboxTheme}
      onChange={() => setOpen({ isOpen: !isOpen })}
    />
  </div>
);

WebTourSwitch.propTypes = {
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func.isRequired
};

export default WebTourSwitch;
