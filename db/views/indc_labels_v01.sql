SELECT
  'cait' || id AS id,
  'cait'::text AS source,
  'cait' || indicator_id as indicator_id,
  name,
  index
FROM cait_indc_labels
