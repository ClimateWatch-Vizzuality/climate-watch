import React from 'react';
import PropTypes from 'prop-types';
import { CheckInput } from 'cw-components';
import tourCheckboxTheme from 'styles/themes/checkbox/tour-checkbox.scss';
import styles from './web-tour-switch-styles.scss';

const WebTourSwitch = ({ isOpen, setOpen }) => (
  <div className={styles.webTourSwitch}>
    <CheckInput
      id="web-tour"
      label="Web tour"
      checked={isOpen}
      theme={tourCheckboxTheme}
      onChange={() => setOpen({ isOpen: !isOpen })}
    />
  </div>
);

WebTourSwitch.propTypes = {
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func.isRequired
};

export default WebTourSwitch;
