import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tab from 'components/tab';
import { themr } from 'react-css-themr';
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
      onRequestClose,
      children,
      theme
    } = this.props;
    return (
      <div className={theme.header}>
        <Button onClick={onRequestClose} className={theme.closeBtn} square>
          <Icon icon={closeIcon} className={theme.close} />
        </Button>
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
  children: PropTypes.node,
  theme: PropTypes.object,
  onRequestClose: PropTypes.func.isRequired
};

export default themr('ModalHeader', styles)(ModalHeader);
