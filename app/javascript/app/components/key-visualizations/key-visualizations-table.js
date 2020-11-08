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
  getGeographySelected
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
    geographySelected: getGeographySelected(kvt)
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
    this.updateUrlParam({ name: 'topic', value: topic.value }, false);
    handleAnalytics('Key visualizations', 'Topic selected', topic.label);
  };

  handleGeographyChange = geography => {
    this.updateUrlParam({ name: 'geography', value: geography.value }, false);
    handleAnalytics(
      'Key visualizations',
      'Geography selected',
      geography.label
    );
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
      handleGeographyChange: this.handleGeographyChange
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
