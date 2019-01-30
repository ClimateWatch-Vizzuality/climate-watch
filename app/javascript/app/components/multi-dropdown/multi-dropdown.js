import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deburrUpper } from 'utils/utils';
import groupBy from 'lodash/groupBy';
import isArray from 'lodash/isArray';
import remove from 'lodash/remove';

import Component from './multi-dropdown-component';

const mapStateToProps = (
  { modalMeta },
  { value, options, noSelectedValue, values }
) => {
  const selectedValues = values || value;
  const activeValue =
    typeof selectedValues === 'string' || typeof selectedValues === 'number'
      ? options.find(o => o.value === selectedValues)
      : selectedValues;
  const activeLabel =
    (activeValue &&
      (isArray(activeValue) && activeValue.length === 1
        ? activeValue[0].label
        : activeValue.label)) ||
    noSelectedValue;
  return {
    modalOpen: modalMeta ? modalMeta.open : false,
    modalClosing: modalMeta ? modalMeta.closing : false,
    activeValue,
    activeLabel
  };
};

class DropdownContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      isOpen: false,
      showGroup: '',
      highlightedIndex: 0
    };
  }

  onInputClick = () => {
    const { searchable } = this.props;
    const { isOpen } = this.state;
    if (!searchable && isOpen) {
      this.setState({ isOpen: false, showGroup: '' });
    } else {
      this.setState({ isOpen: true, inputValue: '' });
    }
  };

  onSelectorClick = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen, inputValue: '' });
  };

  getGroupedItems = () => {
    const newItems = this.filterItems();
    const groups = remove(Object.keys(newItems), r => r !== 'undefined');
    const orphansList = newItems.undefined || [];
    let listWithGroupsAndItems = orphansList;
    groups.forEach(g => {
      listWithGroupsAndItems = listWithGroupsAndItems.concat(newItems[g]);
    });
    return this.addIsActive(listWithGroupsAndItems);
  };

  addIsActive = itemList => {
    const { values } = this.props;
    const parentsWithActiveChilds = [];
    values.forEach(v => {
      if (v.group) parentsWithActiveChilds.push(parseInt(v.group, 10));
    });
    return itemList.map(i => ({
      ...i,
      active:
        values.includes(i) || values.map(v => v && v.value).includes(i.value),
      hasActiveChild: parentsWithActiveChilds.includes(i.value)
    }));
  };

  filterItems = () => {
    const { inputValue } = this.state;
    const { options, groupKey } = this.props;

    return groupBy(
      inputValue
        ? options.filter(
          item =>
            deburrUpper(item.label).indexOf(deburrUpper(inputValue)) > -1
        )
        : options,
      groupKey || 'group'
    );
  };

  handleMultiselectChange = (changes, downshiftStateAndHelpers) => {
    const { values: selectedItems } = this.props;
    const { onChange } = this.props;
    const itemToRemove = selectedItems.find(
      s => s.label === changes.inputValue
    );
    if (itemToRemove) {
      const isOutsideClickChange =
        changes && changes.type === '__autocomplete_mouseup__';
      if (!isOutsideClickChange) {
        selectedItems.splice(selectedItems.indexOf(itemToRemove), 1);
      }
    } else {
      selectedItems.push(downshiftStateAndHelpers.selectedItem);
    }
    onChange(selectedItems);
  };

  handleStateChange = (changes, downshiftStateAndHelpers) => {
    const { multiselect } = this.props;
    if (!downshiftStateAndHelpers.isOpen) {
      this.setState({ inputValue: '' });
    } else if ((changes && changes.inputValue) || changes.inputValue === '') {
      if (multiselect) {
        this.handleMultiselectChange(changes, downshiftStateAndHelpers);
      }
      this.setState({ inputValue: changes.inputValue });
    }

    if (changes && changes.selectedItem && !multiselect) {
      this.setState({ isOpen: false, inputValue: '' });
    }

    if (Object.keys(changes).indexOf('isOpen') > -1) {
      this.setState({ inputValue: '' });
    }

    if (
      (changes && changes.highlightedIndex) ||
      changes.highlightedIndex === 0
    ) {
      this.setState({ highlightedIndex: changes.highlightedIndex });
    }
  };

  handleClearSelection = () => {
    const { onChange } = this.props;
    onChange();
    this.setState({ isOpen: false, showGroup: '', inputValue: '' });
  };

  handleOnChange = selection => {
    const { multiselect, onChange } = this.props;
    if (!multiselect) return onChange(selection);
    // Multiselect needs to be handled in handleStateChange as the removing changes don't trigger onChange
    return null;
  };

  toggleOpenGroup = item => {
    const { showGroup } = this.state;
    this.setState({
      showGroup: item.groupParent === showGroup ? '' : item.groupParent,
      isOpen: true
    });
  };

  handleKeyEnter = e => {
    const { showGroup, highlightedIndex } = this.state;
    if (e.key === 'Enter') {
      const groupedItems = this.getGroupedItems();
      const selected = groupedItems[highlightedIndex];
      if (selected && selected.groupParent) {
        e.persist();
        e.preventDownshiftDefault = true;
        this.setState({
          showGroup:
            showGroup === selected.groupParent ? '' : selected.groupParent
        });
      }
    }
  };

  buildInputProps = getInputProps => {
    const { isOpen } = this.state;
    const { searchable, placeholder } = this.props;
    return getInputProps({
      placeholder: isOpen && searchable ? placeholder : '',
      onClick: this.onInputClick,
      readOnly: !isOpen || !searchable,
      onKeyDown: e => this.handleKeyEnter(e)
    });
  };

  checkModalClosing = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen, showGroup, inputValue, highlightedIndex } = this.state;
    return createElement(Component, {
      ...this.props,
      isOpen,
      showGroup,
      inputValue,
      highlightedIndex,
      checkModalClosing: this.checkModalClosing,
      handleStateChange: this.handleStateChange,
      onInputClick: this.onInputClick,
      onSelectorClick: this.onSelectorClick,
      handleClearSelection: this.handleClearSelection,
      buildInputProps: this.buildInputProps,
      toggleOpenGroup: this.toggleOpenGroup,
      handleOnChange: this.handleOnChange,
      items: this.getGroupedItems()
    });
  }
}

DropdownContainer.propTypes = {
  searchable: PropTypes.bool,
  multiselect: PropTypes.bool,
  options: PropTypes.array,
  groupKey: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.array
};

DropdownContainer.defaultProps = {
  searchable: false,
  multiselect: false,
  options: [],
  values: [],
  groupKey: undefined,
  placeholder: undefined
};

export default connect(mapStateToProps, null)(DropdownContainer);
