import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { toSelector } from './viz-creator-utils';
import VizCreatorComponent from './viz-creator-component';
import * as reducers from './viz-creator-reducers';
import * as actions from './viz-creator-actions';
import initialState from './viz-creator-initial-state';
import {
  updateCacheItemValue,
  visCreatorCache,
  clearCache,
  filterCache,
  updateTimeseriesCache
} from './viz-creator-cache';
import {
  datasetsSelector,
  visualisationsSelector,
  locationsSelector,
  modelsSelector,
  scenariosSelector,
  indicatorsSelector,
  categoriesSelector,
  subcategoriesSelector,
  yearsSelector,
  timeseriesSelector,
  hasDataSelector,
  chartDataSelector,
  getFormatFilters,
  getVisualisationType,
  getVisualisationOptions,
  getOnlyStackable,
  getPlaceholder
} from './viz-creator-selectors';

const mapStateToProps = ({ vizCreator }) => ({
  id: vizCreator.id,
  title: vizCreator.title,
  creatorIsEditing: vizCreator.creatorIsEditing,
  placeholder: getPlaceholder(vizCreator),
  description: vizCreator.description,
  creationStatus: vizCreator.creationStatus,
  datasets: datasetsSelector(vizCreator),
  visualisations: visualisationsSelector(vizCreator),
  visualisationType: getVisualisationType(vizCreator),
  visualisationOptions: getVisualisationOptions(vizCreator),
  locations: locationsSelector(vizCreator),
  models: modelsSelector(vizCreator),
  scenarios: scenariosSelector(vizCreator),
  indicators: indicatorsSelector(vizCreator),
  categories: categoriesSelector(vizCreator),
  subcategories: subcategoriesSelector(vizCreator),
  years: yearsSelector(vizCreator),
  timeseries: timeseriesSelector(vizCreator),
  hasData: hasDataSelector(vizCreator),
  chartData: chartDataSelector(vizCreator),
  onlyStackableIndicators: getOnlyStackable(vizCreator),
  filters: {
    locations: getFormatFilters('locations')(vizCreator),
    models: getFormatFilters('models')(vizCreator),
    scenarios: getFormatFilters('scenarios')(vizCreator),
    categories: getFormatFilters('categories')(vizCreator),
    subcategories: getFormatFilters('subcategories')(vizCreator),
    indicators: getFormatFilters('indicators')(vizCreator),
    years: getFormatFilters('years')(vizCreator)
  }
});

class VizCreator extends Component {
  constructor(props) {
    super(props);
    props.fetchDatasets();
  }

