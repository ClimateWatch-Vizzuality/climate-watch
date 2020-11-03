import React, { PureComponent } from 'react';
import cx from 'classnames';
import { isPageContained } from 'utils/navigation';

import styles from './key-visualizations-table-styles.scss';

class KeyVisualizationsTable extends PureComponent {
  render() {
    return (
      <div>
        <div
          className={cx(styles.titleContainer, {
            [styles.containedButtonGroup]: isPageContained
          })}
        >
          {!isPageContained && <h2 className={styles.title}>Data Library</h2>}
        </div>
      </div>
    );
  }
}

export default KeyVisualizationsTable;
