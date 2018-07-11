import React from 'react';
import Button from 'components/button';
import Icon from 'components/icon';
import cx from 'classnames';
import qs from 'querystring';
import iconInfo from 'assets/icons/info.svg';
import iconDownload from 'assets/icons/download.svg';
import iconAddToUser from 'assets/icons/add-to-user.svg';
import iconEdit from 'assets/icons/edit.svg';
import iconDelete from 'assets/icons/delete.svg';
import PropTypes from 'prop-types';
import ShareMenu from 'components/share-menu';
import { Link } from 'react-router-dom';
import invert from 'lodash/invert';
import invertBy from 'lodash/invertBy';
import {
  DATA_EXPLORER_SECTION_BASE_URIS,
  DATA_EXPLORER_TO_MODULES_PARAMS
} from 'data/constants';

import styles from './button-group-styles.scss';

const FEATURE_DATA_EXPLORER = process.env.FEATURE_DATA_EXPLORER === 'true';

const iconsMap = {
  info: iconInfo,
  download: iconDownload,
  addToUser: iconAddToUser,
  edit: iconEdit,
  delete: iconDelete
};
const renderButton = buttonConfig => {
  const section = invert(DATA_EXPLORER_SECTION_BASE_URIS)[buttonConfig.section];
  const parseFilters = filters => {
    const modulesToDataExplorerParamsSchema = invertBy(
      DATA_EXPLORER_TO_MODULES_PARAMS[section],
      value => value.key
    );
    const parsedFilters = {};
    Object.keys(filters).forEach(key => {
      const parsedKey = `external-${section}-${modulesToDataExplorerParamsSchema[
        key
      ]}`.replace('_', '-');
      parsedFilters[parsedKey] = filters[key];
    });
    return parsedFilters;
  };

  const sectionUrl = buttonConfig.section ? `/${section}` : '';
  const params = buttonConfig.filters
    ? `?${qs.stringify(parseFilters(buttonConfig.filters))}`
    : '';
  const defaultButton = (
    <Button
      key={buttonConfig.type}
      className={styles.button}
      onClick={buttonConfig.onClick}
      disabled={buttonConfig.disabled || !buttonConfig.onClick}
    >
      <Icon icon={iconsMap[buttonConfig.type]} />
    </Button>
  );
  const downloadLink = `/data-explorer${sectionUrl}${params}`;
  switch (buttonConfig.type) {
    case 'share':
      return (
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
    case 'download':
      return FEATURE_DATA_EXPLORER ? (
        <Link
          key={buttonConfig.type}
          className={cx(styles.button, styles.download)}
          disabled={buttonConfig.disabled}
          to={downloadLink}
        >
          <Icon icon={iconsMap[buttonConfig.type]} />
        </Link>
      ) : (
        defaultButton
      );
    default:
      return defaultButton;
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
  </div>
);

ButtonGroup.propTypes = {
  className: PropTypes.string,
  buttonsConfig: PropTypes.array,
  disabled: PropTypes.bool
};

export default ButtonGroup;
