import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import uniq from 'lodash/uniq';
import Icon from 'components/icon';
import checkIcon from 'assets/icons/check.svg';
import downloadIcon from 'assets/icons/download.svg';
import externalLink from 'assets/icons/external-link.svg';
import ClickOutside from 'react-click-outside';
import { NavLink } from 'react-router-dom';
import includes from 'lodash/includes';
import arrow from 'assets/icons/arrow-down-tiny.svg';
import { handleAnalytics } from 'utils/analytics';
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
      handleAnalytics('Share', 'User shares a link', analyticsGraphName);
    }
  }

  renderInsideLink(option, withAction = false) {
    const { withDownloadIcon } = this.props;
    const { succesfulActions } = this.state;
    return (
      <div
        className={cx(styles.documentLink, {
          [styles.withDownloadIcon]: withDownloadIcon
        })}
        key={option.label}
      >
        {option.icon &&
          (withAction && succesfulActions.includes(option.label) ? (
            <Icon icon={checkIcon} className={styles.icon} />
          ) : (
            <Icon icon={option.icon} className={styles.icon} />
          ))}
        <span className={styles.title}>{option.label}</span>
        {withDownloadIcon && (
          <Icon icon={downloadIcon} className={styles.icon} />
        )}
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderExternalLink(option) {
    return (
      <div
        className={cx(styles.documentLink, styles.externalLink)}
        key={option.label}
      >
        <span className={styles.title}>{option.label}</span>
        <Icon icon={externalLink} className={styles.icon} />
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
          onClick={() => {
            this.handleLinkClick();
          }}
        >
          {this.renderInsideLink(option)}
        </NavLink>
      );
    }
    if (option.action) {
      return (
        <button
          className={styles.link}
          onClick={() => this.handleActionClick(option)}
        >
          {this.renderInsideLink(option, true)}
        </button>
      );
    }
    return (
      <a
        className={styles.link}
        target={option.external ? '_blank' : option.target || '_blank'}
        href={option.link}
        onClick={this.handleLinkClick}
      >
        {option.external
          ? this.renderExternalLink(option)
          : this.renderInsideLink(option)}
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
        onClick={() => {
          this.setState({ open: !open });
        }}
      >
        {icon && <Icon icon={icon} className={styles.icon} />}
        {title && <div>{title}</div>}
        {!icon && <Icon icon={arrow} className={styles.arrowIcon} />}
      </button>
    );
  }

  render() {
    const {
      options,
      reverse,
      positionRight,
      inButton,
      inButtonGroup,
      dataTour,
      dataFor,
      dataTip
    } = this.props;
    const { open } = this.state;
    const tooltipProps = {
      'data-for': dataFor,
      'data-tip': dataTip
    };
    return (
      <ClickOutside
        onClickOutside={() => this.setState({ open: false })}
        className={cx(
          styles.dropdown,
          { [styles.reverse]: reverse },
          { [styles.positionRight]: positionRight },
          { [styles.inButton]: inButton },
          { [styles.inButtonGroup]: inButtonGroup }
        )}
        {...tooltipProps}
        data-tour={dataTour}
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
  inButton: PropTypes.bool,
  withDownloadIcon: PropTypes.bool,
  buttonClassName: PropTypes.string,
  currentPathname: PropTypes.string,
  analyticsGraphName: PropTypes.string,
  dataFor: PropTypes.string,
  dataTip: PropTypes.string,
  dataTour: PropTypes.string
};

SimpleMenu.defaultProps = {
  dataFor: null,
  dataTip: null,
  inButtonGroup: false,
  inButton: false,
  withDownloadIcon: false
};

export default SimpleMenu;
