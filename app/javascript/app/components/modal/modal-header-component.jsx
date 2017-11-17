import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tab from 'components/tab';

import styles from './modal-styles.scss';

class ModalHeader extends PureComponent {
  render() {
    const {
      title,
      tabTitles,
      children,
      selectedIndex,
      handleTabIndexChange
    } = this.props;
    return (
      <div className={styles.header}>
        {title && <h2 className={styles.headerTitle}>{title}</h2>}
        {tabTitles && (
          <Tab
            options={tabTitles}
            selectedIndex={selectedIndex}
            handleTabIndexChange={handleTabIndexChange}
          />
        )}
        {children}
      </div>
    );
  }
}

ModalHeader.propTypes = {
  title: PropTypes.string,
  tabTitles: PropTypes.array,
  selectedIndex: PropTypes.number,
  handleTabIndexChange: PropTypes.func,
  children: PropTypes.node
};

export default ModalHeader;
