import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from 'components/icon';
import ClickOutside from 'react-click-outside';
import { NavLink } from 'react-router-dom';
import includes from 'lodash/includes';
import styles from './simple-menu-styles.scss';

class SimpleMenu extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  render() {
    const {
      options,
      icon,
      title,
      buttonClassName,
      currentPathname
    } = this.props;
    const { open } = this.state;
    const paths = this.props.options.map(option => option.path);
    const active = includes(paths, currentPathname);

    return (
      <ClickOutside onClickOutside={() => this.setState({ open: false })}>
        <div className={cx(styles.dropdown)}>
          <button
            className={cx(styles.button, buttonClassName, {
              [styles.active]: open || active
            })}
            onClick={() => this.setState({ open: !open })}
          >
            {icon && <Icon icon={icon} className={styles.icon} />}
            {title && <div>{title}</div>}
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
                  <div className={styles.documentLink} key={option.label}>
                    {option.icon && (
                      <Icon icon={option.icon} className={styles.icon} />
                    )}
                    {option.path ? (
                      <NavLink
                        className={styles.title}
                        activeClassName={styles.active}
                        to={option.path}
                        onClick={() => this.setState({ open: false })}
                      >
                        {option.label}
                      </NavLink>
                    ) : (
                      <a
                        className={styles.title}
                        target="_blank"
                        href={option.link}
                      >
                        {option.label}
                      </a>
                    )}
                  </div>
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
  buttonClassName: PropTypes.string,
  currentPathname: PropTypes.string
};

export default SimpleMenu;
