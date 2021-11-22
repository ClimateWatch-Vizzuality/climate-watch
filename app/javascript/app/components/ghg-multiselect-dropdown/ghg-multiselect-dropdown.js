import React from 'react';
import PropTypes from 'prop-types';
import Component from './ghg-multiselect-dropdown-component';

const GhgMultiselectDropdownContainer = props => {
  const { onSelectionChange } = props;

  const handleClearSelection = () => onSelectionChange([]);

  const handleSelectionUpdate = (selectedItems, clickedOption) => {
    if (selectedItems.some(item => item.label === clickedOption.label)) {
      onSelectionChange(
        selectedItems.filter(v => v.label !== clickedOption.label)
      );
    } else {
      onSelectionChange([...selectedItems, clickedOption]);
    }
  };
  return (
    <Component
      handleClearSelection={handleClearSelection}
      handleSelectionUpdate={handleSelectionUpdate}
      {...props}
    />
  );
};

GhgMultiselectDropdownContainer.propTypes = {
  onSelectionChange: PropTypes.func
};

export default GhgMultiselectDropdownContainer;
