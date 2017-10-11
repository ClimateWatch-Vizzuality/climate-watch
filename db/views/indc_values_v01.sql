SELECT
  'cait' || id AS id,
  'cait' AS source,
  location_id,
  'cait' || indicator_id AS indicator_id,
  'cait' || label_id AS label_id,
  null AS sector_id,
  value
FROM cait_indc_values
UNION ALL
SELECT
  'wb' || id AS id,
  'wb' AS source,
  location_id,
  'wb' || indicator_id AS indicator_id,
  null AS label_id,
  'wb' || sector_id AS sector_id,
  value
FROM wb_indc_values
