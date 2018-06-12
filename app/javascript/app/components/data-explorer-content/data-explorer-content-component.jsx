import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// import styles from './data-explorer-content-styles.scss';

class DataExplorerContent extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { section } = this.props;
    return <div>Data Explorer Content: {section}</div>;
  }
}

DataExplorerContent.propTypes = {
  section: PropTypes.string.isRequired
};

export default DataExplorerContent;
