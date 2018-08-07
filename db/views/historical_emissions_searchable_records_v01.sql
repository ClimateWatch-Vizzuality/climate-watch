SELECT
  records.id,
  records.data_source_id,
  data_sources.name AS data_source,
  gwp_id,
  gwps.name AS gwp,
  location_id,
  locations.iso_code3 AS iso_code3,
  locations.wri_standard_name AS region,
  sector_id,
  sectors.name AS sector,
  gas_id,
  gases.name AS gas,
  records_with_emissions_dict.emissions,
  emissions_dict
FROM historical_emissions_records records
JOIN historical_emissions_data_sources data_sources ON data_sources.id = records.data_source_id
JOIN historical_emissions_gwps gwps ON gwps.id = records.gwp_id
JOIN locations ON locations.id = records.location_id
JOIN historical_emissions_sectors sectors ON sectors.id = records.sector_id
JOIN historical_emissions_gases gases ON gases.id = records.gas_id
LEFT JOIN (
  SELECT
    id,
    JSONB_AGG(
        JSONB_BUILD_OBJECT(
            'year', year,
            'value', ROUND(value::NUMERIC, 2)
        )
    ) AS emissions,
    JSONB_OBJECT_AGG(
        year, ROUND(value::NUMERIC, 2)
    ) AS emissions_dict
  FROM historical_emissions_normalised_records
  GROUP BY id
) records_with_emissions_dict ON records.id = records_with_emissions_dict.id;
