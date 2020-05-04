import React, { useState } from 'react';
import { useCombobox, useMultipleSelection } from 'downshift';
import styles from './ghg-multiselect-dropdown-styles.scss';

function isRegion(option) {
  return option.groupId === 'regions';
}

function regionIncludesInputValue(option, inputValue) {
  return (
    isRegion(option) &&
    option.expandsTo.find(country =>
      country.label.toLowerCase().startsWith(inputValue.toLowerCase())
    )
  );
}

function countryIncludesInputValue(option, inputValue) {
  return option.label.toLowerCase().startsWith(inputValue.toLowerCase());
}

const GhgMultiselectDropdow = ({
  label,
  options,
  values,
  onSelectionChange
}) => {
  const [inputValue, setInputValue] = useState('');
  const {
    // getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    // removeSelectedItem,
    selectedItems
  } = useMultipleSelection({ initialSelectedItems: [] });

  const getFilteredItems = () =>
    options.filter(
      option =>
        countryIncludesInputValue(option, inputValue) ||
        regionIncludesInputValue(option, inputValue)
    );

  const {
    isOpen,
    // getToggleButtonProps,
    // getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps
  } = useCombobox({
    inputValue,
    selectedItem: null,
    items: getFilteredItems(),
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue);
          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (selectedItem) {
            setInputValue('');
            addSelectedItem(selectedItem);
            onSelectionChange(selectedItem);
          }
          break;
        default:
          break;
      }
    }
  });

  return (
    <div className={styles.container}>
      <div {...getComboboxProps()}>
        <label className={styles.label}>
          {label}
          <input
            className={styles.input}
            {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
            placeholder={selectedItems.length}
            value={values.length && values[0].label}
          />
        </label>
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          getFilteredItems(options).map(
            (item, index) =>
              item && (
                <li
                  style={
                    highlightedIndex === index
                      ? { backgroundColor: '#bde4ff' }
                      : {}
                  }
                  key={item.label}
                  {...getItemProps({ item, index })}
                >
                  <p>{item.label}</p>
                  {isRegion(item) &&
                    item.expandsTo.map(country => (
                      <p key={country.iso}>{country.label}</p>
                    ))}
                  <div />
                </li>
              )
          )}
      </ul>
    </div>
  );
};

export default GhgMultiselectDropdow;
