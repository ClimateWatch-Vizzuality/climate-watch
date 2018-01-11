import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ClickOutside from 'react-click-outside';

import Icon from 'components/icon';
import arrow from 'assets/icons/arrow-down-tiny.svg';

import styles from './nav-enhanced-menu-styles';

class NavNestedMenuComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  setMenuOpen = isOpen => {
    this.setState({ isOpen });
  };

  toggleMenu = () => {
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
  };

  render() {
    const { className } = this.props;
    return (
      <div className={styles.navNestedMenuContainer}>
        <ClickOutside onClickOutside={() => this.setState({ isOpen: false })}>
          <button
            onClick={() => this.toggleMenu()}
            className={cx(className, styles.button, {
              [styles.active]: this.state.isOpen
            })}
          >
            <span>{this.props.title}</span>
            <Icon icon={arrow} className={styles.arrowIcon} />
          </button>
          {this.state.isOpen && (
            <this.props.Child
              className={cx(styles.navNestedMenu, {
                [styles.reverse]: this.props.reverse
              })}
            />
          )}
        </ClickOutside>
      </div>
    );
  }
}

NavNestedMenuComponent.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  reverse: PropTypes.bool
};

export default NavNestedMenuComponent;
