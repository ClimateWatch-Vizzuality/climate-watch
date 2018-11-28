SELECT
  indc_values.id,
  indc_indicators.source_id,
  indc_sources.name AS source,
  locations.iso_code3 AS iso_code3,
  locations.wri_standard_name AS country,
  ARRAY_AGG(DISTINCT global_categories.category_id)::INTEGER[] AS global_categories_ids,
  ARRAY_TO_STRING(ARRAY_AGG(DISTINCT global_categories.name), ', ') AS global_category,
  ARRAY_AGG(DISTINCT overview_categories.category_id)::INTEGER[] AS overview_categories_ids,
  ARRAY_TO_STRING(ARRAY_AGG(DISTINCT overview_categories.name), ', ') AS overview_category,
  indc_values.sector_id,
  COALESCE(sectors.name, parent_sectors.name) AS sector,
  COALESCE(subsectors.name) AS subsector,
  indc_values.indicator_id,
  indc_indicators.slug AS indicator_slug,
  indc_indicators.name AS indicator_name,
  indc_values.value AS value
FROM "indc_values"
INNER JOIN "locations" ON "locations"."id" = "indc_values"."location_id"
INNER JOIN "indc_indicators" ON "indc_indicators"."id" = "indc_values"."indicator_id"
INNER JOIN "indc_sources" ON "indc_sources"."id" = "indc_indicators"."source_id"
LEFT JOIN (
  SELECT
    id,
    parent_id,
    name
  FROM indc_sectors
  WHERE parent_id IS NOT NULL
) subsectors ON sector_id = subsectors.id
LEFT JOIN (
  SELECT
    id,
    parent_id,
    name
  FROM indc_sectors
  WHERE parent_id IS NULL
) sectors ON sector_id = sectors.id
LEFT JOIN (
  SELECT
    id,
    parent_id,
    name
  FROM indc_sectors
  WHERE parent_id IS NULL
) parent_sectors ON subsectors.parent_id = parent_sectors.id
LEFT JOIN (
  SELECT
    ic.category_id,
    ic.indicator_id,
    c.name
  FROM indc_indicators_categories ic
  JOIN indc_categories c ON ic.category_id = c.id
  JOIN indc_category_types ct ON c.category_type_id = ct.id AND UPPER(ct.name) = 'GLOBAL'
) global_categories ON global_categories.indicator_id = indc_indicators.id
LEFT JOIN (
  SELECT
    ic.category_id,
    ic.indicator_id,
    c.name
  FROM indc_indicators_categories ic
  JOIN indc_categories c ON ic.category_id = c.id
  JOIN indc_category_types ct ON c.category_type_id = ct.id AND UPPER(ct.name) = 'OVERVIEW'
) overview_categories ON overview_categories.indicator_id = indc_indicators.id
GROUP BY
  indc_values.id,
  indc_indicators.source_id,
  indc_sources.name,
  locations.iso_code3,
  locations.wri_standard_name,
  COALESCE(sectors.name, parent_sectors.name),
  COALESCE(subsectors.name),
  indc_indicators.slug,
  indc_indicators.name,
  indc_values.value
ORDER BY locations.wri_standard_name ASC;
