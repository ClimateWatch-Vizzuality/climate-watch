SELECT
  'cait' || id AS id,
  'cait' AS source,
  name,
  slug,
  category_type
FROM cait_indc_categories
UNION ALL
SELECT
  'wb' || id AS id,
  'wb' AS source,
  name,
  slug,
  'overview' AS category_type
FROM wb_indc_categories

