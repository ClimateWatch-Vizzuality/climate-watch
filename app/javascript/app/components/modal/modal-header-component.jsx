import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button';
import Icon from 'components/icon';
import closeIcon from 'assets/icons/sidebar-close.svg';
import Tab from 'components/tab';
import cx from 'classnames';
import styles from './modal-styles.scss';

class ModalHeader extends PureComponent {
  renderFakeHeader() {
    const { title, tabTitles } = this.props;
    return (
      <div
        className={cx(styles.fakeHeaderForSpacing, {
          [styles.withTabs]: !!tabTitles
        })}
      >
        {title && <h2 className={styles.headerTitle}>{title}</h2>}
        {tabTitles && (
          <Tab options={tabTitles} className={styles.fakeHeaderForSpacing} />
        )}
      </div>
    );
  }

  render() {
    const {
      title,
      tabTitles,
      selectedIndex,
      handleTabIndexChange,
      onRequestClose,
      fakeHeaderForSpacing
    } = this.props;
    return fakeHeaderForSpacing ? (
      this.renderFakeHeader()
    ) : (
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
  onRequestClose: PropTypes.func.isRequired,
  fakeHeaderForSpacing: PropTypes.bool
};

export default ModalHeader;
