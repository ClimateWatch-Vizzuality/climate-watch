import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from 'components/button';
import Icon from 'components/icon';
import infoIcon from 'assets/icons/info.svg';
import styles from './info-icon-styles.scss';

class InfoIcon extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { toggleInfo, infoOpen, right, noPadding } = this.props;
    return (
      <Button
        className={cx(styles.btnInfo, {
          [styles.btnInfoActive]: infoOpen,
          [styles.right]: right,
          [styles.noPadding]: noPadding
        })}
        onClick={toggleInfo}
      >
        <Icon icon={infoIcon} />
      </Button>
    );
  }
}

InfoIcon.propTypes = {
  right: PropTypes.bool,
  noPadding: PropTypes.bool,
  infoOpen: PropTypes.bool.isRequired,
  toggleInfo: PropTypes.func.isRequired
};

export default InfoIcon;
