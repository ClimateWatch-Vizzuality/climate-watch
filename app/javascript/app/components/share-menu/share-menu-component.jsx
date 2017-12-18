import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SimpleMenu from 'components/simple-menu';
import shareIcon from 'assets/icons/share.svg';

class ShareMenu extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { shareMenuOptions, className } = this.props;
    return (
      <SimpleMenu
        {...this.props}
        buttonClassName={className}
        options={shareMenuOptions}
        icon={shareIcon}
      />
    );
  }
}

ShareMenu.propTypes = {
  shareMenuOptions: PropTypes.array,
  className: PropTypes.string
};

export default ShareMenu;
