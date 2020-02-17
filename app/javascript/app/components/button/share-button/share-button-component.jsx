import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button';
import Icon from 'components/icon';
import cx from 'classnames';
import shareIcon from 'assets/icons/share.svg';
import styles from './share-button-styles.scss';

function ShareButton({ className, onClick, setShareModal }) {
  return (
    <Button
      className={cx(styles.shareButton, className)}
      onClick={e => {
        setShareModal({ open: true });
        if (onClick) {
          onClick(e);
        }
      }}
      variant="primary"
    >
      <Icon icon={shareIcon} />
      <span className={styles.shareText}>Share</span>
    </Button>
  );
}

ShareButton.propTypes = {
  className: PropTypes.node,
  onClick: PropTypes.func,
  setShareModal: PropTypes.func
};

export default ShareButton;
