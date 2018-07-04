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
import { DATA_EXPLORER_SECTION_BASE_URIS } from 'data/constants';

import styles from './button-group-styles.scss';

const iconsMap = {
  info: iconInfo,
  download: iconDownload,
  addToUser: iconAddToUser,
  edit: iconEdit,
  delete: iconDelete
};
const renderButton = buttonConfig => {
  const DATA_EXPLORER_TO_MODULES_PARAMS = {
    'historical-emissions': {
      'data-sources': { key: 'source' },
      gwps: { key: 'version' }
    },
    'ndc-sdg-linkages': {
      goals: {
        key: 'goal',
        idLabel: 'number'
      }
    },
    'ndc-content': {},
    'emission-pathways': {}
  };

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
      ]}`;
      parsedFilters[parsedKey] = filters[key];
    });
    return parsedFilters;
  };

  const sectionUrl = buttonConfig.section ? `/${section}` : '';
  const params = buttonConfig.filters
    ? `?${qs.stringify(parseFilters(buttonConfig.filters))}`
    : '';
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
      return (
        <Link
          key={buttonConfig.type}
          className={cx(styles.button, styles.download)}
          disabled={buttonConfig.disabled}
          to={downloadLink}
        >
          <Icon icon={iconsMap[buttonConfig.type]} />
        </Link>
      );
    default:
      return (
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
