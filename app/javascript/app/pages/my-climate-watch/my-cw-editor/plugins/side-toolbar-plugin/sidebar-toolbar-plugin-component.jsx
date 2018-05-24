import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import Button from 'components/button';
import graphIcon from 'assets/icons/graph.svg';

import styles from './side-toolbar-theme';

const SidebarToolbarPLugin = ({ trigerTool }) => (
  <Button className={styles.btn} onClick={trigerTool}>
    <Icon icon={graphIcon} className={styles.icon} />
  </Button>
);

SidebarToolbarPLugin.propTypes = {
  trigerTool: PropTypes.func
};

export default SidebarToolbarPLugin;
