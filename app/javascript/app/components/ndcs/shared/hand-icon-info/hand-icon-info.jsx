import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from 'components/icon';
import handCursorIcon from 'assets/icons/hand-cursor.svg';
import styles from './hand-icon-info-styles.scss';

const HandIconInfo = ({ text, className }) => (
  <p className={cx(styles.handIconInfo, className)}>
    <Icon icon={handCursorIcon} className={styles.handIcon} />
    <span>{text}</span>
  </p>
);

HandIconInfo.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string
};

export default HandIconInfo;
