import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import CountriesSelect from 'components/countries-select';
import styles from './countries-menu-styles.scss';

class CountriesMenu extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  handleClickOutside(open) {
    const { openCountriesMenu } = this.props;
    openCountriesMenu(open);
  }

  renderButton() {
    const { open, title, openCountriesMenu } = this.props;
    return (
      <button
        className={cx(styles.button, {
          [styles.active]: open
        })}
        onClick={() => openCountriesMenu(!open)}
      >
        {title}
      </button>
    );
  }

  render() {
    const { open } = this.props;
    return (
      <div className={styles.content}>
        {this.renderButton()}
        {open && (
          <CountriesSelect
            className={styles.fixed}
            onClickOutside={() => this.handleClickOutside(false)}
          />
        )}
      </div>
    );
  }
}

CountriesMenu.propTypes = {
  title: PropTypes.string.isRequired,
  openCountriesMenu: PropTypes.func.isRequired,
  open: PropTypes.bool
};

export default CountriesMenu;
