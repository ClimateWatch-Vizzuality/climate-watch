import React from 'react';
import PropTypes from 'prop-types';

import Item from './item';

const Menu = props => {
  const {
    isOpen,
    activeValue,
    activeLabel,
    items,
    showGroup,
    getItemProps,
    highlightedIndex,
    optionsAction,
    optionsActionKey,
    noItemsFound,
    handleSelectGroup
  } = props;

  return !isOpen ? null : (
    <div className="menu">
      {items && items.length ? (
        items.map((item, index) => (
          <Item
            key={item.value}
            index={index}
            item={item}
            showGroup={showGroup}
            highlightedIndex={highlightedIndex}
            getItemProps={getItemProps}
            handleSelectGroup={handleSelectGroup}
            optionsAction={optionsAction}
            optionsActionKey={optionsActionKey}
            activeValue={activeValue}
            activeLabel={activeLabel}
          />
        ))
      ) : (
        <div className="item not-found">
          {noItemsFound || 'No results found'}
        </div>
      )}
    </div>
  );
};

Menu.propTypes = {
  isOpen: PropTypes.bool,
  activeValue: PropTypes.object,
  activeLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  items: PropTypes.array,
  showGroup: PropTypes.string,
  getItemProps: PropTypes.func,
  highlightedIndex: PropTypes.number,
  optionsAction: PropTypes.func,
  optionsActionKey: PropTypes.string,
  noItemsFound: PropTypes.string,
  handleSelectGroup: PropTypes.func
};

export default Menu;
