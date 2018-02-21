import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import iconBarchart from 'assets/icons/barchart.svg';

const SidebarToolbarPLugin = ({ trigerTool }) => (
  <button onClick={trigerTool}>
    <Icon icon={iconBarchart} />
  </button>
);

SidebarToolbarPLugin.propTypes = {
  trigerTool: PropTypes.func
};

export default SidebarToolbarPLugin;
