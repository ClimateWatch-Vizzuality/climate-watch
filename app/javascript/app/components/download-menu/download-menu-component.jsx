import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import SimpleMenu from 'components/simple-menu';
import downloadIcon from 'assets/icons/download.svg';
import ModalDownload from 'components/modal-download';

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
        <ModalDownload />
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
