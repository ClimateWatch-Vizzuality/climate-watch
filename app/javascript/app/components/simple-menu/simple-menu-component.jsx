import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from 'components/icon';
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
    const { options, icon } = this.props;
    const { open } = this.state;
    return (
      <div>
        <button
          className={cx(styles.button, { [styles.active]: open })}
          onClick={() => this.setState({ open: !open })}
        >
          <Icon icon={icon} className={styles.icon} />
        </button>
        <ul className={cx(styles.links, { [styles.open]: open })}>
          {options.map(option => (
            <li key={option.title}>
              {option.action ? (
                <button key={option.title} className={styles.documentLink}>
                  <Icon icon={option.icon} className={styles.icon} />
                  <span className={styles.title}>{option.title}</span>
                </button>
              ) : (
                <a
                  className={cx(styles.documentLink, {
                    [styles.disabled]: !option.link
                  })}
                  key={option.title}
                  target="_blank"
                  href={option.link}
                >
                  <Icon icon={option.icon} className={styles.icon} />
                  <span className={styles.title}>{option.title}</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

SimpleMenu.propTypes = {
  options: PropTypes.array.isRequired,
  icon: PropTypes.object.isRequired
};

export default SimpleMenu;
