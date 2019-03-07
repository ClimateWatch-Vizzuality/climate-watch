import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { getLocationParamUpdated } from 'utils/navigation';
import { handleAnalytics } from 'utils/analytics';
import qs from 'query-string';
import camelCase from 'lodash/camelCase';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import upperFirst from 'lodash/upperFirst';
import { actions } from 'components/modal-metadata';

import GhgEmissionsComponent from './ghg-emissions-component';
import { getGHGEmissions } from './ghg-emissions-selectors/ghg-emissions-selectors';

const mapStateToProps = (state, props) => {
  const { location } = props;
  const search = location && location.search && qs.parse(location.search);
  return getGHGEmissions(state, { ...props, search });
};

class GhgEmissionsContainer extends PureComponent {
  componentDidUpdate() {
    const { search, selected } = this.props;
    const { sourceSelected } = selected;
    if (!(search && search.source) && sourceSelected) {
      this.updateUrlParam({ name: 'source', value: sourceSelected.value });
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
    this.updateUrlParam([
      { name: 'source', value: category.value },
      { name: 'sectors', value: null },
      { name: 'gases', value: null }
    ]);
    handleAnalytics('Historical Emissions', 'Source selected', category.label);
  };

  handleBreakByChange = breakBy => {
    this.updateUrlParam({ name: 'breakBy', value: breakBy.value });
    handleAnalytics('Historical Emissions', 'Break by selected', breakBy.label);
  };

  handleChartTypeChange = type => {
    this.updateUrlParam({ name: 'chartType', value: type.value });
    handleAnalytics('Chart Type', 'chart type selected', type.label);
  };

  compressFiltersIfNecessary = (field, filters) => {
    const correctFields = ['regions', 'sectors'];
    let updatedFilters = filters;
    if (correctFields.includes(field)) {
      const { selected } = this.props;
      const optionsSelected = selected[`${field}Selected`];
      const shouldCompress =
        optionsSelected.length === 1 &&
        optionsSelected[0].expandsTo &&
        optionsSelected[0].expandsTo.length;
      if (shouldCompress) {
        updatedFilters = [...optionsSelected, filters[filters.length - 1]];
      }
    }
    return updatedFilters;
  };

  handleFilterChange = (field, filters) => {
    let values;
    const updatedFilters = this.compressFiltersIfNecessary(field, filters);

    if (isArray(updatedFilters)) {
      values = updatedFilters.map(v => v.value).join(',');
    } else {
      values = updatedFilters.value;
    }

    this.updateUrlParam({
      name: [field],
      value: isEmpty(values) ? null : values
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
    let { label: source } = selected.sourcesSelected || {};
    if (source) {
      if (source.startsWith('UNFCCC')) source = 'UNFCCC';
      const slugs = `historical_emissions_${source}`;
      this.props.setModalMetadata({
        category: 'Historical Emissions',
        slugs,
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
  legendSelected: PropTypes.array,
  search: PropTypes.object
};

GhgEmissionsContainer.defaultProps = {
  selected: undefined,
  search: undefined
};

export default withRouter(connect(mapStateToProps, actions)(GhgEmissionsContainer));
