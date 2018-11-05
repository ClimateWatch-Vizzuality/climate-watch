import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import SimpleMenu from 'components/simple-menu';
import downloadIcon from 'assets/icons/download.svg';
import ModalDownload from 'components/modal-download';
import styles from './download-menu-styles';

const FEATURE_DATA_SURVEY = process.env.FEATURE_DATA_SURVEY === 'true';

class DownloadMenu extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      downloadMenuOptions,
      className,
      reverse,
      title,
      inButton
    } = this.props;
    const iconProp = title ? {} : downloadIcon;
    return (
      <Fragment>
        <SimpleMenu
          buttonClassName={cx({ [styles.downloadButton]: inButton }, className)}
          options={downloadMenuOptions}
          reverse={reverse}
          {...iconProp}
          {...this.props}
        />
        {FEATURE_DATA_SURVEY && <ModalDownload />}
      </Fragment>
    );
  }
}

DownloadMenu.propTypes = {
  downloadMenuOptions: PropTypes.array,
  className: PropTypes.string,
  inButton: PropTypes.bool,
  title: PropTypes.string,
  reverse: PropTypes.bool
};

DownloadMenu.defaultProps = {
  title: null,
  inButton: false,
  reverse: false
};

export default DownloadMenu;
