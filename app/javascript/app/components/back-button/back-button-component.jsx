import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import { Link } from 'react-router-dom';
import longArrowBack from 'assets/icons/long-arrow-back.svg';
import { getPreviousLinkTo } from 'app/utils/history';
import styles from './back-button-styles.scss';

const BackButton = props => {
  const { goBack, lastPathLabel } = props;
  const previousLinkTo = getPreviousLinkTo();
  return (
    <div className={styles.backButton}>
      {lastPathLabel && previousLinkTo.pathname ? (
        <Link to={previousLinkTo}>
          <Icon className={styles.backIcon} icon={longArrowBack} />
          Back to {lastPathLabel}
        </Link>
      ) : (
        <button className={styles.linkButton} onClick={goBack}>
          <Icon className={styles.backIcon} icon={longArrowBack} />
          Back
        </button>
      )}
    </div>
  );
};

BackButton.propTypes = {
  goBack: PropTypes.func.isRequired,
  lastPathLabel: PropTypes.string
};

export default BackButton;
