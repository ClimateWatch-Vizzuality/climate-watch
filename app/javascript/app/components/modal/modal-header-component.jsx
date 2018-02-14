import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import Tab from 'components/tab';

import styles from './modal-styles.scss';

class ModalHeader extends PureComponent {
  render() {
    const {
      title,
      theme,
      tabTitles,
      selectedIndex,
      handleTabIndexChange,
      children
    } = this.props;
    return (
      <div className={theme.header}>
        {title && <h2 className={theme.headerTitle}>{title}</h2>}
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
  theme: PropTypes.object,
  children: PropTypes.node
};

export default themr('ModalHeader', styles)(ModalHeader);
