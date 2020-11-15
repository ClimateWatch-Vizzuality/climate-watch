import { createElement, PureComponent } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';
import { handleAnalytics } from 'utils/analytics';
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
    if (remove) {
      this.updateUrlParam({ name: 'visualization' });
    } else {
      this.updateUrlParam({ name: 'visualization', value: visualization.id });
    }
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

  handleTopicChange = topic => {
    if (topic) {
      this.updateUrlParam({ name: 'topic', value: topic.value });
      handleAnalytics('Key visualizations', 'Topic selected', topic.label);
    } else {
      this.updateUrlParam({ name: 'topic' });
    }
  };

  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  render() {
    return createElement(KeyVisualizationsTable, {
      ...this.props,
      onCardClick: this.onCardClick,
      handleTagsChange: this.handleTagsChange,
      handleTopicChange: this.handleTopicChange,
      handleGeographiesChange: this.handleGeographiesChange
    });
  }
}

KeyVisualizationsTableContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(
  connect(mapStateToProps, null)(KeyVisualizationsTableContainer)
);
