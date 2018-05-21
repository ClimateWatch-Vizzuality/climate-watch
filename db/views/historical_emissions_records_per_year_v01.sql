SELECT
  id,
  location_id,
  data_source_id,
  sector_id,
  gas_id,
  gwp_id,
  (e->>'year')::INT AS year,
  (e->>'value')::DOUBLE PRECISION AS value
FROM
  historical_emissions_records
  CROSS JOIN LATERAL JSONB_ARRAY_ELEMENTS(emissions) e (e);
