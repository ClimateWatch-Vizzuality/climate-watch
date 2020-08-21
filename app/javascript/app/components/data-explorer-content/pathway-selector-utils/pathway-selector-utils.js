import uniqBy from 'lodash/uniqBy';

export function getPathwaysModelOptions(query, filtersMeta, filter) {
  if (!query || !query.locations || !query.locations[0]) {
    return filtersMeta[filter];
  }
  const queryLocation = query.locations[0];
  const selectedModelId = query.models && query.models[0];
  const locationsSelected = filtersMeta.locations.find(
    location => location.id === queryLocation
  );
  const modelSelected = filtersMeta.models.filter(
    model => model.id === selectedModelId
  );
  const locationHasModel = modelSelected.find(model =>
    model.geographic_coverage.includes(locationsSelected.name)
  );
  if (modelSelected.length && !locationHasModel) return filtersMeta[filter];
  return filtersMeta[filter].filter(model =>
    model.geographic_coverage.includes(locationsSelected.name)
  );
}

export function getPathwaysScenarioOptions(query, filtersMeta, filter) {
  if (!query || !query.models || !query.models[0]) return filtersMeta[filter];
  const selectedModelId = query.models[0];
  return filtersMeta[filter].filter(
    scenario => scenario.model.id === selectedModelId
  );
}

export function getPathwaysCategoryOptions(query, filtersMeta) {
  if (!query || !query.scenarios || !query.scenarios[0]) {
    return filtersMeta.categories.filter(c => c.parent_id === null);
  }
  const selectedScenarioId = query.scenarios[0];
  const scenarioIndicatorsIds = filtersMeta.scenarios.find(
    sc => sc.id === selectedScenarioId
  ).indicator_ids;

  const categories = scenarioIndicatorsIds.map(indId => {
    const category = filtersMeta.indicators.find(ind => ind.id === indId)
      .category;
    return filtersMeta.categories.find(({ id }) => id === category.id);
  });
  return uniqBy(categories, 'id');
}

export function getPathwaysSubcategoryOptions(query, filtersMeta, category) {
  if (!query || !query.categories || !query.categories[0]) return [];
  const selectedCategory = category.id;
  const selectedSubcategories = query.categories[0];
  const subcategories = filtersMeta.categories.filter(
    c => c.parent_id !== null
  );
  const subcategoriesInCategory = uniqBy(subcategories, 'id').filter(
    subc => subc.parent_id === selectedCategory
  );
  return subcategoriesInCategory.length > 0
    ? subcategoriesInCategory
    : [subcategories.find(subc => subc.id === selectedSubcategories)];
}

export function getPathwaysIndicatorsOptions(query, filtersMeta, filter) {
  if (!query || !query.categories || !query.categories[0]) {
    return filtersMeta[filter];
  }
  const selectedCategories = query.categories[0];
  const subcategories = filtersMeta.indicators.filter(
    indicator => indicator.subcategory.id === selectedCategories
  );
  const categories = filtersMeta.indicators.filter(
    indicator => indicator.category.id === selectedCategories
  );
  return (
    (subcategories.length > 0 && uniqBy(subcategories, 'id')) || categories
  );
}
