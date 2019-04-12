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
import ReactTooltip from 'react-tooltip';

import styles from './button-group-styles.scss';

const tooltipText = {
  share: 'Share',
  info: 'Information',
  download: 'Download data',
  addToUser: 'Add to user'
};

const iconsMap = {
  info: iconInfo,
  download: iconDownload,
  addToUser: iconAddToUser,
  edit: iconEdit,
  delete: iconDelete
};
const renderButton = buttonConfig => {
  const dataTip = buttonConfig.tooltipText || tooltipText[buttonConfig.type];
  switch (buttonConfig.type) {
    case 'share':
      return (
        <ShareMenu
          key={buttonConfig.type}
          className={cx(styles.button, styles.share)}
          path={buttonConfig.shareUrl}
          shouldEmbedQueryParams={buttonConfig.shouldEmbedQueryParams}
          inButtonGroup
          analyticsGraphName={buttonConfig.analyticsGraphName}
          reverse={buttonConfig.reverseDropdown}
          positionRight={buttonConfig.positionRight}
          dataFor="blueTooltip"
          dataTip={dataTip}
        />
      );
    default:
      return (
        <Button
          key={buttonConfig.type}
          className={styles.button}
          onClick={buttonConfig.onClick}
          link={buttonConfig.link}
          href={buttonConfig.href}
          disabled={buttonConfig.disabled}
          dataFor="blueTooltip"
          dataTip={dataTip}
        >
          <Icon icon={iconsMap[buttonConfig.type]} />
        </Button>
      );
  }
};

const ButtonGroup = ({ className, buttonsConfig, disabled }) => (
  <div
    className={cx(
      styles.buttonGroup,
      disabled ? styles.disabled : '',
      className
    )}
  >
    {buttonsConfig.map(buttonConfig => renderButton(buttonConfig))}
    <ReactTooltip id="blueTooltip" effect="solid" />
  </div>
);

ButtonGroup.propTypes = {
  className: PropTypes.string,
  buttonsConfig: PropTypes.array,
  disabled: PropTypes.bool
};

export default ButtonGroup;
