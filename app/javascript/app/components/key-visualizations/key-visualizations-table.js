import { createElement, PureComponent } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';
import { handleAnalytics } from 'utils/analytics';
import { actions as modalActions } from 'components/modal-metadata';
import KeyVisualizationsTable from './key-visualizations-table-component';
import {
  getFormattedKeyVisualizations,
  getGeographyOptions,
  getTagOptions,
  getTopicOptions,
  getTagsSelected,
  getTopicSelected,
  getGeographiesSelected,
  getVisualizationSelected
} from './key-visualizations-table-selectors';

const mapStateToProps = (state, { location }) => {
  const search = qs.parse(location.search);
  const kvt = {
    state,
    search
  };

  const options = {
    tags: getTagOptions(kvt),
    topics: getTopicOptions(kvt),
    geographies: getGeographyOptions(kvt)
  };

  return {
    data: getFormattedKeyVisualizations(kvt),
    options,
    tagsSelected: getTagsSelected(kvt),
    topicSelected: getTopicSelected(kvt),
    geographiesSelected: getGeographiesSelected(kvt),
    visualizationSelected: getVisualizationSelected(kvt)
  };
};

class KeyVisualizationsTableContainer extends PureComponent {
  onCardClick = (visualization, remove) => {
    // Hack to get the Flourish embeds to load correctly
    window.FlourishLoaded = false;

    if (remove) {
      this.updateUrlParam({ name: 'visualization' });
    } else {
      this.updateUrlParam({ name: 'visualization', value: visualization.id });
    }
  };

  onInfoClick = visualization => {
    const { setModalMetadata } = this.props;

    setModalMetadata({
      customTitle: visualization.title,
      category: 'Key Visualizations',
      slugs: visualization.data_sources,
      open: true
    });
  };

  onDownloadData = visualization => {
    location.href = visualization.data_download_url;
  };

  onSaveImage = visualization => {
    window.open(visualization.image_download_url);
  };

  handleTagsChange = tags => {
    if (tags.length > 0) {
      const tagValues = tags.map(t => t.value);
      this.updateUrlParam({ name: 'tags', value: tagValues.toString() });

      handleAnalytics(
        'Key visualizations',
        'Topic selected',
        tagValues.toString()
      );
    } else {
      this.updateUrlParam({ name: 'tags' });
    }
  };

  handleGeographiesChange = geographies => {
    if (geographies.length > 0) {
      const geoValues = geographies.map(g => g.value);
      this.updateUrlParam({ name: 'geographies', value: geoValues.toString() });

      handleAnalytics(
        'Key visualizations',
        'Geography selected',
        geoValues.toString()
      );
    } else {
      this.updateUrlParam({ name: 'geographies' });
    }
  };

  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  handleTopicChange = topic => {
    if (topic) {
      this.updateUrlParam({ name: 'topic', value: topic.value });
      handleAnalytics('Key visualizations', 'Topic selected', topic.label);
    } else {
      this.updateUrlParam({ name: 'topic' });
    }
  };

  render() {
    return createElement(KeyVisualizationsTable, {
      ...this.props,
      onCardClick: this.onCardClick,
      onInfoClick: this.onInfoClick,
      onDownloadData: this.onDownloadData,
      onSaveImage: this.onSaveImage,
      handleTagsChange: this.handleTagsChange,
      handleTopicChange: this.handleTopicChange,
      handleGeographiesChange: this.handleGeographiesChange
    });
  }
}

KeyVisualizationsTableContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  setModalMetadata: PropTypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, { ...modalActions })(KeyVisualizationsTableContainer)
);
