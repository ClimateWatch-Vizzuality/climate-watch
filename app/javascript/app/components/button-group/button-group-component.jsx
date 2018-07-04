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

const iconsMap = {
  info: iconInfo,
  download: iconDownload,
  addToUser: iconAddToUser,
  edit: iconEdit,
  delete: iconDelete
};

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
      if (buttonConfig.type === 'share') {
        button = (
          <ShareMenu
            key={buttonConfig.type}
            className={cx(styles.button, styles.share)}
            path={buttonConfig.shareUrl}
            inButtonGroup
            analyticsGraphName={buttonConfig.analyticsGraphName}
            reverse={buttonConfig.reverseDropdown}
            positionRight={buttonConfig.positionRight}
          />
        );
      } else {
        button = (
          <Button
            key={buttonConfig.type}
            className={styles.button}
            onClick={buttonConfig.onClick}
            disabled={buttonConfig.disabled || !buttonConfig.onClick}
          >
            <Icon icon={iconsMap[buttonConfig.type]} />
          </Button>
        );
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
