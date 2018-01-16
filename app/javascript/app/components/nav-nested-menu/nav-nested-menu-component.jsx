import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ClickOutside from 'react-click-outside';

import Icon from 'components/icon';
import arrow from 'assets/icons/arrow-down-tiny.svg';

import styles from './nav-nested-menu-styles';

class NavNestedMenuComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: !props.reverse,
      isHidden: !props.reverse
    };
  }

  setMenuOpen = isOpen => {
    this.setState({ isOpen });
  };

  toggleMenu = () => {
    if (this.props.reverse) {
      this.setState(state => ({
        isOpen: !state.isOpen
      }));
    } else {
      this.setState(state => ({
        isHidden: !state.isHidden
      }));
    }
  };

  outsideClickHandle = () => {
    if (this.props.reverse) {
      this.setState({ isOpen: false });
    } else {
      this.setState({ isHidden: true });
    }
  };
  render() {
    const { className } = this.props;
    return (
      <div
        className={cx(
          styles.navNestedMenuContainer,
          { [styles.isHidden]: this.state.isHidden },
          { [styles.reverse]: this.props.reverse },
          { [styles.regular]: !this.props.reverse }
        )}
      >
        <ClickOutside onClickOutside={() => this.outsideClickHandle()}>
          <button
            onClick={() => this.toggleMenu()}
            className={cx(className, styles.button, {
              [styles.active]: this.state.isOpen && !this.state.isHidden
            })}
          >
            <span>{this.props.title}</span>
            <Icon icon={arrow} className={styles.arrowIcon} />
          </button>
          {this.state.isOpen && (
            <div className={styles.navNestedMenuWrapper}>
              <this.props.Child className={cx(styles.navNestedMenu)} />
            </div>
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
