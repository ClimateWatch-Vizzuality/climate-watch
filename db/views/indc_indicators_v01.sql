SELECT
  'cait' || id AS id,
  'cait' AS source,
  name,
  slug,
  null as description
FROM cait_indc_indicators
UNION ALL
SELECT
  'wb' || id AS id,
  'wb' AS source,
  name,
  code AS slug,
  description
FROM wb_indc_indicators
