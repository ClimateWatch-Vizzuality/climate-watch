import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { getLocationParamUpdated } from 'utils/navigation';
import { handleAnalytics } from 'utils/analytics';
import qs from 'query-string';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import isArray from 'lodash/isArray';
import { ALL_SELECTED, NO_ALL_SELECTED_COLUMNS } from 'data/constants';
import { actions } from 'components/modal-metadata';

import GhgEmissionsComponent from './ghg-emissions-component';
import { getGHGEmissions } from './ghg-emissions-selectors';

const mapStateToProps = (state, props) => {
  const { location } = props;
  const search = location && location.search && qs.parse(location.search);
  return getGHGEmissions(state, { ...props, search });
};

class GhgEmissionsContainer extends PureComponent {
  componentDidUpdate() {
    const { search, selected } = this.props;
    const { sourceSelected, versionSelected } = selected;
    if (!(search && search.source) && sourceSelected) {
      this.updateUrlParam({ name: 'source', value: sourceSelected.value });
    }
    if (!(search && search.version) && versionSelected) {
      this.updateUrlParam({ name: 'version', value: versionSelected.value });
    }
  }

  handleChange = (field, selected) => {
    if (['regions', 'sectors', 'gases'].includes(field)) {
      return this.handleFilterChange(field, selected);
    }
    const functionName = `handle${upperFirst(camelCase(field))}Change`;
    return this[functionName](selected);
  };

  handleSourcesChange = category => {
    this.updateUrlParam([{ name: 'source', value: category.value }]);
    handleAnalytics('Historical Emissions', 'Source selected', category.label);
  };

  handleBreakByChange = breakBy => {
    this.updateUrlParam({ name: 'breakBy', value: breakBy.value }, true);
    handleAnalytics('Historical Emissions', 'Break by selected', breakBy.label);
  };

  handleChartTypeChange = type => {
    this.updateUrlParam({ name: 'chartType', value: type.value });
    handleAnalytics('Chart Type', 'chart type selected', type.label);
  };

  handleFilterChange = (field, filters) => {
    let values;
    if (isArray(filters)) {
      if (
        !NO_ALL_SELECTED_COLUMNS.includes(field) &&
        (filters.length === 0 ||
          filters[filters.length - 1].label === ALL_SELECTED)
      ) {
        values = ALL_SELECTED;
      } else {
        values = filters
          .filter(v => v.value !== ALL_SELECTED)
          .map(v => v.value)
          .join(',');
      }
    } else {
      values = filters.value;
    }
    this.updateUrlParam({
      name: [field],
      value: values
    });

    const selectedFilterLabels = filters.map(f => f.label);
    if (selectedFilterLabels.length > 0) {
      handleAnalytics(
        'Historical Emissions',
        'Filter by',
        `${field}: ${selectedFilterLabels.toString()}`
      );
    }
  };

  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  handleInfoClick = () => {
    const { selected } = this.props;
    const { source } = selected.sourceSelected;
    if (source) {
      this.props.setModalMetadata({
        category: 'Historical Emissions',
        slugs: source,
        open: true
      });
    }
  };

  updateUrlParam = (params, clear) => {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  };

  render() {
    return (
      <GhgEmissionsComponent
        {...this.props}
        updateUrlParam={this.updateUrlParam}
        handleChange={this.handleChange}
        handleInfoClick={this.handleInfoClick}
      />
    );
  }
}

GhgEmissionsContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  setModalMetadata: PropTypes.func.isRequired,
  selected: PropTypes.object,
  search: PropTypes.object
};

GhgEmissionsContainer.defaultProps = {
  selected: undefined,
  search: undefined
};

export default withRouter(
  connect(mapStateToProps, actions)(GhgEmissionsContainer)
);
