import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import { Link } from 'react-router-dom';
import longArrowBack from 'assets/icons/long-arrow-back.svg';
import styles from './back-button-styles.scss';

const BackButton = props => {
  const { pathname, backLabel } = props;
  return (
    <div className={styles.backButton}>
      <Link to={pathname}>
        <Icon className={styles.backIcon} icon={longArrowBack} />
        {backLabel ? `Go to ${backLabel}` : 'Back'}
      </Link>
    </div>
  );
};

BackButton.propTypes = {
  backLabel: PropTypes.string,
  pathname: PropTypes.string
};

export default BackButton;
