import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Downshift from 'downshift';
import Button from 'components/button';
import Icon from 'components/icon';

import infoIcon from 'assets/icons/info.svg';
import cx from 'classnames';

import Selector from './components/selector';
import Menu from './components/menu';
import styles from './multi-dropdown-styles.scss';

class Dropdown extends PureComponent {
  render() {
    const {
      className,
      theme,
      label,
      infoAction,
      searchable,
      clearable,
      noItemsFound,
      optionsAction,
      optionsActionKey,
      arrowPosition,
      checkModalClosing,
      handleStateChange,
      handleClearSelection,
      handleSelectGroup,
      buildInputProps,
      onSelectorClick,
      isOpen,
      showGroup,
      items,
      activeValue,
      activeLabel,
      highlightedIndex
    } = this.props;

    const dropdown = (
      <Downshift
        itemToString={i => i && i.label}
        onStateChange={handleStateChange}
        onOuterClick={checkModalClosing}
        {...this.props}
      >
        {({ getInputProps, getItemProps, getRootProps }) => (
          <Selector
            isOpen={isOpen}
            arrowPosition={arrowPosition}
            onSelectorClick={onSelectorClick}
            clearable={clearable}
            activeValue={activeValue}
            activeLabel={activeLabel}
            searchable={searchable}
            inputProps={() => buildInputProps(getInputProps)}
            handleClearSelection={() => handleClearSelection()}
            {...getRootProps({ refKey: 'innerRef' })}
          >
            <Menu
              isOpen={isOpen}
              activeValue={activeValue}
              activeLabel={activeLabel}
              items={items}
              showGroup={showGroup}
              getItemProps={getItemProps}
              highlightedIndex={highlightedIndex}
              optionsAction={optionsAction}
              optionsActionKey={optionsActionKey}
              noItemsFound={noItemsFound}
              handleSelectGroup={handleSelectGroup}
            />
          </Selector>
        )}
      </Downshift>
    );

    return (
      <div className={cx(styles.cropdown, theme, className)}>
        {label && (
          <div className={styles.label}>
            {label}
            {infoAction && (
              <Button className={styles.infoButton} onClick={infoAction}>
                <Icon icon={infoIcon} className={styles.infoIcon} />
              </Button>
            )}
          </div>
        )}
        {dropdown}
      </div>
    );
  }
}

Dropdown.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  theme: PropTypes.string,
  options: PropTypes.array,
  infoAction: PropTypes.func,
  modalOpen: PropTypes.bool,
  modalClosing: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number
  ]),
  placeholder: PropTypes.string,
  searchable: PropTypes.bool,
  noItemsFound: PropTypes.string,
  optionsAction: PropTypes.func,
  optionsActionKey: PropTypes.string,
  arrowPosition: PropTypes.string,
  noSelectedValue: PropTypes.string,
  clearable: PropTypes.bool,
  groupKey: PropTypes.string,
  handleStateChange: PropTypes.func,
  handleClearSelection: PropTypes.func,
  onInputClick: PropTypes.func,
  onSelectorClick: PropTypes.func,
  inputValue: PropTypes.string,
  isOpen: PropTypes.bool,
  showGroup: PropTypes.string,
  handleSelectGroup: PropTypes.func,
  buildInputProps: PropTypes.func,
  checkModalClosing: PropTypes.func,
  items: PropTypes.array,
  activeValue: PropTypes.object,
  activeLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  highlightedIndex: PropTypes.number
};

export default Dropdown;
