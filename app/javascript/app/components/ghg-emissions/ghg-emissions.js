import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { getLocationParamUpdated } from 'utils/navigation';
import { handleAnalytics } from 'utils/analytics';
import qs from 'query-string';
import castArray from 'lodash/castArray';
import { actions } from 'components/modal-metadata';

import GhgEmissionsComponent from './ghg-emissions-component';
import { getGHGEmissions } from './ghg-emissions-selectors/ghg-emissions-selectors';

const mapStateToProps = (state, props) => {
  const { location } = props;
  const search = location && location.search && qs.parse(location.search);
  return getGHGEmissions(state, { ...props, search });
};

function GhgEmissionsContainer(props) {
  const { search, selected, setModalMetadata, history, location } = props;
  useEffect(() => {
    const { sourceSelected } = selected;
    if (!(search && search.source) && sourceSelected) {
      updateUrlParam({ name: 'source', value: sourceSelected.value });
    }
  }, []);

  const handleSourcesChange = category => {
    updateUrlParam([
      { name: 'source', value: category.value },
      { name: 'sectors', value: null },
      { name: 'gases', value: null }
    ]);
    handleAnalytics('Historical Emissions', 'Source selected', category.label);
  };

  const handleBreakByChange = breakBy => {
    updateUrlParam({ name: 'breakBy', value: breakBy.value });
    handleAnalytics('Historical Emissions', 'Break by selected', breakBy.label);
  };

  const handleChartTypeChange = type => {
    updateUrlParam({ name: 'chartType', value: type.value });
    handleAnalytics('Chart Type', 'chart type selected', type.label);
  };

  const handleFilterChange = (field, filters) => {
    updateUrlParam({
      name: [field],
      value: castArray(filters)
        .map(v => v.value)
        .join(',')
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

  const handleChange = (field, optionSelected) => {
    if (['regions', 'sectors', 'gases'].includes(field)) {
      return handleFilterChange(field, optionSelected);
    }
    const changeFunctions = {
      sources: handleSourcesChange,
      breakBy: handleBreakByChange,
      chartType: handleChartTypeChange
    };
    return changeFunctions[field](optionSelected);
  };

  const updateUrlParam = (params, clear) => {
    history.replace(getLocationParamUpdated(location, params, clear));
  };

  const handleInfoClick = () => {
    let { label: source } = selected.sourcesSelected || {};
    if (source) {
      if (source.startsWith('UNFCCC')) source = 'UNFCCC';
      const slugs = `historical_emissions_${source}`;
      setModalMetadata({
        category: 'Historical Emissions',
        slugs,
        open: true
      });
    }
  };

  return (
    <GhgEmissionsComponent
      {...props}
      updateUrlParam={updateUrlParam}
      handleChange={handleChange}
      handleInfoClick={handleInfoClick}
    />
  );
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

export default withRouter(
  connect(mapStateToProps, actions)(GhgEmissionsContainer)
);
