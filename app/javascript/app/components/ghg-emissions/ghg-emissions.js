import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { getLocationParamUpdated } from 'utils/navigation';
import { handleAnalytics } from 'utils/analytics';

import { actions } from 'components/modal-metadata';

import GhgEmissionsComponent from './ghg-emissions-component';
import { getGHGEmissions } from './ghg-emissions-selectors';

class GhgEmissionsContainer extends PureComponent {
  componentDidUpdate() {
    const { search, sourceSelected, versionSelected } = this.props;
    if (!(search && search.source) && sourceSelected) {
      this.updateUrlParam({ name: 'source', value: sourceSelected.value });
    }
    if (!(search && search.version) && versionSelected) {
      this.updateUrlParam({ name: 'version', value: versionSelected.value });
    }
  }

  handleSourceChange = category => {
    this.updateUrlParam([{ name: 'source', value: category.value }]);
    handleAnalytics('Historical Emissions', 'Source selected', category.label);
  };

  handleBreakByChange = breakBy => {
    const { versionSelected, sourceSelected } = this.props;
    const params = [
      { name: 'source', value: sourceSelected.value },
      { name: 'breakBy', value: breakBy.value },
      { name: 'version', value: versionSelected.value }
    ];
    this.updateUrlParam(params, true);
    handleAnalytics('Historical Emissions', 'Break by selected', breakBy.label);
  };

  handleVersionChange = version => {
    this.updateUrlParam({ name: 'version', value: version.value });
    handleAnalytics('Historical Emissions', 'version selected', version.label);
  };

  handleFilterChange = filters => {
    const oldFilters = this.props.filtersSelected;
    const removing = filters.length < oldFilters.length;
    const selectedFilter = filters
      .filter(x => oldFilters.indexOf(x) === -1)
      .concat(oldFilters.filter(x => filters.indexOf(x) === -1))[0];
    const filtersParam = [];
    if (!removing && selectedFilter.groupId === 'regions') {
      filtersParam.push(selectedFilter.iso);
      selectedFilter.members.forEach(m => filtersParam.push(m));
    } else if (selectedFilter.groupId !== 'regions') {
      filters.forEach(filter => {
        if (filter.groupId !== 'regions') {
          filtersParam.push(
            this.props.breakSelected.value === 'location'
              ? filter.iso
              : filter.value
          );
        }
      });
    }
    this.updateUrlParam({ name: 'filter', value: filtersParam.toString() });
    const selectedFilterLabels = filters.map(f => f.label);
    if (selectedFilterLabels.length > 0) {
      handleAnalytics(
        'Historical Emissions',
        'Filter by',
        selectedFilterLabels.toString()
      );
    }
  };

  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  handleInfoClick = () => {
    const { source } = this.props.sourceSelected;
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
        handleSourceChange={this.handleSourceChange}
        handleVersionChange={this.handleVersionChange}
        handleBreakByChange={this.handleBreakByChange}
        handleFilterChange={this.handleFilterChange}
        handleInfoClick={this.handleInfoClick}
      />
    );
  }
}

GhgEmissionsContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  breakSelected: PropTypes.object,
  sourceSelected: PropTypes.object,
  versionSelected: PropTypes.object,
  setModalMetadata: PropTypes.func.isRequired,
  filtersSelected: PropTypes.array,
  search: PropTypes.object
};

GhgEmissionsContainer.defaultProps = {
  sourceSelected: null
};

export default withRouter(
  connect(getGHGEmissions, actions)(GhgEmissionsContainer)
);
