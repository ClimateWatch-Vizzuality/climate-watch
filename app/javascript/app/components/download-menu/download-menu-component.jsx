import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SimpleMenu from 'components/simple-menu';
import downloadIcon from 'assets/icons/download.svg';

class DownloadMenu extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { downloadMenuOptions, className, reverse } = this.props;
    return (
      <SimpleMenu
        {...this.props}
        buttonClassName={className}
        options={downloadMenuOptions}
        icon={downloadIcon}
        reverse={reverse}
      />
    );
  }
}

DownloadMenu.propTypes = {
  downloadMenuOptions: PropTypes.array,
  className: PropTypes.string,
  reverse: PropTypes.bool
};

export default DownloadMenu;
