import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';
import cx from 'classnames';
import { Dropdown } from 'cw-components';
import KeyVisualizationsProvider from 'providers/key-visualizations-provider/key-visualizations-provider';
import { isPageContained } from 'utils/navigation';
import dropdownTheme from 'styles/themes/dropdown/react-selectize.scss';

import styles from './key-visualizations-table-styles.scss';

class KeyVisualizationsTable extends PureComponent {
  render() {
    const {
      // data,
      options
    } = this.props;

    const renderDropdown = (label, field) => (
      <Dropdown
        key={field}
        field={label || startCase(field)}
        placeholder={`Filter by ${startCase(field)}`}
        options={options[field] || []}
        hideResetButton
        theme={dropdownTheme}
      />
    );

    return (
      <div>
        <div
          className={cx(styles.titleContainer, {
            [styles.containedButtonGroup]: isPageContained
          })}
        >
          <KeyVisualizationsProvider />
          {!isPageContained && <h2 className={styles.title}>Data Library</h2>}
        </div>
        <div className={cx(styles.col4)}>
          {renderDropdown('Topic', 'topics')}
        </div>
      </div>
    );
  }
}

KeyVisualizationsTable.propTypes = {
  // data: PropTypes.array,
  options: PropTypes.object
};

export default KeyVisualizationsTable;
