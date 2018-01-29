import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tab from 'components/tab';
import Button from 'components/button';
import Icon from 'components/icon';
import closeIcon from 'assets/icons/sidebar-close.svg';

import styles from './modal-styles.scss';

class ModalHeader extends PureComponent {
  render() {
    const {
      title,
      tabTitles,
      selectedIndex,
      handleTabIndexChange,
      onRequestClose
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
        <Button onClick={onRequestClose} className={styles.closeBtn} square>
          <Icon icon={closeIcon} className={styles.close} />
        </Button>
      </div>
    );
  }
}

ModalHeader.propTypes = {
  title: PropTypes.string,
  tabTitles: PropTypes.array,
  selectedIndex: PropTypes.number,
  handleTabIndexChange: PropTypes.func,
  onRequestClose: PropTypes.func.isRequired
};

export default ModalHeader;
