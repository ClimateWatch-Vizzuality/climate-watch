import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from 'components/icon';
import ClickOutside from 'react-click-outside';
import { NavLink } from 'react-router-dom';
import includes from 'lodash/includes';
import arrow from 'assets/icons/arrow-down-tiny.svg';
import styles from './simple-menu-styles.scss';

class SimpleMenu extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      open: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(action) {
    this.setState({ open: false });
    return action();
  }

  renderLink(option) {
    const insideLink = o => (
      <div className={styles.documentLink} key={o.label}>
        {o.icon && <Icon icon={o.icon} className={styles.icon} />}
        <span className={styles.title}>{o.label}</span>
      </div>
    );

    return option.path ? (
      <NavLink
        className={styles.link}
        activeClassName={styles.active}
        to={option.path}
        onClick={() => this.setState({ open: false })}
      >
        {insideLink(option)}
      </NavLink>
    ) : (
      <a
        className={styles.link}
        target="_blank"
        href={option.link}
        onClick={() => this.handleClick(option.action)}
      >
        {insideLink(option)}
      </a>
    );
  }

  renderButton() {
    const {
      icon,
      title,
      buttonClassName,
      currentPathname,
      options
    } = this.props;
    const { open } = this.state;

    const paths = options.map(option => option.path);
    const active = includes(paths, currentPathname);

    return (
      <button
        className={cx(styles.button, buttonClassName, {
          [styles.active]: open || active
        })}
        onClick={() => this.setState({ open: !open })}
      >
        {icon && <Icon icon={icon} className={styles.icon} />}
        {title && <div>{title}</div>}
        {!icon && <Icon icon={arrow} className={styles.arrowIcon} />}
      </button>
    );
  }

  render() {
    const { options, reverse, positionRight } = this.props;
    const { open } = this.state;

    return (
      <ClickOutside onClickOutside={() => this.setState({ open: false })}>
        <div
          className={cx(
            styles.dropdown,
            { [styles.reverse]: reverse },
            { [styles.positionRight]: positionRight }
          )}
        >
          {this.renderButton()}
          <ul className={cx(styles.links, { [styles.open]: open })}>
            {options.map(option => (
              <li key={option.label}>{this.renderLink(option)}</li>
            ))}
          </ul>
        </div>
      </ClickOutside>
    );
  }
}

SimpleMenu.propTypes = {
  options: PropTypes.array.isRequired,
  icon: PropTypes.object,
  title: PropTypes.string,
  reverse: PropTypes.bool,
  positionRight: PropTypes.bool,
  buttonClassName: PropTypes.string,
  currentPathname: PropTypes.string
};

export default SimpleMenu;
