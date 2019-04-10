SELECT
  records.id,
  records.data_source_id,
  data_sources.name AS data_source,
  location_id,
  locations.iso_code3 AS iso_code3,
  locations.wri_standard_name AS region,
  sector_id,
  sectors.name AS sector,
  gas_id,
  gases.name AS gas,
  records_emissions.emissions,
  emissions_dict
FROM historical_emissions_records records
JOIN historical_emissions_data_sources data_sources ON data_sources.id = records.data_source_id
JOIN locations ON locations.id = records.location_id
JOIN historical_emissions_sectors sectors ON sectors.id = records.sector_id
JOIN historical_emissions_gases gases ON gases.id = records.gas_id
LEFT JOIN historical_emissions_records_emissions records_emissions ON records.id = records_emissions.id;
