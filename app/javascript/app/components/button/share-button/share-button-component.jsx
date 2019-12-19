import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button';
import Icon from 'components/icon';
import cx from 'classnames';
import shareIcon from 'assets/icons/share.svg';
import styles from './share-button-styles.scss';

class ShareButton extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { onClick, className } = this.props;
    return (
      <Button
        className={cx(styles.shareButton, className)}
        onClick={onClick}
        color="yellow"
        dataFor="info-tooltip"
        dataTip="Sharermation"
      >
        <Icon icon={shareIcon} />
        <span className={styles.shareText}>Share</span>
      </Button>
    );
  }
}

ShareButton.propTypes = {
  className: PropTypes.node,
  onClick: PropTypes.func.isRequired
};

export default ShareButton;
