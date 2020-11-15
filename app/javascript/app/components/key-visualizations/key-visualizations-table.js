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
  getGeographiesSelected
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
    geographiesSelected: getGeographiesSelected(kvt)
  };
};

class KeyVisualizationsTableContainer extends PureComponent {
  handleTagsChange = tags => {
    const tagValues = tags.map(t => t.value);
    this.updateUrlParam({ name: 'tags', value: tagValues.toString() });

    if (tags.length > 0) {
      handleAnalytics(
        'Key visualizations',
        'Topic selected',
        tagValues.toString()
      );
    }
  };

  handleTopicChange = topic => {
    const value = topic ? topic.value : null;
    this.updateUrlParam({ name: 'topic', value }, false);

    if (value) {
      handleAnalytics('Key visualizations', 'Topic selected', topic.label);
    }
  };

  handleGeographiesChange = geographies => {
    const geoValues = geographies.map(g => g.value);
    this.updateUrlParam({ name: 'geographies', value: geoValues.toString() });

    if (geographies.length > 0) {
      handleAnalytics(
        'Key visualizations',
        'Geography selected',
        geoValues.toString()
      );
    }
  };

  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  render() {
    return createElement(KeyVisualizationsTable, {
      ...this.props,
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