  componentWillReceiveProps(props) {
    const {
      datasets,
      visualisations,
      locations,
      models,
      scenarios,
      indicators,
      categories,
      subcategories,
      years,
      timeseries,
      onlyStackableIndicators,
      fetchVisualisations,
      fetchLocations,
      fetchModels,
      fetchScenarios,
      fetchCategories,
      fetchSubCategories,
      fetchIndicators,
      fetchYears,
      fetchTimeseries,
      selectModel,
      selectScenario,
      selectCategory,
      selectSubcategory,
      selectIndicator,
      selectYear
    } = props;

    if (!isEmpty(datasets.selected)) {
      if (!visualisations.loading && !visualisations.loaded) {
        fetchVisualisations(datasets.selected);
      }
      if (!isEmpty(visualisations.selected)) {
        if (!locations.loading && !locations.loaded) {
          // clearCache();
          fetchLocations(visualisations.selected);
        }
        if (!isEmpty(locations.selected)) {
          // if (filterCache('models')) {
          //   selectModel([]);
          // }
          // if (
          //   !isEmpty(visCreatorCache.models.selected) &&
          //   !models.loading &&
          //   !models.loaded
          // ) {
          //   selectModel(visCreatorCache.models.selected);
          // }
          if (!models.loading && !models.loaded) {
            fetchModels(locations.selected);
          }
          if (!isEmpty(models.selected)) {
            // if (filterCache('scenarios')) {
            //   selectScenario([]);
            // }
            // if (
            //   !isEmpty(visCreatorCache.scenarios.selected) &&
            //   !scenarios.loading &&
            //   !scenarios.loaded
            // ) {
            //   selectScenario(visCreatorCache.scenarios.selected);
            // }
            if (
              !scenarios.loading &&
              !scenarios.loaded
            ) {
              fetchScenarios(models.selected.value);
            }

            if (!isEmpty(scenarios.selected)) {
              // if (filterCache('categories')) {
              //   selectCategory([]);
              // }
              // if (
              //   !isEmpty(visCreatorCache.categories.selected) &&
              //   !categories.loading &&
              //   !categories.loaded
              // ) {
              //   selectCategory(visCreatorCache.categories.selected);
              // }
              if (
                !categories.loading &&
                !categories.loaded
              ) {
                fetchCategories({
                  locations: locations.selected,
                  scenarios: scenarios.selected
                });
              }

              if (!isEmpty(categories.selected)) {
                if (filterCache('subcategories')) {
                  selectSubcategory([]);
                }
                if (
                  !isEmpty(visCreatorCache.subcategories.selected) &&
                  !subcategories.loading &&
                  !subcategories.loaded
                ) {
                  selectSubcategory(visCreatorCache.subcategories.selected);
                }
                if (
                  isEmpty(subcategories.selected) &&
                  !subcategories.loading &&
                  !subcategories.loaded
                ) {
                  fetchSubCategories({
                    category: categories.selected,
                    locations: locations.selected,
                    scenarios: scenarios.selected
                  });
                }

                if (!isEmpty(subcategories.selected)) {
                  if (filterCache('indicators')) {
                    selectIndicator([]);
                  }
                  if (
                    !isEmpty(visCreatorCache.indicators.selected) &&
                    !indicators.loading &&
                    !indicators.loaded
                  ) {
                    selectIndicator(visCreatorCache.indicators.selected);
                  }
                  if (
                    isEmpty(indicators.selected) &&
                    !indicators.loading &&
                    !indicators.loaded
                  ) {
                    fetchIndicators({
                      subcategory: subcategories.selected.value,
                      locations: locations.selected,
                      scenarios: scenarios.selected,
                      stackable: onlyStackableIndicators
                    });
                  }
                  if (!isEmpty(indicators.selected)) {
                    filterCache('years');
                    updateTimeseriesCache(timeseries);
                    if (
                      !isEmpty(visCreatorCache.years.selected) &&
                      !years.loading &&
                      !years.loaded
                    ) {
                      selectYear(visCreatorCache.years.selected);
                    }
                    if (!years.loading && !years.loaded) {
                      fetchYears({
                        locations: locations.selected,
                        indicators: indicators.selected,
                        scenarios: scenarios.selected
                      });
                    }
                    if (!isEmpty(years.selected)) {
                      if (
                        !isEmpty(visCreatorCache.timeseries.selected) &&
                        !timeseries.loading &&
                        !timeseries.loaded
                      ) {
                        selectYear(visCreatorCache.years.selected);
                      }
                      if (!timeseries.loading && !timeseries.loaded) {
                        fetchTimeseries({
                          locations: locations.selected,
                          indicators: indicators.selected,
                          scenarios: scenarios.selected,
                          years: years.selected
                        });
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  handleFilterSelect = filter => {
    // updateCacheItemValue(filter);
    const actionName = toSelector(filter.type);
    if (this.props[actionName]) {
      const filterParsed = filter.multi
        ? filter.values
        : {
          value: filter.value,
          label: filter.label
        };
      this.props[actionName](filterParsed);
    }
  };

  render() {
    return createElement(VizCreatorComponent, {
      ...this.props,
      handleFilterSelect: this.handleFilterSelect
    });
  }
}

VizCreator.propTypes = {
  datasets: PropTypes.object.isRequired,
  visualisations: PropTypes.object.isRequired,
  locations: PropTypes.object.isRequired,
  models: PropTypes.object.isRequired,
  scenarios: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  subcategories: PropTypes.object.isRequired,
  indicators: PropTypes.object.isRequired,
  years: PropTypes.object.isRequired,
  timeseries: PropTypes.object,
  onlyStackableIndicators: PropTypes.bool,
  fetchDatasets: PropTypes.func.isRequired,
  fetchVisualisations: PropTypes.func.isRequired,
  fetchLocations: PropTypes.func.isRequired,
  fetchModels: PropTypes.func.isRequired,
  fetchScenarios: PropTypes.func.isRequired,
  fetchIndicators: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  fetchSubCategories: PropTypes.func.isRequired,
  fetchYears: PropTypes.func.isRequired,
  fetchTimeseries: PropTypes.func.isRequired,
  selectModel: PropTypes.func.isRequired,
  selectScenario: PropTypes.func.isRequired,
  selectCategory: PropTypes.func.isRequired,
  selectSubcategory: PropTypes.func.isRequired,
  selectIndicator: PropTypes.func.isRequired,
  selectYear: PropTypes.func.isRequired
};

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(VizCreator);
