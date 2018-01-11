import React from 'react';
import Button from 'components/button';
import Icon from 'components/icon';
import cx from 'classnames';

import iconInfo from 'assets/icons/info.svg';
import iconDownload from 'assets/icons/download.svg';
import iconAddToUser from 'assets/icons/add-to-user.svg';
import PropTypes from 'prop-types';
import ShareMenu from 'components/share-menu';

import styles from './button-group-styles.scss';

const ButtonGroup = ({
  className,
  onInfoClick,
  onDownloadClick,
  onAddToUserClick,
  disabled,
  shareUrl,
  analyticsGraphName
}) => (
  <div
    className={cx(
      styles.buttonGroup,
      disabled ? styles.disabled : '',
      className
    )}
  >
    <Button
      className={cx(styles.button, styles.first)}
      onClick={onInfoClick}
      disabled={!onInfoClick}
    >
      <Icon icon={iconInfo} />
    </Button>
    <ShareMenu
      className={cx(styles.button, styles.share)}
      path={shareUrl}
      inButtonGroup
      analyticsGraphName={analyticsGraphName}
    />
    <Button
      className={styles.button}
      onClick={onDownloadClick}
      disabled={!onDownloadClick}
    >
      <Icon icon={iconDownload} />
    </Button>
    <Button
      className={cx(styles.button, styles.last)}
      onClick={onAddToUserClick}
      disabled={!onAddToUserClick}
    >
      <Icon icon={iconAddToUser} />
    </Button>
  </div>
);

ButtonGroup.propTypes = {
  className: PropTypes.string,
  shareUrl: PropTypes.string,
  analyticsGraphName: PropTypes.string,
  onInfoClick: PropTypes.func,
  onDownloadClick: PropTypes.func,
  onAddToUserClick: PropTypes.func,
  disabled: PropTypes.bool
};

export default ButtonGroup;
