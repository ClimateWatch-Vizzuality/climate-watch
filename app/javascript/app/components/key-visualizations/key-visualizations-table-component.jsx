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
    const { data, topicSelected } = this.props;
    let filtered = data;

    if (topicSelected) {
      filtered = filtered.filter(
        item => item.topic.value === topicSelected.value
      );
    }

    return filtered.map(item => (
      <KeyVisualizationCard key={`kvc${item.id}`} visualization={item} />
    ));
  }

  render() {
    const {
      options,
      handleTagsChange,
      handleTopicChange,
      handleGeographiesChange,
      tagsSelected,
      topicSelected,
      geographiesSelected
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
          <MultiSelect
            label="Geographies"
            options={options.geographies || []}
            values={geographiesSelected || []}
            onMultiValueChange={handleGeographiesChange}
          />
          <Dropdown
            label="Topic"
            options={options.topics}
            placeholder="Select a topic"
            onValueChange={handleTopicChange}
            value={topicSelected}
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
  geographiesSelected: PropTypes.array,
  topicSelected: PropTypes.object,
  handleTagsChange: PropTypes.func.isRequired,
  handleTopicChange: PropTypes.func.isRequired,
  handleGeographiesChange: PropTypes.func.isRequired
};

export default KeyVisualizationsTable;