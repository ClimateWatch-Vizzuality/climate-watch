import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import graphIcon from 'assets/icons/graph.svg';

import styles from './side-toolbar-theme';

const SidebarToolbarPLugin = ({ trigerTool }) => (
  <button onClick={trigerTool}>
    <Icon icon={graphIcon} className={styles.icon} />
  </button>
);

SidebarToolbarPLugin.propTypes = {
  trigerTool: PropTypes.func
};

export default SidebarToolbarPLugin;
