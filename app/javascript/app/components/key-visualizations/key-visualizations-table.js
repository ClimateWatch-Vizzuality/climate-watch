import { PureComponent, createElement } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import KeyVisualizationsTable from './key-visualizations-table-component';
import {
  getGeographyOptions,
  getTagOptions,
  getTopicOptions
} from './key-visualizations-table-selectors';

const mapStateToProps = state => {
  const { data } = state.keyVisualizations;
  const options = {
    tags: getTagOptions(state),
    topics: getTopicOptions(state),
    geographies: getGeographyOptions(state)
  };

  return {
    data,
    options
  };
};

class KeyVisualizationsTableContainer extends PureComponent {
  render() {
    return createElement(KeyVisualizationsTable, {
      ...this.props
    });
  }
}

export default withRouter(
  connect(mapStateToProps, null)(KeyVisualizationsTableContainer)
);
