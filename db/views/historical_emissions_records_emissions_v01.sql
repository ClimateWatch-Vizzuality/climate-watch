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
  GROUP BY id;
  