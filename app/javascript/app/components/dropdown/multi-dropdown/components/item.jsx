import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/icon';
import cx from 'classnames';

import arrowDownIcon from 'assets/icons/dropdown-arrow.svg';
import styles from '../multi-dropdown-styles.scss';

const Item = props => {
  const {
    index,
    item,
    showGroup,
    highlightedIndex,
    getItemProps,
    toggleOpenGroup,
    activeValue,
    activeLabel
  } = props;
  const { group, groupParent, label } = item;

  const isActive =
    (!showGroup && !group) ||
    (group === showGroup || groupParent === showGroup);
  const isGroupParentActive = groupParent && showGroup === groupParent;
  const isHighlighted =
    highlightedIndex === index ||
    activeLabel === label ||
    (groupParent && groupParent === showGroup) ||
    (groupParent && activeValue && groupParent === activeValue.group);
  const showArrowIcon = groupParent && showGroup !== groupParent && isActive;
  return (
    <div
      className={cx(styles.itemWrapper, {
        [styles.show]: isActive,
        [styles.base]: !group,
        [styles.selected]: isGroupParentActive,
        [styles.groupParent]: groupParent
      })}
    >
      {isGroupParentActive && (
        <Icon
          icon={arrowDownIcon}
          className={cx(styles.groupIcon, styles.selected)}
          onClick={() => toggleOpenGroup(item)}
        />
      )}
      <div
        {...getItemProps({
          item,
          index,
          className: cx(styles.item, { [styles.highlight]: isHighlighted })
        })}
      >
        {label}
      </div>
      {showArrowIcon && (
        <Icon
          icon={arrowDownIcon}
          style={{ 'background-color': 'red' }}
          className={cx(styles.groupIcon, {
            [styles.selected]: showGroup === groupParent
          })}
          onClick={() => toggleOpenGroup(item)}
        />
      )}
    </div>
  );
};

Item.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object,
  showGroup: PropTypes.string,
  highlightedIndex: PropTypes.number,
  getItemProps: PropTypes.func,
  toggleOpenGroup: PropTypes.func,
  optionsAction: PropTypes.func,
  optionsActionKey: PropTypes.string,
  activeValue: PropTypes.object,
  activeLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Item;
