import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Dropdown from 'components/dropdown';
import MultiSelect from 'components/multiselect';
import KeyVisualizationsProvider from 'providers/key-visualizations-provider/key-visualizations-provider';
import { isPageContained } from 'utils/navigation';
import KeyVisualizationCard from './key-visualization-card/key-visualization-card-component';

import styles from './key-visualizations-table-styles.scss';

class KeyVisualizationsTable extends PureComponent {
  filteredVisualizations() {
    const { data } = this.props;

    return data.map(item => (
      <KeyVisualizationCard key={`kvc${item.id}`} visualization={item} />
    ));
  }

  render() {
    const {
      options,
      handleTagsChange,
      handleTopicChange,
      handleGeographyChange,
      tagsSelected,
      topicSelected,
      geographySelected
    } = this.props;

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
        <div className={styles.col4}>
          <MultiSelect
            label="Tags"
            options={options.tags || []}
            values={tagsSelected || []}
            onMultiValueChange={handleTagsChange}
          />
          <Dropdown
            label="Topic"
            options={options.topics}
            onValueChange={handleTopicChange}
            value={topicSelected}
            hideResetButton
          />
          <Dropdown
            label="Geography"
            options={options.geographies}
            onValueChange={handleGeographyChange}
            value={geographySelected}
            hideResetButton
          />
        </div>
        <div className="grid-column-item">
          <div className={styles.cards}>{this.filteredVisualizations()}</div>
        </div>
      </div>
    );
  }
}

KeyVisualizationsTable.propTypes = {
  data: PropTypes.array,
  options: PropTypes.object,
  tagsSelected: PropTypes.array,
  topicSelected: PropTypes.object,
  geographySelected: PropTypes.object,
  handleTagsChange: PropTypes.func.isRequired,
  handleTopicChange: PropTypes.func.isRequired,
  handleGeographyChange: PropTypes.func.isRequired
};

export default KeyVisualizationsTable;
