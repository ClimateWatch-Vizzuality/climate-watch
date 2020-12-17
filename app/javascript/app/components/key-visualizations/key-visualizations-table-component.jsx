import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Dropdown from 'components/dropdown';
import MultiSelect from 'components/multiselect';
import { findIndex, intersectionBy } from 'lodash';
import KeyVisualizationsProvider from 'providers/key-visualizations-provider/key-visualizations-provider';
import { isPageContained } from 'utils/navigation';
import { getGridElementPosition } from 'app/utils';
import KeyVisualizationCard from './key-visualization-card/key-visualization-card-component';

import styles from './key-visualizations-table-styles.scss';
import KeyVisualizationPreview from './key-visualization-preview/key-visualization-preview-component';

class KeyVisualizationsTable extends PureComponent {
  filteredData() {
    const {
      data,
      tagsSelected,
      geographiesSelected,
      topicSelected
    } = this.props;

    let filtered = data;

    filtered = filtered.filter(item => {
      const includedTags = intersectionBy(
        tagsSelected,
        item.tags,
        t => t.value
      );

      const includedGeos = intersectionBy(
        geographiesSelected,
        item.geographies,
        g => g.value
      );

      return includedTags.length > 0 && includedGeos.length > 0;
    });

    if (topicSelected) {
      filtered = filtered.filter(
        item => item.topic.value === topicSelected.value
      );
    }

    return filtered;
  }

  filteredVisualizations() {
    const { onCardClick, visualizationSelected } = this.props;

    return this.filteredData().map(item => (
      <KeyVisualizationCard
        key={`kvc${item.id}`}
        visualization={item}
        selected={visualizationSelected}
        onCardClick={onCardClick}
      />
    ));
  }

  previewRowPosition() {
    const { visualizationSelected } = this.props;

    if (!visualizationSelected) {
      return 1;
    }

    const gridEl = document.getElementById('visualization-cards');
    const selectedIndex = findIndex(
      this.filteredData(),
      item => item.id === visualizationSelected.id
    );

    const position = getGridElementPosition(gridEl, selectedIndex);
    return position ? position.row + 1 : 1;
  }

  render() {
    const {
      options,
      handleTagsChange,
      handleTopicChange,
      handleGeographiesChange,
      tagsSelected,
      topicSelected,
      geographiesSelected,
      visualizationSelected,
      onInfoClick,
      onDownloadData,
      onSaveImage
    } = this.props;

    return (
      <div>
        <div
          className={cx(styles.titleContainer, {
            [styles.containedButtonGroup]: isPageContained
          })}
        >
          <KeyVisualizationsProvider />
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
          <div className={styles.cards} id="visualization-cards">
            <KeyVisualizationPreview
              visualization={visualizationSelected}
              row={this.previewRowPosition()}
              onInfoClick={onInfoClick}
              onDownloadData={onDownloadData}
              onSaveImage={onSaveImage}
            />
            {this.filteredVisualizations()}
          </div>
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
  visualizationSelected: PropTypes.object,
  handleTagsChange: PropTypes.func.isRequired,
  handleTopicChange: PropTypes.func.isRequired,
  handleGeographiesChange: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onDownloadData: PropTypes.func.isRequired,
  onInfoClick: PropTypes.func.isRequired,
  onSaveImage: PropTypes.func.isRequired
};

export default KeyVisualizationsTable;
