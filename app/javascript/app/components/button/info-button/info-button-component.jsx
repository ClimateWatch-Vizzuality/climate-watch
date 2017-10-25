import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from 'components/button';
import Icon from 'components/icon';
import infoIcon from 'assets/icons/info.svg';
import styles from './info-button-styles.scss';

class InfoButton extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { toggleInfo, infoOpen, className } = this.props;
    return (
      <Button
        className={cx(styles.btnInfo, className, {
          [styles.btnInfoActive]: infoOpen
        })}
        onClick={() => toggleInfo(i => !i)}
      >
        <Icon icon={infoIcon} />
      </Button>
    );
  }
}

InfoButton.propTypes = {
  className: PropTypes.node,
  infoOpen: PropTypes.bool.isRequired,
  toggleInfo: PropTypes.func.isRequired
};

export default InfoButton;
