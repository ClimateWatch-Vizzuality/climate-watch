import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AnchorNav from 'components/anchor-nav';
import styles from './query-menu-styles.scss';

class QueryMenu extends Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <AnchorNav
        useRoutes
        className={styles.nav}
        linkClassName={styles.link}
        links={this.props.links}
      />
    );
  }
}

QueryMenu.propTypes = {
  links: PropTypes.array.isRequired
};

export default QueryMenu;
