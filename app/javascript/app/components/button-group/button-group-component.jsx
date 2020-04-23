import React from 'react';
import Button from 'components/button';
import Icon from 'components/icon';
import cx from 'classnames';
import iconInfo from 'assets/icons/info.svg';
import iconDownload from 'assets/icons/download.svg';
import iconDownloadCSV from 'assets/icons/download-csv.svg';
import iconAddToUser from 'assets/icons/add-to-user.svg';
import iconEdit from 'assets/icons/edit.svg';
import iconDelete from 'assets/icons/delete.svg';
import PropTypes from 'prop-types';
import ShareMenu from 'components/share-menu';
import SimpleMenu from 'components/simple-menu';
import ReactTooltip from 'react-tooltip';
import { isPageContained } from 'utils/navigation';

import styles from './button-group-styles.scss';

const tooltipText = {
  share: 'Share',
  info: 'Information',
  download: 'Download data',
  downloadCombo: 'Download data',
  addToUser: 'Add to user'
};

const iconsMap = {
  info: iconInfo,
  download: iconDownload,
  downloadCombo: iconDownload,
  downloadCSV: iconDownloadCSV,
  addToUser: iconAddToUser,
  edit: iconEdit,
  delete: iconDelete
};

const getButtonLink = (link, currentPathname) => {
  const fullPathname = window.location.href;
  const updatedPath = fullPathname.replace(`/contained${currentPathname}`, '');
  return `${updatedPath}${link}`;
};

const renderButton = (buttonConfig, currentPathname) => {
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
          dataFor="tooltip"
          dataTip={dataTip}
        />
      );
    case 'downloadCombo':
      return (
        <SimpleMenu
          {...this.props}
          buttonClassName={cx(styles.button, styles.download)}
          options={buttonConfig.options}
          icon={iconsMap[buttonConfig.type]}
          reverse={buttonConfig.reverseDropdown}
          dataFor="tooltip"
          dataTip={dataTip}
          inButtonGroup
        />
      );
    default:
      return (
        <Button
          key={buttonConfig.type}
          className={styles.button}
          onClick={buttonConfig.onClick}
          link={buttonConfig.link}
          href={
            buttonConfig.link && isPageContained
              ? getButtonLink(buttonConfig.link, currentPathname)
              : buttonConfig.href
          }
          disabled={buttonConfig.disabled}
          dataFor="tooltip"
          dataTip={dataTip}
          target={buttonConfig.link && isPageContained ? '_blank' : undefined}
        >
          <Icon icon={iconsMap[buttonConfig.type]} />
        </Button>
      );
  }
};

const ButtonGroup = ({ className, buttonsConfig, disabled, location }) => {
  const { pathname: currentPathname } = location;
  return (
    <div
      className={cx(
        styles.buttonGroup,
        disabled ? styles.disabled : '',
        className
      )}
    >
      {buttonsConfig.map(buttonConfig =>
        renderButton(buttonConfig, currentPathname)
      )}
      <ReactTooltip id="tooltip" effect="solid" />
    </div>
  );
};

ButtonGroup.propTypes = {
  className: PropTypes.string,
  buttonsConfig: PropTypes.array,
  location: PropTypes.object,
  disabled: PropTypes.bool
};

export default ButtonGroup;
