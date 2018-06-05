import React from 'react';
import Button from 'components/button';
import Icon from 'components/icon';
import cx from 'classnames';

import iconInfo from 'assets/icons/info.svg';
import iconDownload from 'assets/icons/download.svg';
import iconAddToUser from 'assets/icons/add-to-user.svg';
import iconEdit from 'assets/icons/edit.svg';
import iconDelete from 'assets/icons/delete.svg';
import PropTypes from 'prop-types';
import ShareMenu from 'components/share-menu';

import styles from './button-group-styles.scss';

const ButtonGroup = ({ className, buttonsConfig, disabled }) => (
  <div
    className={cx(
      styles.buttonGroup,
      disabled ? styles.disabled : '',
      className
    )}
  >
    {buttonsConfig.map(buttonConfig => {
      let button = null;
      switch (buttonConfig.type) {
        case 'info':
          button = (
            <Button
              key={buttonConfig.type}
              className={styles.button}
              onClick={buttonConfig.onInfoClick}
              disabled={!buttonConfig.onInfoClick}
            >
              <Icon icon={iconInfo} />
            </Button>
          );
          break;
        case 'share':
          button = (
            <ShareMenu
              key={buttonConfig.type}
              className={cx(styles.button, styles.share)}
              path={buttonConfig.shareUrl}
              inButtonGroup
              analyticsGraphName={buttonConfig.analyticsGraphName}
              reverse={buttonConfig.reverseDropdown}
            />
          );
          break;
        case 'download':
          button = (
            <Button
              key={buttonConfig.type}
              className={styles.button}
              onClick={buttonConfig.onDownloadClick}
              disabled={!buttonConfig.onDownloadClick}
            >
              <Icon icon={iconDownload} />
            </Button>
          );
          break;
        case 'add-to-user':
          button = (
            <Button
              key={buttonConfig.type}
              className={styles.button}
              onClick={buttonConfig.onAddToUserClick}
              disabled={!buttonConfig.onAddToUserClick}
            >
              <Icon icon={iconAddToUser} />
            </Button>
          );
          break;
        case 'edit':
          button = (
            <Button
              key={buttonConfig.type}
              className={styles.button}
              onClick={buttonConfig.onEditClick}
              disabled={!buttonConfig.onEditClick}
            >
              <Icon icon={iconEdit} />
            </Button>
          );
          break;
        case 'delete':
          button = (
            <Button
              key={buttonConfig.type}
              className={styles.button}
              onClick={buttonConfig.onDeleteClick}
              disabled={!buttonConfig.onDeleteClick}
            >
              <Icon icon={iconDelete} />
            </Button>
          );
          break;
        default:
          break;
      }
      return button;
    })}
  </div>
);

ButtonGroup.propTypes = {
  className: PropTypes.string,
  buttonsConfig: PropTypes.array,
  disabled: PropTypes.bool
};

export default ButtonGroup;
