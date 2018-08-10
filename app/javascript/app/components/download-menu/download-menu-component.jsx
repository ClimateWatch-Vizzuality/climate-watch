import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import SimpleMenu from 'components/simple-menu';
import downloadIcon from 'assets/icons/download.svg';
import ModalDownload from 'components/modal-download';
import { isEnabled } from 'features/data-survey';

const FEATURE_DATA_SURVEY = isEnabled();

class DownloadMenu extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { downloadMenuOptions, className, reverse } = this.props;
    return (
      <Fragment>
        <SimpleMenu
          {...this.props}
          buttonClassName={className}
          options={downloadMenuOptions}
          icon={downloadIcon}
          reverse={reverse}
        />
        {FEATURE_DATA_SURVEY && <ModalDownload />}
      </Fragment>
    );
  }
}

DownloadMenu.propTypes = {
  downloadMenuOptions: PropTypes.array,
  className: PropTypes.string,
  reverse: PropTypes.bool
};

export default DownloadMenu;
