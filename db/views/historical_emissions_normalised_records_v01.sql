SELECT
  id,
  data_source_id,
  gwp_id,
  location_id,
  sector_id,
  gas_id,
  (JSONB_ARRAY_ELEMENTS(emissions)->>'year')::INT AS year,
  JSONB_ARRAY_ELEMENTS(emissions)->>'value' AS value
FROM historical_emissions_records
