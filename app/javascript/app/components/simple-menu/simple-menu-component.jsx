import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import uniq from 'lodash/uniq';
import Icon from 'components/icon';
import checkIcon from 'assets/icons/check.svg';
import ClickOutside from 'react-click-outside';
import { NavLink } from 'react-router-dom';
import includes from 'lodash/includes';
import arrow from 'assets/icons/arrow-down-tiny.svg';
import ReactGA from 'react-ga';
import styles from './simple-menu-styles.scss';

class SimpleMenu extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      open: false,
      succesfulActions: []
    };
    this.handleActionClick = this.handleActionClick.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  componentDidUpdate() {
    const { succesfulActions, open } = this.state;
    if (!open && succesfulActions.length) {
      this.setState({ succesfulActions: [] }); // eslint-disable-line
    }
  }

  handleActionClick(option) {
    option.action();
    const updatedActions = uniq(
      this.state.succesfulActions.concat(option.label)
    );
    this.setState({ succesfulActions: updatedActions });
    this.handleAnalyticsClick();
  }

  handleLinkClick() {
    this.setState({ open: false });
    this.handleAnalyticsClick();
  }

  handleAnalyticsClick() {
    const { analyticsGraphName } = this.props;
    if (analyticsGraphName) {
      ReactGA.event({
        category: 'Share',
        action: 'User shares a link',
        label: analyticsGraphName
      });
    }
  }

  renderInsideLink(option, withAction = false) {
    const { succesfulActions } = this.state;
    return (
      <div className={styles.documentLink} key={option.label}>
        {option.icon &&
          (withAction && succesfulActions.includes(option.label) ? (
            <Icon icon={checkIcon} className={styles.icon} />
          ) : (
            <Icon icon={option.icon} className={styles.icon} />
          ))}
        <span className={styles.title}>{option.label}</span>
      </div>
    );
  }

  renderLink(option) {
    if (option.path) {
      return (
        <NavLink
          className={styles.link}
          activeClassName={styles.active}
          to={option.path}
          onClick={this.handleLinkClick}
        >
          {this.renderInsideLink(option)}
        </NavLink>
      );
    }
    return option.action ? (
      <button
        className={styles.link}
        onClick={() => this.handleActionClick(option)}
      >
        {this.renderInsideLink(option, true)}
      </button>
    ) : (
      <a
        className={styles.link}
        target={option.target || '_blank'}
        href={option.link}
        onClick={this.handleLinkClick}
      >
        {this.renderInsideLink(option)}
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
    const { options, reverse, positionRight, inButtonGroup } = this.props;
    const { open } = this.state;
    return (
      <ClickOutside
        onClickOutside={() => this.setState({ open: false })}
        className={cx(
          styles.dropdown,
          { [styles.reverse]: reverse },
          { [styles.positionRight]: positionRight },
          { [styles.inButtonGroup]: inButtonGroup }
        )}
      >
        {this.renderButton()}
        <ul className={cx(styles.links, { [styles.open]: open })}>
          {options.map(option => (
            <li key={option.label}>{this.renderLink(option)}</li>
          ))}
        </ul>
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
  inButtonGroup: PropTypes.bool,
  buttonClassName: PropTypes.string,
  currentPathname: PropTypes.string,
  analyticsGraphName: PropTypes.string
};

export default SimpleMenu;
