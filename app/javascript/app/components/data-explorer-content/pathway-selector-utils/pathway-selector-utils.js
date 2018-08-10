import uniqBy from 'lodash/uniqBy';

export function getPathwaysModelOptions(query, filtersMeta, filter) {
  if (!query || !query.locations) return filtersMeta[filter];
  const locationsSelected = filtersMeta.locations.filter(
    location => location.id === query.locations
  );
  const modelSelected = filtersMeta.models.filter(
    model => model.id === query.models
  );
  const locationHasModel = modelSelected.find(model =>
    model.geographic_coverage.includes(locationsSelected[0].name)
  );
  if (modelSelected.length && !locationHasModel) return filtersMeta[filter];
  return filtersMeta[filter].filter(model =>
    model.geographic_coverage.includes(locationsSelected[0].name)
  );
}

export function getPathwaysScenarioOptions(query, filtersMeta, filter) {
  if (!query || !query.models) return filtersMeta[filter];
  const selectedModelId = query.models;
  return filtersMeta[filter].filter(
    scenario => scenario.model.id === selectedModelId
  );
}

export function getPathwaysCategoryOptions(query, filtersMeta) {
  if (!query || !query.scenarios) {
    return filtersMeta.categories.filter(c => c.parent_id === null);
  }
  const selectedScenarioId = query.scenarios;
  const scenarioIndicatorsIds = filtersMeta.scenarios.find(
    sc => sc.id === selectedScenarioId
  ).indicator_ids;
  const categories = scenarioIndicatorsIds.map(
    indId => filtersMeta.indicators.find(ind => ind.id === indId).category
  );
  return uniqBy(categories, 'id');
}

export function getPathwaysSubcategoryOptions(query, filtersMeta) {
  if (!query || !query.categories) return [];
  const subcategories = filtersMeta.categories.filter(
    c => c.parent_id !== null
  );
  const subcategoriesInCategory = uniqBy(subcategories, 'id').filter(
    subc => subc.parent_id === query.categories
  );
  return (
    (subcategoriesInCategory.length && subcategoriesInCategory) || [
      subcategories.find(subc => subc.id === query.categories)
    ]
  );
}

export function getPathwaysIndicatorsOptions(query, filtersMeta, filter) {
  if (!query || !query.categories) return filtersMeta[filter];
  const subcategories = filtersMeta.indicators.filter(
    indicator => indicator.subcategory.id === query.categories
  );
  const categories = filtersMeta.indicators.filter(
    indicator => indicator.category.id === query.categories
  );
  return (subcategories.length && uniqBy(subcategories, 'id')) || categories;
}
