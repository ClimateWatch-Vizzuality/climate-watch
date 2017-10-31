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
  }

  renderLink(option) {
    return option.path ? (
      <NavLink
        className={styles.link}
        activeClassName={styles.active}
        to={option.path}
        onClick={() => this.setState({ open: false })}
      >
        <div className={styles.documentLink} key={option.label}>
          {option.label}
        </div>
      </NavLink>
    ) : (
      <a className={styles.link} target="_blank" href={option.link}>
        <div className={styles.documentLink} key={option.label}>
          {option.icon && <Icon icon={option.icon} className={styles.icon} />}
          <span className={styles.title}>{option.label}</span>
        </div>
      </a>
    );
  }
  render() {
    const {
      options,
      icon,
      title,
      buttonClassName,
      currentPathname,
      reverse
    } = this.props;
    const { open } = this.state;
    const paths = this.props.options.map(option => option.path);
    const active = includes(paths, currentPathname);

    return (
      <ClickOutside onClickOutside={() => this.setState({ open: false })}>
        <div className={cx(styles.dropdown, { [styles.reverse]: reverse })}>
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
          <ul className={cx(styles.links, { [styles.open]: open })}>
            {options.map(option => (
              <li key={option.label}>
                {option.action ? (
                  <button key={option.label} className={styles.documentLink}>
                    <Icon icon={option.icon} className={styles.icon} />
                    <span className={styles.title}>{option.label}</span>
                  </button>
                ) : (
                  this.renderLink(option)
                )}
              </li>
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
  buttonClassName: PropTypes.string,
  currentPathname: PropTypes.string
};

export default SimpleMenu;
