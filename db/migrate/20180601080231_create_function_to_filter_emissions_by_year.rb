class CreateFunctionToFilterEmissionsByYear < ActiveRecord::Migration[5.1]
  def change
    sql =<<-SQL
      CREATE OR REPLACE FUNCTION public.emissions_filter_by_year_range(
        emissions jsonb,
        start_year integer,
        end_year integer)
          RETURNS jsonb
          LANGUAGE 'sql'
          IMMUTABLE
      AS $BODY$

      SELECT TO_JSONB(ARRAY_AGG(e)) FROM (
        SELECT e FROM (
          SELECT JSONB_ARRAY_ELEMENTS(emissions) e
        ) expanded_emissions
        WHERE (start_year IS NULL OR (e->>'year')::int >= start_year) AND
          (end_year IS NULL OR (e->>'year')::int <= end_year)
      ) ee

      $BODY$;
    SQL
    execute sql
  end
end
