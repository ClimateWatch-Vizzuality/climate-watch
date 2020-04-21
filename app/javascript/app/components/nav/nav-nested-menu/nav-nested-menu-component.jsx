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
      isHidden: props.isRendered
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.closeMenu();
    }
  }

  toggleMenu = () => {
    this.setState(state => ({
      isHidden: !state.isHidden
    }));
  };

  closeMenu = () => {
    this.setState({ isHidden: true });
  };

  render() {
    const { className, reverse, isRendered, title, theme } = this.props;
    const { isHidden } = this.state;
    return (
      <div
        className={cx(
          styles.navNestedMenuContainer,
          { [styles.isHidden]: isHidden },
          { [styles.reverse]: reverse }
        )}
      >
        <ClickOutside onClickOutside={this.closeMenu}>
          <button
            onClick={() => this.toggleMenu()}
            className={cx(
              className,
              styles.button,
              {
                [styles.active]: isRendered && !isHidden
              },
              theme.link
            )}
          >
            <span>{title}</span>
            <Icon
              icon={arrow}
              className={cx(styles.arrowIcon, theme.arrowIcon)}
            />
          </button>
          {this.props.isRendered && (
            <div className={styles.navNestedMenuWrapper}>
              <this.props.Child
                className={cx(styles.navNestedMenu)}
                opened={!isHidden}
              />
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
  reverse: PropTypes.bool,
  location: PropTypes.object,
  isRendered: PropTypes.bool,
  theme: PropTypes.object
};

NavNestedMenuComponent.defaultProps = {
  theme: {}
};

export default NavNestedMenuComponent;
