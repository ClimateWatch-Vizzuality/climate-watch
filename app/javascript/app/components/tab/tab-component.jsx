import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './tab-styles.scss';

class Tab extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      options,
      selectedIndex,
      handleTabIndexChange,
      classNames
    } = this.props;
    return (
      <div className={cx(styles.tab, classNames)}>
        {options.map((option, i) => (
          <a
            key={option}
            className={cx([
              styles.link,
              { [styles.linkActive]: selectedIndex === i }
            ])}
            onClick={() => handleTabIndexChange(i)}
            role="menuitem"
            tabIndex={-1}
          >
            {option}
          </a>
        ))}
      </div>
    );
  }
}

Tab.propTypes = {
  options: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  handleTabIndexChange: PropTypes.func.isRequired,
  classNames: PropTypes.string
};

Tab.defaultProps = {
  selectedIndex: 0,
  handleTabIndexChange: () => {}
};

export default Tab;
