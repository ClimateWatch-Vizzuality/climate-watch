import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './tab-styles.scss';

class Tab extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { options, selectedIndex, handleTabIndexChange } = this.props;
    return (
      <div className={styles.tab}>
        <div className="nav-tab">
          {options.map((option, i) => (
            <a
              key={option}
              className={selectedIndex === i ? '-active' : ''}
              onClick={() => handleTabIndexChange(i)}
              role="menuitem"
              tabIndex={-1}
            >
              {option}
            </a>
          ))}
        </div>
      </div>
    );
  }
}

Tab.propTypes = {
  options: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  handleTabIndexChange: PropTypes.func.isRequired
};

export default Tab;
