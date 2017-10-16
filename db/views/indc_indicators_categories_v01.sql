SELECT
  'cait' || id AS id,
  'cait' || indicator_id AS indicator_id,
  'cait' || category_id AS category_id,
  'cait' AS source
FROM cait_indc_indicators_categories
UNION ALL
SELECT
  'wb' || id AS id,
  'wb' || indicator_id AS indicator_id,
  'wb' || category_id AS category_id,
  'wb' AS source
FROM wb_indc_indicators_categories
