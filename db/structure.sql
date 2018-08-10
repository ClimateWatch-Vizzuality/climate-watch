SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: emissions_filter_by_year_range(jsonb, integer, integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION emissions_filter_by_year_range(emissions jsonb, start_year integer, end_year integer) RETURNS jsonb
    LANGUAGE sql IMMUTABLE
    AS $$

      SELECT TO_JSONB(ARRAY_AGG(e)) FROM (
        SELECT e FROM (
          SELECT JSONB_ARRAY_ELEMENTS(emissions) e
        ) expanded_emissions
        WHERE (start_year IS NULL OR (e->>'year')::int >= start_year) AND
          (end_year IS NULL OR (e->>'year')::int <= end_year)
      ) ee

      $$;


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: adaptation_values; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE adaptation_values (
    id bigint NOT NULL,
    variable_id bigint,
    location_id bigint,
    string_value text,
    number_value double precision,
    boolean_value boolean,
    absolute_rank integer,
    relative_rank double precision,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    year integer
);


--
-- Name: adaptation_values_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE adaptation_values_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: adaptation_values_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE adaptation_values_id_seq OWNED BY adaptation_values.id;


--
-- Name: adaptation_variables; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE adaptation_variables (
    id bigint NOT NULL,
    slug text,
    name text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: adaptation_variables_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE adaptation_variables_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: adaptation_variables_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE adaptation_variables_id_seq OWNED BY adaptation_variables.id;


--
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: historical_emissions_data_sources; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE historical_emissions_data_sources (
    id bigint NOT NULL,
    name text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: historical_emissions_data_sources_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE historical_emissions_data_sources_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: historical_emissions_data_sources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE historical_emissions_data_sources_id_seq OWNED BY historical_emissions_data_sources.id;


--
-- Name: historical_emissions_gases; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE historical_emissions_gases (
    id bigint NOT NULL,
    name text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: historical_emissions_gases_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE historical_emissions_gases_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: historical_emissions_gases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE historical_emissions_gases_id_seq OWNED BY historical_emissions_gases.id;


--
-- Name: historical_emissions_gwps; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE historical_emissions_gwps (
    id bigint NOT NULL,
    name text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: historical_emissions_gwps_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE historical_emissions_gwps_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: historical_emissions_gwps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE historical_emissions_gwps_id_seq OWNED BY historical_emissions_gwps.id;


--
-- Name: historical_emissions_records; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE historical_emissions_records (
    id bigint NOT NULL,
    location_id bigint,
    data_source_id bigint,
    sector_id bigint,
    gas_id bigint,
    emissions jsonb,
    gwp_id bigint
);


--
-- Name: historical_emissions_normalised_records; Type: MATERIALIZED VIEW; Schema: public; Owner: -
--

CREATE MATERIALIZED VIEW historical_emissions_normalised_records AS
 SELECT historical_emissions_records.id,
    historical_emissions_records.data_source_id,
    historical_emissions_records.gwp_id,
    historical_emissions_records.location_id,
    historical_emissions_records.sector_id,
    historical_emissions_records.gas_id,
    ((jsonb_array_elements(historical_emissions_records.emissions) ->> 'year'::text))::integer AS year,
    (jsonb_array_elements(historical_emissions_records.emissions) ->> 'value'::text) AS value
   FROM historical_emissions_records
  WITH NO DATA;


--
-- Name: historical_emissions_records_emissions; Type: MATERIALIZED VIEW; Schema: public; Owner: -
--

CREATE MATERIALIZED VIEW public.historical_emissions_records_emissions AS
 SELECT historical_emissions_normalised_records.id,
    jsonb_agg(jsonb_build_object('year', historical_emissions_normalised_records.year, 'value', round((historical_emissions_normalised_records.value)::numeric, 2))) AS emissions,
    jsonb_object_agg(historical_emissions_normalised_records.year, round((historical_emissions_normalised_records.value)::numeric, 2)) AS emissions_dict
   FROM public.historical_emissions_normalised_records
  GROUP BY historical_emissions_normalised_records.id
  WITH NO DATA;


--
-- Name: historical_emissions_records_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE historical_emissions_records_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: historical_emissions_records_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE historical_emissions_records_id_seq OWNED BY historical_emissions_records.id;


--
-- Name: historical_emissions_sectors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE historical_emissions_sectors (
    id bigint NOT NULL,
    parent_id bigint,
    data_source_id bigint,
    name text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    annex_type text
);


--
-- Name: locations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE locations (
    id bigint NOT NULL,
    iso_code3 text NOT NULL,
    pik_name text,
    cait_name text,
    ndcp_navigators_name text,
    wri_standard_name text NOT NULL,
    unfccc_group text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    iso_code2 text NOT NULL,
    location_type text NOT NULL,
    show_in_cw boolean DEFAULT true,
    topojson json,
    centroid jsonb
);


--
-- Name: historical_emissions_searchable_records; Type: MATERIALIZED VIEW; Schema: public; Owner: -
--

CREATE MATERIALIZED VIEW historical_emissions_searchable_records AS
 SELECT records.id,
    records.data_source_id,
    data_sources.name AS data_source,
    records.gwp_id,
    gwps.name AS gwp,
    records.location_id,
    locations.iso_code3,
    locations.wri_standard_name AS region,
    records.sector_id,
    sectors.name AS sector,
    records.gas_id,
    gases.name AS gas,
    records_emissions.emissions,
    records_emissions.emissions_dict
   FROM ((((((public.historical_emissions_records records
     JOIN public.historical_emissions_data_sources data_sources ON ((data_sources.id = records.data_source_id)))
     JOIN public.historical_emissions_gwps gwps ON ((gwps.id = records.gwp_id)))
     JOIN public.locations ON ((locations.id = records.location_id)))
     JOIN public.historical_emissions_sectors sectors ON ((sectors.id = records.sector_id)))
     JOIN public.historical_emissions_gases gases ON ((gases.id = records.gas_id)))
     LEFT JOIN public.historical_emissions_records_emissions records_emissions ON ((records.id = records_emissions.id)))
  WITH NO DATA;


--
-- Name: historical_emissions_sectors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE historical_emissions_sectors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: historical_emissions_sectors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE historical_emissions_sectors_id_seq OWNED BY historical_emissions_sectors.id;


--
-- Name: indc_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE indc_categories (
    id bigint NOT NULL,
    category_type_id bigint NOT NULL,
    parent_id bigint,
    slug text NOT NULL,
    name text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    "order" integer
);


--
-- Name: indc_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE indc_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: indc_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE indc_categories_id_seq OWNED BY indc_categories.id;


--
-- Name: indc_category_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE indc_category_types (
    id bigint NOT NULL,
    name text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: indc_category_types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE indc_category_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: indc_category_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE indc_category_types_id_seq OWNED BY indc_category_types.id;


--
-- Name: indc_indicators; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE indc_indicators (
    id bigint NOT NULL,
    source_id bigint NOT NULL,
    slug text NOT NULL,
    name text NOT NULL,
    description text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    "order" integer
);


--
-- Name: indc_indicators_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE indc_indicators_categories (
    id bigint NOT NULL,
    indicator_id bigint NOT NULL,
    category_id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: indc_indicators_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE indc_indicators_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: indc_indicators_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE indc_indicators_categories_id_seq OWNED BY indc_indicators_categories.id;


--
-- Name: indc_indicators_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE indc_indicators_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: indc_indicators_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE indc_indicators_id_seq OWNED BY indc_indicators.id;


--
-- Name: indc_labels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE indc_labels (
    id bigint NOT NULL,
    indicator_id bigint NOT NULL,
    value text NOT NULL,
    index integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: indc_labels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE indc_labels_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: indc_labels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE indc_labels_id_seq OWNED BY indc_labels.id;


--
-- Name: indc_sectors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE indc_sectors (
    id bigint NOT NULL,
    parent_id bigint,
    name text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: indc_sectors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE indc_sectors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: indc_sectors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE indc_sectors_id_seq OWNED BY indc_sectors.id;


--
-- Name: indc_sources; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE indc_sources (
    id bigint NOT NULL,
    name text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: indc_sources_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE indc_sources_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: indc_sources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE indc_sources_id_seq OWNED BY indc_sources.id;


--
-- Name: indc_submissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE indc_submissions (
    id bigint NOT NULL,
    location_id bigint NOT NULL,
    submission_type text NOT NULL,
    language text NOT NULL,
    submission_date date NOT NULL,
    url text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: indc_submissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE indc_submissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: indc_submissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE indc_submissions_id_seq OWNED BY indc_submissions.id;


--
-- Name: indc_values; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE indc_values (
    id bigint NOT NULL,
    indicator_id bigint NOT NULL,
    location_id bigint NOT NULL,
    sector_id bigint,
    label_id bigint,
    value text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: indc_values_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE indc_values_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: indc_values_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE indc_values_id_seq OWNED BY indc_values.id;


--
-- Name: location_members; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE location_members (
    id bigint NOT NULL,
    location_id bigint,
    member_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: location_members_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE location_members_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: location_members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE location_members_id_seq OWNED BY location_members.id;


--
-- Name: locations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE locations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE locations_id_seq OWNED BY locations.id;


--
-- Name: ndc_sdg_goals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE ndc_sdg_goals (
    id bigint NOT NULL,
    number text NOT NULL,
    title text NOT NULL,
    cw_title text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    colour text NOT NULL
);


--
-- Name: ndc_sdg_goals_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE ndc_sdg_goals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ndc_sdg_goals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE ndc_sdg_goals_id_seq OWNED BY ndc_sdg_goals.id;


--
-- Name: ndc_sdg_ndc_target_sectors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE ndc_sdg_ndc_target_sectors (
    id bigint NOT NULL,
    ndc_target_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    sector_id bigint
);


--
-- Name: ndc_sdg_ndc_target_sectors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE ndc_sdg_ndc_target_sectors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ndc_sdg_ndc_target_sectors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE ndc_sdg_ndc_target_sectors_id_seq OWNED BY ndc_sdg_ndc_target_sectors.id;


--
-- Name: ndc_sdg_ndc_targets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE ndc_sdg_ndc_targets (
    id bigint NOT NULL,
    ndc_id bigint,
    target_id bigint,
    indc_text text,
    status text,
    climate_response text,
    type_of_information text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    starts_at integer,
    ends_at integer
);


--
-- Name: ndc_sdg_ndc_targets_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE ndc_sdg_ndc_targets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ndc_sdg_ndc_targets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE ndc_sdg_ndc_targets_id_seq OWNED BY ndc_sdg_ndc_targets.id;


--
-- Name: ndc_sdg_sectors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE ndc_sdg_sectors (
    id bigint NOT NULL,
    name text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: ndc_sdg_sectors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE ndc_sdg_sectors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ndc_sdg_sectors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE ndc_sdg_sectors_id_seq OWNED BY ndc_sdg_sectors.id;


--
-- Name: ndc_sdg_targets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE ndc_sdg_targets (
    id bigint NOT NULL,
    number text NOT NULL,
    title text NOT NULL,
    goal_id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: ndc_sdg_targets_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE ndc_sdg_targets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ndc_sdg_targets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE ndc_sdg_targets_id_seq OWNED BY ndc_sdg_targets.id;


--
-- Name: ndcs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE ndcs (
    id bigint NOT NULL,
    location_id bigint,
    full_text text,
    full_text_tsv tsvector,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    document_type text DEFAULT 'ndc'::text,
    language text,
    translated boolean DEFAULT false
);


--
-- Name: ndcs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE ndcs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ndcs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE ndcs_id_seq OWNED BY ndcs.id;


--
-- Name: quantification_labels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE quantification_labels (
    id bigint NOT NULL,
    name text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: quantification_labels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE quantification_labels_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quantification_labels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE quantification_labels_id_seq OWNED BY quantification_labels.id;


--
-- Name: quantification_values; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE quantification_values (
    id bigint NOT NULL,
    location_id bigint,
    label_id bigint,
    year smallint,
    first_value double precision,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    second_value double precision
);


--
-- Name: quantification_values_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE quantification_values_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quantification_values_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE quantification_values_id_seq OWNED BY quantification_values.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE schema_migrations (
    version character varying NOT NULL
);


--
-- Name: socioeconomic_indicators; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE socioeconomic_indicators (
    id bigint NOT NULL,
    location_id bigint,
    year smallint NOT NULL,
    gdp bigint,
    gdp_rank smallint,
    gdp_per_capita double precision,
    gdp_per_capita_rank integer,
    population bigint,
    population_rank smallint,
    population_growth double precision,
    population_growth_rank smallint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: socioeconomic_indicators_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE socioeconomic_indicators_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: socioeconomic_indicators_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE socioeconomic_indicators_id_seq OWNED BY socioeconomic_indicators.id;


--
-- Name: stories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE stories (
    id bigint NOT NULL,
    title character varying,
    description text,
    published_at timestamp without time zone,
    background_image_url character varying,
    link character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    tags character varying[] DEFAULT '{}'::character varying[]
);


--
-- Name: stories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE stories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: stories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE stories_id_seq OWNED BY stories.id;


--
-- Name: timeline_documents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE timeline_documents (
    id bigint NOT NULL,
    source_id bigint,
    location_id bigint,
    link text,
    text text,
    date date,
    language text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: timeline_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE timeline_documents_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: timeline_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE timeline_documents_id_seq OWNED BY timeline_documents.id;


--
-- Name: timeline_notes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE timeline_notes (
    id bigint NOT NULL,
    document_id bigint,
    note text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: timeline_notes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE timeline_notes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: timeline_notes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE timeline_notes_id_seq OWNED BY timeline_notes.id;


--
-- Name: timeline_sources; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE timeline_sources (
    id bigint NOT NULL,
    name text
);


--
-- Name: timeline_sources_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE timeline_sources_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: timeline_sources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE timeline_sources_id_seq OWNED BY timeline_sources.id;


--
-- Name: user_stories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE user_stories (
    id bigint NOT NULL,
    title character varying,
    body jsonb,
    public boolean,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id integer
);


--
-- Name: user_stories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE user_stories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_stories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE user_stories_id_seq OWNED BY user_stories.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE users (
    id bigint NOT NULL,
    ct_id character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    organization character varying,
    first_name character varying,
    last_name character varying,
    country character varying,
    sector character varying,
    data_usage text,
    tester boolean
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: visualizations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE visualizations (
    id bigint NOT NULL,
    title character varying,
    description text,
    json_body jsonb,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id integer
);


--
-- Name: visualizations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE visualizations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: visualizations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE visualizations_id_seq OWNED BY visualizations.id;


--
-- Name: wb_extra_country_data; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE wb_extra_country_data (
    id bigint NOT NULL,
    location_id bigint,
    year integer,
    gdp bigint,
    population bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: wb_extra_country_data_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE wb_extra_country_data_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wb_extra_country_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE wb_extra_country_data_id_seq OWNED BY wb_extra_country_data.id;


--
-- Name: wri_metadata_acronyms; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE wri_metadata_acronyms (
    id bigint NOT NULL,
    acronym text,
    definition text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: wri_metadata_acronyms_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE wri_metadata_acronyms_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wri_metadata_acronyms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE wri_metadata_acronyms_id_seq OWNED BY wri_metadata_acronyms.id;


--
-- Name: wri_metadata_properties; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE wri_metadata_properties (
    id bigint NOT NULL,
    slug text,
    name text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: wri_metadata_properties_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE wri_metadata_properties_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wri_metadata_properties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE wri_metadata_properties_id_seq OWNED BY wri_metadata_properties.id;


--
-- Name: wri_metadata_sources; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE wri_metadata_sources (
    id bigint NOT NULL,
    name text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: wri_metadata_sources_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE wri_metadata_sources_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wri_metadata_sources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE wri_metadata_sources_id_seq OWNED BY wri_metadata_sources.id;


--
-- Name: wri_metadata_values; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE wri_metadata_values (
    id bigint NOT NULL,
    source_id bigint,
    property_id bigint,
    value text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: wri_metadata_values_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE wri_metadata_values_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wri_metadata_values_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE wri_metadata_values_id_seq OWNED BY wri_metadata_values.id;


--
-- Name: adaptation_values id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY adaptation_values ALTER COLUMN id SET DEFAULT nextval('adaptation_values_id_seq'::regclass);


--
-- Name: adaptation_variables id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY adaptation_variables ALTER COLUMN id SET DEFAULT nextval('adaptation_variables_id_seq'::regclass);


--
-- Name: historical_emissions_data_sources id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY historical_emissions_data_sources ALTER COLUMN id SET DEFAULT nextval('historical_emissions_data_sources_id_seq'::regclass);


--
-- Name: historical_emissions_gases id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY historical_emissions_gases ALTER COLUMN id SET DEFAULT nextval('historical_emissions_gases_id_seq'::regclass);


--
-- Name: historical_emissions_gwps id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY historical_emissions_gwps ALTER COLUMN id SET DEFAULT nextval('historical_emissions_gwps_id_seq'::regclass);


--
-- Name: historical_emissions_records id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY historical_emissions_records ALTER COLUMN id SET DEFAULT nextval('historical_emissions_records_id_seq'::regclass);


--
-- Name: historical_emissions_sectors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY historical_emissions_sectors ALTER COLUMN id SET DEFAULT nextval('historical_emissions_sectors_id_seq'::regclass);


--
-- Name: indc_categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_categories ALTER COLUMN id SET DEFAULT nextval('indc_categories_id_seq'::regclass);


--
-- Name: indc_category_types id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_category_types ALTER COLUMN id SET DEFAULT nextval('indc_category_types_id_seq'::regclass);


--
-- Name: indc_indicators id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_indicators ALTER COLUMN id SET DEFAULT nextval('indc_indicators_id_seq'::regclass);


--
-- Name: indc_indicators_categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_indicators_categories ALTER COLUMN id SET DEFAULT nextval('indc_indicators_categories_id_seq'::regclass);


--
-- Name: indc_labels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_labels ALTER COLUMN id SET DEFAULT nextval('indc_labels_id_seq'::regclass);


--
-- Name: indc_sectors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_sectors ALTER COLUMN id SET DEFAULT nextval('indc_sectors_id_seq'::regclass);


--
-- Name: indc_sources id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_sources ALTER COLUMN id SET DEFAULT nextval('indc_sources_id_seq'::regclass);


--
-- Name: indc_submissions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_submissions ALTER COLUMN id SET DEFAULT nextval('indc_submissions_id_seq'::regclass);


--
-- Name: indc_values id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_values ALTER COLUMN id SET DEFAULT nextval('indc_values_id_seq'::regclass);


--
-- Name: location_members id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY location_members ALTER COLUMN id SET DEFAULT nextval('location_members_id_seq'::regclass);


--
-- Name: locations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY locations ALTER COLUMN id SET DEFAULT nextval('locations_id_seq'::regclass);


--
-- Name: ndc_sdg_goals id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY ndc_sdg_goals ALTER COLUMN id SET DEFAULT nextval('ndc_sdg_goals_id_seq'::regclass);


--
-- Name: ndc_sdg_ndc_target_sectors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY ndc_sdg_ndc_target_sectors ALTER COLUMN id SET DEFAULT nextval('ndc_sdg_ndc_target_sectors_id_seq'::regclass);


--
-- Name: ndc_sdg_ndc_targets id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY ndc_sdg_ndc_targets ALTER COLUMN id SET DEFAULT nextval('ndc_sdg_ndc_targets_id_seq'::regclass);


--
-- Name: ndc_sdg_sectors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY ndc_sdg_sectors ALTER COLUMN id SET DEFAULT nextval('ndc_sdg_sectors_id_seq'::regclass);


--
-- Name: ndc_sdg_targets id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY ndc_sdg_targets ALTER COLUMN id SET DEFAULT nextval('ndc_sdg_targets_id_seq'::regclass);


--
-- Name: ndcs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY ndcs ALTER COLUMN id SET DEFAULT nextval('ndcs_id_seq'::regclass);


--
-- Name: quantification_labels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY quantification_labels ALTER COLUMN id SET DEFAULT nextval('quantification_labels_id_seq'::regclass);


--
-- Name: quantification_values id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY quantification_values ALTER COLUMN id SET DEFAULT nextval('quantification_values_id_seq'::regclass);


--
-- Name: socioeconomic_indicators id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY socioeconomic_indicators ALTER COLUMN id SET DEFAULT nextval('socioeconomic_indicators_id_seq'::regclass);


--
-- Name: stories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY stories ALTER COLUMN id SET DEFAULT nextval('stories_id_seq'::regclass);


--
-- Name: timeline_documents id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY timeline_documents ALTER COLUMN id SET DEFAULT nextval('timeline_documents_id_seq'::regclass);


--
-- Name: timeline_notes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY timeline_notes ALTER COLUMN id SET DEFAULT nextval('timeline_notes_id_seq'::regclass);


--
-- Name: timeline_sources id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY timeline_sources ALTER COLUMN id SET DEFAULT nextval('timeline_sources_id_seq'::regclass);


--
-- Name: user_stories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_stories ALTER COLUMN id SET DEFAULT nextval('user_stories_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: visualizations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY visualizations ALTER COLUMN id SET DEFAULT nextval('visualizations_id_seq'::regclass);


--
-- Name: wb_extra_country_data id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY wb_extra_country_data ALTER COLUMN id SET DEFAULT nextval('wb_extra_country_data_id_seq'::regclass);


--
-- Name: wri_metadata_acronyms id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY wri_metadata_acronyms ALTER COLUMN id SET DEFAULT nextval('wri_metadata_acronyms_id_seq'::regclass);


--
-- Name: wri_metadata_properties id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY wri_metadata_properties ALTER COLUMN id SET DEFAULT nextval('wri_metadata_properties_id_seq'::regclass);


--
-- Name: wri_metadata_sources id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY wri_metadata_sources ALTER COLUMN id SET DEFAULT nextval('wri_metadata_sources_id_seq'::regclass);


--
-- Name: wri_metadata_values id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY wri_metadata_values ALTER COLUMN id SET DEFAULT nextval('wri_metadata_values_id_seq'::regclass);


--
-- Name: adaptation_values adaptation_values_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY adaptation_values
    ADD CONSTRAINT adaptation_values_pkey PRIMARY KEY (id);


--
-- Name: adaptation_variables adaptation_variables_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY adaptation_variables
    ADD CONSTRAINT adaptation_variables_pkey PRIMARY KEY (id);


--
-- Name: ar_internal_metadata ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: historical_emissions_data_sources historical_emissions_data_sources_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY historical_emissions_data_sources
    ADD CONSTRAINT historical_emissions_data_sources_pkey PRIMARY KEY (id);


--
-- Name: historical_emissions_gases historical_emissions_gases_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY historical_emissions_gases
    ADD CONSTRAINT historical_emissions_gases_pkey PRIMARY KEY (id);


--
-- Name: historical_emissions_gwps historical_emissions_gwps_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY historical_emissions_gwps
    ADD CONSTRAINT historical_emissions_gwps_pkey PRIMARY KEY (id);


--
-- Name: historical_emissions_records historical_emissions_records_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY historical_emissions_records
    ADD CONSTRAINT historical_emissions_records_pkey PRIMARY KEY (id);


--
-- Name: historical_emissions_sectors historical_emissions_sectors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY historical_emissions_sectors
    ADD CONSTRAINT historical_emissions_sectors_pkey PRIMARY KEY (id);


--
-- Name: indc_categories indc_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_categories
    ADD CONSTRAINT indc_categories_pkey PRIMARY KEY (id);


--
-- Name: indc_category_types indc_category_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_category_types
    ADD CONSTRAINT indc_category_types_pkey PRIMARY KEY (id);


--
-- Name: indc_indicators_categories indc_indicators_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_indicators_categories
    ADD CONSTRAINT indc_indicators_categories_pkey PRIMARY KEY (id);


--
-- Name: indc_indicators indc_indicators_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_indicators
    ADD CONSTRAINT indc_indicators_pkey PRIMARY KEY (id);


--
-- Name: indc_labels indc_labels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_labels
    ADD CONSTRAINT indc_labels_pkey PRIMARY KEY (id);


--
-- Name: indc_sectors indc_sectors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_sectors
    ADD CONSTRAINT indc_sectors_pkey PRIMARY KEY (id);


--
-- Name: indc_sources indc_sources_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_sources
    ADD CONSTRAINT indc_sources_pkey PRIMARY KEY (id);


--
-- Name: indc_submissions indc_submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_submissions
    ADD CONSTRAINT indc_submissions_pkey PRIMARY KEY (id);


--
-- Name: indc_values indc_values_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_values
    ADD CONSTRAINT indc_values_pkey PRIMARY KEY (id);


--
-- Name: location_members location_members_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY location_members
    ADD CONSTRAINT location_members_pkey PRIMARY KEY (id);


--
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- Name: ndc_sdg_goals ndc_sdg_goals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY ndc_sdg_goals
    ADD CONSTRAINT ndc_sdg_goals_pkey PRIMARY KEY (id);


--
-- Name: ndc_sdg_ndc_target_sectors ndc_sdg_ndc_target_sectors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY ndc_sdg_ndc_target_sectors
    ADD CONSTRAINT ndc_sdg_ndc_target_sectors_pkey PRIMARY KEY (id);


--
-- Name: ndc_sdg_ndc_targets ndc_sdg_ndc_targets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY ndc_sdg_ndc_targets
    ADD CONSTRAINT ndc_sdg_ndc_targets_pkey PRIMARY KEY (id);


--
-- Name: ndc_sdg_sectors ndc_sdg_sectors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY ndc_sdg_sectors
    ADD CONSTRAINT ndc_sdg_sectors_pkey PRIMARY KEY (id);


--
-- Name: ndc_sdg_targets ndc_sdg_targets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY ndc_sdg_targets
    ADD CONSTRAINT ndc_sdg_targets_pkey PRIMARY KEY (id);


--
-- Name: ndcs ndcs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY ndcs
    ADD CONSTRAINT ndcs_pkey PRIMARY KEY (id);


--
-- Name: quantification_labels quantification_labels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quantification_labels
    ADD CONSTRAINT quantification_labels_pkey PRIMARY KEY (id);


--
-- Name: quantification_values quantification_values_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quantification_values
    ADD CONSTRAINT quantification_values_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: socioeconomic_indicators socioeconomic_indicators_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY socioeconomic_indicators
    ADD CONSTRAINT socioeconomic_indicators_pkey PRIMARY KEY (id);


--
-- Name: stories stories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY stories
    ADD CONSTRAINT stories_pkey PRIMARY KEY (id);


--
-- Name: timeline_documents timeline_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY timeline_documents
    ADD CONSTRAINT timeline_documents_pkey PRIMARY KEY (id);


--
-- Name: timeline_notes timeline_notes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY timeline_notes
    ADD CONSTRAINT timeline_notes_pkey PRIMARY KEY (id);


--
-- Name: timeline_sources timeline_sources_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY timeline_sources
    ADD CONSTRAINT timeline_sources_pkey PRIMARY KEY (id);


--
-- Name: user_stories user_stories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_stories
    ADD CONSTRAINT user_stories_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: visualizations visualizations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY visualizations
    ADD CONSTRAINT visualizations_pkey PRIMARY KEY (id);


--
-- Name: wb_extra_country_data wb_extra_country_data_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY wb_extra_country_data
    ADD CONSTRAINT wb_extra_country_data_pkey PRIMARY KEY (id);


--
-- Name: wri_metadata_acronyms wri_metadata_acronyms_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY wri_metadata_acronyms
    ADD CONSTRAINT wri_metadata_acronyms_pkey PRIMARY KEY (id);


--
-- Name: wri_metadata_properties wri_metadata_properties_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY wri_metadata_properties
    ADD CONSTRAINT wri_metadata_properties_pkey PRIMARY KEY (id);


--
-- Name: wri_metadata_sources wri_metadata_sources_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY wri_metadata_sources
    ADD CONSTRAINT wri_metadata_sources_pkey PRIMARY KEY (id);


--
-- Name: wri_metadata_values wri_metadata_values_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY wri_metadata_values
    ADD CONSTRAINT wri_metadata_values_pkey PRIMARY KEY (id);


--
-- Name: indc_indicators_categories_uniq; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX indc_indicators_categories_uniq ON indc_indicators_categories USING btree (indicator_id, category_id);


--
-- Name: index_adaptation_values_on_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_adaptation_values_on_location_id ON adaptation_values USING btree (location_id);


--
-- Name: index_adaptation_values_on_variable_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_adaptation_values_on_variable_id ON adaptation_values USING btree (variable_id);


--
-- Name: index_adaptation_variables_on_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_adaptation_variables_on_slug ON adaptation_variables USING btree (slug);


--
-- Name: index_historical_emissions_normalised_records_on_data_source_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_normalised_records_on_data_source_id ON historical_emissions_normalised_records USING btree (data_source_id);


--
-- Name: index_historical_emissions_normalised_records_on_gas_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_normalised_records_on_gas_id ON historical_emissions_normalised_records USING btree (gas_id);


--
-- Name: index_historical_emissions_normalised_records_on_gwp_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_normalised_records_on_gwp_id ON historical_emissions_normalised_records USING btree (gwp_id);


--
-- Name: index_historical_emissions_normalised_records_on_id_and_year; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_historical_emissions_normalised_records_on_id_and_year ON historical_emissions_normalised_records USING btree (id, year);


--
-- Name: index_historical_emissions_normalised_records_on_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_normalised_records_on_location_id ON historical_emissions_normalised_records USING btree (location_id);


--
-- Name: index_historical_emissions_normalised_records_on_sector_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_normalised_records_on_sector_id ON historical_emissions_normalised_records USING btree (sector_id);


--
-- Name: index_historical_emissions_normalised_records_on_year; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_normalised_records_on_year ON historical_emissions_normalised_records USING btree (year);


--
-- Name: index_historical_emissions_records_emissions_on_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_historical_emissions_records_emissions_on_id ON public.historical_emissions_records_emissions USING btree (id);


--
-- Name: index_historical_emissions_records_on_data_source_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_records_on_data_source_id ON historical_emissions_records USING btree (data_source_id);


--
-- Name: index_historical_emissions_records_on_gas_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_records_on_gas_id ON historical_emissions_records USING btree (gas_id);


--
-- Name: index_historical_emissions_records_on_gwp_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_records_on_gwp_id ON historical_emissions_records USING btree (gwp_id);


--
-- Name: index_historical_emissions_records_on_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_records_on_location_id ON historical_emissions_records USING btree (location_id);


--
-- Name: index_historical_emissions_records_on_sector_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_records_on_sector_id ON historical_emissions_records USING btree (sector_id);


--
-- Name: index_historical_emissions_searchable_records_on_data_source_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_searchable_records_on_data_source_id ON historical_emissions_searchable_records USING btree (data_source_id);


--
-- Name: index_historical_emissions_searchable_records_on_gas_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_searchable_records_on_gas_id ON historical_emissions_searchable_records USING btree (gas_id);


--
-- Name: index_historical_emissions_searchable_records_on_gwp_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_searchable_records_on_gwp_id ON historical_emissions_searchable_records USING btree (gwp_id);


--
-- Name: index_historical_emissions_searchable_records_on_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_historical_emissions_searchable_records_on_id ON historical_emissions_searchable_records USING btree (id);


--
-- Name: index_historical_emissions_searchable_records_on_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_searchable_records_on_location_id ON historical_emissions_searchable_records USING btree (location_id);


--
-- Name: index_historical_emissions_searchable_records_on_sector_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_searchable_records_on_sector_id ON historical_emissions_searchable_records USING btree (sector_id);


--
-- Name: index_historical_emissions_sectors_on_data_source_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_sectors_on_data_source_id ON historical_emissions_sectors USING btree (data_source_id);


--
-- Name: index_historical_emissions_sectors_on_parent_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_sectors_on_parent_id ON historical_emissions_sectors USING btree (parent_id);


--
-- Name: index_indc_categories_on_category_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_indc_categories_on_category_type_id ON indc_categories USING btree (category_type_id);


--
-- Name: index_indc_categories_on_parent_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_indc_categories_on_parent_id ON indc_categories USING btree (parent_id);


--
-- Name: index_indc_categories_on_slug_and_category_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_indc_categories_on_slug_and_category_type_id ON indc_categories USING btree (slug, category_type_id);


--
-- Name: index_indc_category_types_on_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_indc_category_types_on_name ON indc_category_types USING btree (name);


--
-- Name: index_indc_indicators_categories_on_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_indc_indicators_categories_on_category_id ON indc_indicators_categories USING btree (category_id);


--
-- Name: index_indc_indicators_categories_on_indicator_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_indc_indicators_categories_on_indicator_id ON indc_indicators_categories USING btree (indicator_id);


--
-- Name: index_indc_indicators_on_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_indc_indicators_on_slug ON indc_indicators USING btree (slug);


--
-- Name: index_indc_indicators_on_source_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_indc_indicators_on_source_id ON indc_indicators USING btree (source_id);


--
-- Name: index_indc_labels_on_indicator_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_indc_labels_on_indicator_id ON indc_labels USING btree (indicator_id);


--
-- Name: index_indc_sectors_on_parent_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_indc_sectors_on_parent_id ON indc_sectors USING btree (parent_id);


--
-- Name: index_indc_sources_on_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_indc_sources_on_name ON indc_sources USING btree (name);


--
-- Name: index_indc_submissions_on_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_indc_submissions_on_location_id ON indc_submissions USING btree (location_id);


--
-- Name: index_indc_values_on_indicator_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_indc_values_on_indicator_id ON indc_values USING btree (indicator_id);


--
-- Name: index_indc_values_on_label_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_indc_values_on_label_id ON indc_values USING btree (label_id);


--
-- Name: index_indc_values_on_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_indc_values_on_location_id ON indc_values USING btree (location_id);


--
-- Name: index_indc_values_on_sector_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_indc_values_on_sector_id ON indc_values USING btree (sector_id);


--
-- Name: index_location_members_on_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_location_members_on_location_id ON location_members USING btree (location_id);


--
-- Name: index_location_members_on_member_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_location_members_on_member_id ON location_members USING btree (member_id);


--
-- Name: index_locations_on_iso_code2; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_locations_on_iso_code2 ON locations USING btree (iso_code2);


--
-- Name: index_locations_on_iso_code3; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_locations_on_iso_code3 ON locations USING btree (iso_code3);


--
-- Name: index_ndc_sdg_goals_on_number; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_ndc_sdg_goals_on_number ON ndc_sdg_goals USING btree (number);


--
-- Name: index_ndc_sdg_ndc_target_sectors_on_ndc_target_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_ndc_sdg_ndc_target_sectors_on_ndc_target_id ON ndc_sdg_ndc_target_sectors USING btree (ndc_target_id);


--
-- Name: index_ndc_sdg_ndc_target_sectors_on_sector_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_ndc_sdg_ndc_target_sectors_on_sector_id ON ndc_sdg_ndc_target_sectors USING btree (sector_id);


--
-- Name: index_ndc_sdg_ndc_targets_on_ndc_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_ndc_sdg_ndc_targets_on_ndc_id ON ndc_sdg_ndc_targets USING btree (ndc_id);


--
-- Name: index_ndc_sdg_ndc_targets_on_target_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_ndc_sdg_ndc_targets_on_target_id ON ndc_sdg_ndc_targets USING btree (target_id);


--
-- Name: index_ndc_sdg_targets_on_goal_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_ndc_sdg_targets_on_goal_id ON ndc_sdg_targets USING btree (goal_id);


--
-- Name: index_ndc_sdg_targets_on_number; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_ndc_sdg_targets_on_number ON ndc_sdg_targets USING btree (number);


--
-- Name: index_ndcs_on_full_text_tsv; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_ndcs_on_full_text_tsv ON ndcs USING gin (full_text_tsv);


--
-- Name: index_ndcs_on_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_ndcs_on_location_id ON ndcs USING btree (location_id);


--
-- Name: index_quantification_labels_on_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_quantification_labels_on_name ON quantification_labels USING btree (name);


--
-- Name: index_quantification_values_on_label_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_quantification_values_on_label_id ON quantification_values USING btree (label_id);


--
-- Name: index_quantification_values_on_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_quantification_values_on_location_id ON quantification_values USING btree (location_id);


--
-- Name: index_searchable_emissions_path_ops; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_searchable_emissions_path_ops ON historical_emissions_searchable_records USING gin (emissions_dict jsonb_path_ops);


--
-- Name: index_socioeconomic_indicators_on_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_socioeconomic_indicators_on_location_id ON socioeconomic_indicators USING btree (location_id);


--
-- Name: index_socioeconomic_indicators_on_location_id_and_year; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_socioeconomic_indicators_on_location_id_and_year ON socioeconomic_indicators USING btree (location_id, year);


--
-- Name: index_timeline_documents_on_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_timeline_documents_on_location_id ON timeline_documents USING btree (location_id);


--
-- Name: index_timeline_documents_on_source_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_timeline_documents_on_source_id ON timeline_documents USING btree (source_id);


--
-- Name: index_timeline_notes_on_document_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_timeline_notes_on_document_id ON timeline_notes USING btree (document_id);


--
-- Name: index_users_on_ct_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_users_on_ct_id ON users USING btree (ct_id);


--
-- Name: index_wb_extra_country_data_on_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wb_extra_country_data_on_location_id ON wb_extra_country_data USING btree (location_id);


--
-- Name: index_wri_metadata_acronyms_on_acronym; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_wri_metadata_acronyms_on_acronym ON wri_metadata_acronyms USING btree (acronym);


--
-- Name: index_wri_metadata_properties_on_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_wri_metadata_properties_on_slug ON wri_metadata_properties USING btree (slug);


--
-- Name: index_wri_metadata_values_on_property_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wri_metadata_values_on_property_id ON wri_metadata_values USING btree (property_id);


--
-- Name: index_wri_metadata_values_on_source_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wri_metadata_values_on_source_id ON wri_metadata_values USING btree (source_id);


--
-- Name: source_id_property_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX source_id_property_id_index ON wri_metadata_values USING btree (source_id, property_id);


--
-- Name: wri_metadata_values fk_rails_079e0dfdee; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY wri_metadata_values
    ADD CONSTRAINT fk_rails_079e0dfdee FOREIGN KEY (property_id) REFERENCES wri_metadata_properties(id) ON DELETE CASCADE;


--
-- Name: indc_indicators_categories fk_rails_0aab1cd23e; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_indicators_categories
    ADD CONSTRAINT fk_rails_0aab1cd23e FOREIGN KEY (category_id) REFERENCES indc_categories(id) ON DELETE CASCADE;


--
-- Name: historical_emissions_records fk_rails_0c4499c126; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY historical_emissions_records
    ADD CONSTRAINT fk_rails_0c4499c126 FOREIGN KEY (sector_id) REFERENCES historical_emissions_sectors(id) ON DELETE CASCADE;


--
-- Name: indc_sectors fk_rails_172dcdfbe0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_sectors
    ADD CONSTRAINT fk_rails_172dcdfbe0 FOREIGN KEY (parent_id) REFERENCES indc_sectors(id) ON DELETE CASCADE;


--
-- Name: ndcs fk_rails_19d1c9c3f7; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY ndcs
    ADD CONSTRAINT fk_rails_19d1c9c3f7 FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE;


--
-- Name: indc_categories fk_rails_2684980181; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_categories
    ADD CONSTRAINT fk_rails_2684980181 FOREIGN KEY (parent_id) REFERENCES indc_categories(id) ON DELETE CASCADE;


--
-- Name: timeline_documents fk_rails_2ac4f5f0c8; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY timeline_documents
    ADD CONSTRAINT fk_rails_2ac4f5f0c8 FOREIGN KEY (source_id) REFERENCES timeline_sources(id) ON DELETE CASCADE;


--
-- Name: indc_values fk_rails_3d45bd9e1b; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_values
    ADD CONSTRAINT fk_rails_3d45bd9e1b FOREIGN KEY (indicator_id) REFERENCES indc_indicators(id) ON DELETE CASCADE;


--
-- Name: ndc_sdg_ndc_target_sectors fk_rails_3db44d6b30; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY ndc_sdg_ndc_target_sectors
    ADD CONSTRAINT fk_rails_3db44d6b30 FOREIGN KEY (ndc_target_id) REFERENCES ndc_sdg_ndc_targets(id) ON DELETE CASCADE;


--
-- Name: indc_categories fk_rails_3e5bc702f2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_categories
    ADD CONSTRAINT fk_rails_3e5bc702f2 FOREIGN KEY (category_type_id) REFERENCES indc_category_types(id) ON DELETE CASCADE;


--
-- Name: ndc_sdg_ndc_target_sectors fk_rails_4391f3a35d; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY ndc_sdg_ndc_target_sectors
    ADD CONSTRAINT fk_rails_4391f3a35d FOREIGN KEY (sector_id) REFERENCES ndc_sdg_sectors(id) ON DELETE CASCADE;


--
-- Name: indc_submissions fk_rails_47352eee01; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_submissions
    ADD CONSTRAINT fk_rails_47352eee01 FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE;


--
-- Name: wb_extra_country_data fk_rails_498e2daf90; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY wb_extra_country_data
    ADD CONSTRAINT fk_rails_498e2daf90 FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE;


--
-- Name: indc_values fk_rails_78b5d1bae9; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_values
    ADD CONSTRAINT fk_rails_78b5d1bae9 FOREIGN KEY (sector_id) REFERENCES indc_sectors(id) ON DELETE CASCADE;


--
-- Name: indc_indicators_categories fk_rails_7f8ee8d66f; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_indicators_categories
    ADD CONSTRAINT fk_rails_7f8ee8d66f FOREIGN KEY (indicator_id) REFERENCES indc_indicators(id) ON DELETE CASCADE;


--
-- Name: quantification_values fk_rails_86ebcd5ef2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quantification_values
    ADD CONSTRAINT fk_rails_86ebcd5ef2 FOREIGN KEY (label_id) REFERENCES quantification_labels(id) ON DELETE CASCADE;


--
-- Name: ndc_sdg_ndc_targets fk_rails_898d96a83b; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY ndc_sdg_ndc_targets
    ADD CONSTRAINT fk_rails_898d96a83b FOREIGN KEY (target_id) REFERENCES ndc_sdg_targets(id) ON DELETE CASCADE;


--
-- Name: socioeconomic_indicators fk_rails_8c7796599b; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY socioeconomic_indicators
    ADD CONSTRAINT fk_rails_8c7796599b FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE;


--
-- Name: ndc_sdg_ndc_targets fk_rails_923c2f7e20; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY ndc_sdg_ndc_targets
    ADD CONSTRAINT fk_rails_923c2f7e20 FOREIGN KEY (ndc_id) REFERENCES ndcs(id) ON DELETE CASCADE;


--
-- Name: visualizations fk_rails_a3de285f9a; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY visualizations
    ADD CONSTRAINT fk_rails_a3de285f9a FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: adaptation_values fk_rails_a4c627cc64; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY adaptation_values
    ADD CONSTRAINT fk_rails_a4c627cc64 FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE;


--
-- Name: ndc_sdg_targets fk_rails_ada759fb26; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY ndc_sdg_targets
    ADD CONSTRAINT fk_rails_ada759fb26 FOREIGN KEY (goal_id) REFERENCES ndc_sdg_goals(id);


--
-- Name: wri_metadata_values fk_rails_b2362e90f1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY wri_metadata_values
    ADD CONSTRAINT fk_rails_b2362e90f1 FOREIGN KEY (source_id) REFERENCES wri_metadata_sources(id) ON DELETE CASCADE;


--
-- Name: location_members fk_rails_b5628ffc75; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY location_members
    ADD CONSTRAINT fk_rails_b5628ffc75 FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE;


--
-- Name: timeline_notes fk_rails_b7e3f5033a; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY timeline_notes
    ADD CONSTRAINT fk_rails_b7e3f5033a FOREIGN KEY (document_id) REFERENCES timeline_documents(id) ON DELETE CASCADE;


--
-- Name: historical_emissions_sectors fk_rails_bac381b199; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY historical_emissions_sectors
    ADD CONSTRAINT fk_rails_bac381b199 FOREIGN KEY (data_source_id) REFERENCES historical_emissions_data_sources(id) ON DELETE CASCADE;


--
-- Name: historical_emissions_records fk_rails_bf53b0a2c4; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY historical_emissions_records
    ADD CONSTRAINT fk_rails_bf53b0a2c4 FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE;


--
-- Name: quantification_values fk_rails_c3ca9bbcf7; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY quantification_values
    ADD CONSTRAINT fk_rails_c3ca9bbcf7 FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE;


--
-- Name: indc_values fk_rails_c54a901967; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_values
    ADD CONSTRAINT fk_rails_c54a901967 FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE;


--
-- Name: user_stories fk_rails_c5856684d6; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_stories
    ADD CONSTRAINT fk_rails_c5856684d6 FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: historical_emissions_sectors fk_rails_c62660f611; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY historical_emissions_sectors
    ADD CONSTRAINT fk_rails_c62660f611 FOREIGN KEY (parent_id) REFERENCES historical_emissions_sectors(id) ON DELETE CASCADE;


--
-- Name: location_members fk_rails_c76de7d5fc; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY location_members
    ADD CONSTRAINT fk_rails_c76de7d5fc FOREIGN KEY (member_id) REFERENCES locations(id) ON DELETE CASCADE;


--
-- Name: historical_emissions_records fk_rails_d47c0f188e; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY historical_emissions_records
    ADD CONSTRAINT fk_rails_d47c0f188e FOREIGN KEY (gas_id) REFERENCES historical_emissions_gases(id) ON DELETE CASCADE;


--
-- Name: historical_emissions_records fk_rails_d6211ecb28; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY historical_emissions_records
    ADD CONSTRAINT fk_rails_d6211ecb28 FOREIGN KEY (data_source_id) REFERENCES historical_emissions_data_sources(id) ON DELETE CASCADE;


--
-- Name: indc_labels fk_rails_e3ff491fe6; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_labels
    ADD CONSTRAINT fk_rails_e3ff491fe6 FOREIGN KEY (indicator_id) REFERENCES indc_indicators(id) ON DELETE CASCADE;


--
-- Name: timeline_documents fk_rails_e4ed014ad2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY timeline_documents
    ADD CONSTRAINT fk_rails_e4ed014ad2 FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE;


--
-- Name: adaptation_values fk_rails_f59219f112; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY adaptation_values
    ADD CONSTRAINT fk_rails_f59219f112 FOREIGN KEY (variable_id) REFERENCES adaptation_variables(id) ON DELETE CASCADE;


--
-- Name: historical_emissions_records fk_rails_f6973beb7a; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY historical_emissions_records
    ADD CONSTRAINT fk_rails_f6973beb7a FOREIGN KEY (gwp_id) REFERENCES historical_emissions_gwps(id);


--
-- Name: indc_indicators fk_rails_f8dc47815d; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_indicators
    ADD CONSTRAINT fk_rails_f8dc47815d FOREIGN KEY (source_id) REFERENCES indc_sources(id) ON DELETE CASCADE;


--
-- Name: indc_values fk_rails_f9f8ebf207; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY indc_values
    ADD CONSTRAINT fk_rails_f9f8ebf207 FOREIGN KEY (label_id) REFERENCES indc_labels(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

SET search_path TO "$user", public;

INSERT INTO "schema_migrations" (version) VALUES
('20170725163026'),
('20170725171311'),
('20170804121352'),
('20170822114607'),
('20170822124135'),
('20170822134417'),
('20170822134454'),
('20170822135304'),
('20170822135358'),
('20170823121414'),
('20170823145414'),
('20170824095252'),
('20170824110741'),
('20170824110802'),
('20170824132746'),
('20170824133746'),
('20170825145503'),
('20170825145607'),
('20170828124239'),
('20170828124324'),
('20170828124328'),
('20170828124339'),
('20170828124731'),
('20170828124737'),
('20170828124741'),
('20170829105617'),
('20170830111409'),
('20170907102325'),
('20170907105915'),
('20170912124607'),
('20170912125120'),
('20170912173139'),
('20170913132252'),
('20170914191532'),
('20170914191538'),
('20170921104214'),
('20170921110012'),
('20170921110036'),
('20170925143137'),
('20170925144250'),
('20170927170311'),
('20170928114300'),
('20170928114306'),
('20171002162700'),
('20171002162758'),
('20171002162804'),
('20171002162808'),
('20171002162810'),
('20171002162814'),
('20171005141114'),
('20171009153610'),
('20171009163704'),
('20171010131139'),
('20171010171130'),
('20171010180335'),
('20171010180740'),
('20171010180840'),
('20171010184352'),
('20171011110704'),
('20171011122332'),
('20171011134822'),
('20171016112825'),
('20171016113108'),
('20171016113116'),
('20171016113522'),
('20171018141030'),
('20171023110320'),
('20171023110325'),
('20171023110328'),
('20171025112932'),
('20171025113205'),
('20171025113752'),
('20171026163849'),
('20171027121507'),
('20171027123608'),
('20171027155954'),
('20171027164649'),
('20171027164650'),
('20171027164651'),
('20171027164658'),
('20171027164702'),
('20171027164708'),
('20171027164714'),
('20171027164736'),
('20171027170320'),
('20171030145609'),
('20171031100456'),
('20171101202433'),
('20171107115316'),
('20171109140033'),
('20171115164712'),
('20171115165304'),
('20171115165943'),
('20171121155022'),
('20171121155026'),
('20171227160000'),
('20180121203501'),
('20180123085343'),
('20180208091437'),
('20180208091529'),
('20180601080231'),
('20180611080520'),
('20180612074749'),
('20180613114503'),
('20180613114709'),
('20180613124118'),
('20180615113815'),
('20180720105038'),
('20180803123629'),
('20180807150412');


