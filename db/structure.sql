SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
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


--
-- Name: emissions_filter_by_year_range(jsonb, integer, integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.emissions_filter_by_year_range(emissions jsonb, start_year integer, end_year integer) RETURNS jsonb
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

CREATE TABLE public.adaptation_values (
    id bigint NOT NULL,
    variable_id bigint,
    location_id bigint,
    string_value text,
    number_value double precision,
    boolean_value boolean,
    absolute_rank integer,
    relative_rank double precision,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: adaptation_values_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.adaptation_values_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: adaptation_values_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.adaptation_values_id_seq OWNED BY public.adaptation_values.id;


--
-- Name: adaptation_variables; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.adaptation_variables (
    id bigint NOT NULL,
    slug text,
    name text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: adaptation_variables_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.adaptation_variables_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: adaptation_variables_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.adaptation_variables_id_seq OWNED BY public.adaptation_variables.id;


--
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: historical_emissions_data_sources; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.historical_emissions_data_sources (
    id bigint NOT NULL,
    name text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: historical_emissions_data_sources_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.historical_emissions_data_sources_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: historical_emissions_data_sources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.historical_emissions_data_sources_id_seq OWNED BY public.historical_emissions_data_sources.id;


--
-- Name: historical_emissions_gases; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.historical_emissions_gases (
    id bigint NOT NULL,
    name text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: historical_emissions_gases_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.historical_emissions_gases_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: historical_emissions_gases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.historical_emissions_gases_id_seq OWNED BY public.historical_emissions_gases.id;


--
-- Name: historical_emissions_gwps; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.historical_emissions_gwps (
    id bigint NOT NULL,
    name text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: historical_emissions_gwps_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.historical_emissions_gwps_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: historical_emissions_gwps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.historical_emissions_gwps_id_seq OWNED BY public.historical_emissions_gwps.id;


--
-- Name: historical_emissions_records; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.historical_emissions_records (
    id bigint NOT NULL,
    location_id bigint,
    data_source_id bigint,
    sector_id bigint,
    gas_id bigint,
    emissions jsonb,
    gwp_id bigint
);


--
-- Name: historical_emissions_records_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.historical_emissions_records_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: historical_emissions_records_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.historical_emissions_records_id_seq OWNED BY public.historical_emissions_records.id;


--
-- Name: historical_emissions_sectors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.historical_emissions_sectors (
    id bigint NOT NULL,
    parent_id bigint,
    data_source_id bigint,
    name text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    annex_type text
);


--
-- Name: historical_emissions_sectors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.historical_emissions_sectors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: historical_emissions_sectors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.historical_emissions_sectors_id_seq OWNED BY public.historical_emissions_sectors.id;


--
-- Name: indc_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.indc_categories (
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

CREATE SEQUENCE public.indc_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: indc_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.indc_categories_id_seq OWNED BY public.indc_categories.id;


--
-- Name: indc_category_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.indc_category_types (
    id bigint NOT NULL,
    name text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: indc_category_types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.indc_category_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: indc_category_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.indc_category_types_id_seq OWNED BY public.indc_category_types.id;


--
-- Name: indc_indicators; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.indc_indicators (
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

CREATE TABLE public.indc_indicators_categories (
    id bigint NOT NULL,
    indicator_id bigint NOT NULL,
    category_id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: indc_indicators_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.indc_indicators_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: indc_indicators_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.indc_indicators_categories_id_seq OWNED BY public.indc_indicators_categories.id;


--
-- Name: indc_indicators_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.indc_indicators_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: indc_indicators_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.indc_indicators_id_seq OWNED BY public.indc_indicators.id;


--
-- Name: indc_labels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.indc_labels (
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

CREATE SEQUENCE public.indc_labels_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: indc_labels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.indc_labels_id_seq OWNED BY public.indc_labels.id;


--
-- Name: indc_sectors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.indc_sectors (
    id bigint NOT NULL,
    parent_id bigint,
    name text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: indc_sectors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.indc_sectors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: indc_sectors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.indc_sectors_id_seq OWNED BY public.indc_sectors.id;


--
-- Name: indc_sources; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.indc_sources (
    id bigint NOT NULL,
    name text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: indc_sources_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.indc_sources_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: indc_sources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.indc_sources_id_seq OWNED BY public.indc_sources.id;


--
-- Name: indc_submissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.indc_submissions (
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

CREATE SEQUENCE public.indc_submissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: indc_submissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.indc_submissions_id_seq OWNED BY public.indc_submissions.id;


--
-- Name: indc_values; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.indc_values (
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

CREATE SEQUENCE public.indc_values_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: indc_values_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.indc_values_id_seq OWNED BY public.indc_values.id;


--
-- Name: location_members; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.location_members (
    id bigint NOT NULL,
    location_id bigint,
    member_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: location_members_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.location_members_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: location_members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.location_members_id_seq OWNED BY public.location_members.id;


--
-- Name: locations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.locations (
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
-- Name: locations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.locations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.locations_id_seq OWNED BY public.locations.id;


--
-- Name: ndc_sdg_goals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ndc_sdg_goals (
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

CREATE SEQUENCE public.ndc_sdg_goals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ndc_sdg_goals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ndc_sdg_goals_id_seq OWNED BY public.ndc_sdg_goals.id;


--
-- Name: ndc_sdg_ndc_target_sectors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ndc_sdg_ndc_target_sectors (
    id bigint NOT NULL,
    ndc_target_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    sector_id bigint
);


--
-- Name: ndc_sdg_ndc_target_sectors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.ndc_sdg_ndc_target_sectors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ndc_sdg_ndc_target_sectors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ndc_sdg_ndc_target_sectors_id_seq OWNED BY public.ndc_sdg_ndc_target_sectors.id;


--
-- Name: ndc_sdg_ndc_targets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ndc_sdg_ndc_targets (
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

CREATE SEQUENCE public.ndc_sdg_ndc_targets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ndc_sdg_ndc_targets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ndc_sdg_ndc_targets_id_seq OWNED BY public.ndc_sdg_ndc_targets.id;


--
-- Name: ndc_sdg_sectors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ndc_sdg_sectors (
    id bigint NOT NULL,
    name text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: ndc_sdg_sectors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.ndc_sdg_sectors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ndc_sdg_sectors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ndc_sdg_sectors_id_seq OWNED BY public.ndc_sdg_sectors.id;


--
-- Name: ndc_sdg_targets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ndc_sdg_targets (
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

CREATE SEQUENCE public.ndc_sdg_targets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ndc_sdg_targets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ndc_sdg_targets_id_seq OWNED BY public.ndc_sdg_targets.id;


--
-- Name: ndcs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ndcs (
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

CREATE SEQUENCE public.ndcs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ndcs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ndcs_id_seq OWNED BY public.ndcs.id;


--
-- Name: quantification_labels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.quantification_labels (
    id bigint NOT NULL,
    name text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: quantification_labels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.quantification_labels_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quantification_labels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.quantification_labels_id_seq OWNED BY public.quantification_labels.id;


--
-- Name: quantification_values; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.quantification_values (
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

CREATE SEQUENCE public.quantification_values_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quantification_values_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.quantification_values_id_seq OWNED BY public.quantification_values.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


--
-- Name: socioeconomic_indicators; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.socioeconomic_indicators (
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

CREATE SEQUENCE public.socioeconomic_indicators_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: socioeconomic_indicators_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.socioeconomic_indicators_id_seq OWNED BY public.socioeconomic_indicators.id;


--
-- Name: stories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stories (
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

CREATE SEQUENCE public.stories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: stories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.stories_id_seq OWNED BY public.stories.id;


--
-- Name: timeline_documents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.timeline_documents (
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

CREATE SEQUENCE public.timeline_documents_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: timeline_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.timeline_documents_id_seq OWNED BY public.timeline_documents.id;


--
-- Name: timeline_notes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.timeline_notes (
    id bigint NOT NULL,
    document_id bigint,
    note text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: timeline_notes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.timeline_notes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: timeline_notes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.timeline_notes_id_seq OWNED BY public.timeline_notes.id;


--
-- Name: timeline_sources; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.timeline_sources (
    id bigint NOT NULL,
    name text
);


--
-- Name: timeline_sources_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.timeline_sources_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: timeline_sources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.timeline_sources_id_seq OWNED BY public.timeline_sources.id;


--
-- Name: user_stories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_stories (
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

CREATE SEQUENCE public.user_stories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_stories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_stories_id_seq OWNED BY public.user_stories.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
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

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: visualizations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.visualizations (
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

CREATE SEQUENCE public.visualizations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: visualizations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.visualizations_id_seq OWNED BY public.visualizations.id;


--
-- Name: wb_extra_country_data; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wb_extra_country_data (
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

CREATE SEQUENCE public.wb_extra_country_data_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wb_extra_country_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wb_extra_country_data_id_seq OWNED BY public.wb_extra_country_data.id;


--
-- Name: wri_metadata_acronyms; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wri_metadata_acronyms (
    id bigint NOT NULL,
    acronym text,
    definition text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: wri_metadata_acronyms_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wri_metadata_acronyms_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wri_metadata_acronyms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wri_metadata_acronyms_id_seq OWNED BY public.wri_metadata_acronyms.id;


--
-- Name: wri_metadata_properties; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wri_metadata_properties (
    id bigint NOT NULL,
    slug text,
    name text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: wri_metadata_properties_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wri_metadata_properties_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wri_metadata_properties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wri_metadata_properties_id_seq OWNED BY public.wri_metadata_properties.id;


--
-- Name: wri_metadata_sources; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wri_metadata_sources (
    id bigint NOT NULL,
    name text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: wri_metadata_sources_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wri_metadata_sources_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wri_metadata_sources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wri_metadata_sources_id_seq OWNED BY public.wri_metadata_sources.id;


--
-- Name: wri_metadata_values; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wri_metadata_values (
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

CREATE SEQUENCE public.wri_metadata_values_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wri_metadata_values_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wri_metadata_values_id_seq OWNED BY public.wri_metadata_values.id;


--
-- Name: adaptation_values id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.adaptation_values ALTER COLUMN id SET DEFAULT nextval('public.adaptation_values_id_seq'::regclass);


--
-- Name: adaptation_variables id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.adaptation_variables ALTER COLUMN id SET DEFAULT nextval('public.adaptation_variables_id_seq'::regclass);


--
-- Name: historical_emissions_data_sources id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historical_emissions_data_sources ALTER COLUMN id SET DEFAULT nextval('public.historical_emissions_data_sources_id_seq'::regclass);


--
-- Name: historical_emissions_gases id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historical_emissions_gases ALTER COLUMN id SET DEFAULT nextval('public.historical_emissions_gases_id_seq'::regclass);


--
-- Name: historical_emissions_gwps id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historical_emissions_gwps ALTER COLUMN id SET DEFAULT nextval('public.historical_emissions_gwps_id_seq'::regclass);


--
-- Name: historical_emissions_records id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historical_emissions_records ALTER COLUMN id SET DEFAULT nextval('public.historical_emissions_records_id_seq'::regclass);


--
-- Name: historical_emissions_sectors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historical_emissions_sectors ALTER COLUMN id SET DEFAULT nextval('public.historical_emissions_sectors_id_seq'::regclass);


--
-- Name: indc_categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_categories ALTER COLUMN id SET DEFAULT nextval('public.indc_categories_id_seq'::regclass);


--
-- Name: indc_category_types id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_category_types ALTER COLUMN id SET DEFAULT nextval('public.indc_category_types_id_seq'::regclass);


--
-- Name: indc_indicators id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_indicators ALTER COLUMN id SET DEFAULT nextval('public.indc_indicators_id_seq'::regclass);


--
-- Name: indc_indicators_categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_indicators_categories ALTER COLUMN id SET DEFAULT nextval('public.indc_indicators_categories_id_seq'::regclass);


--
-- Name: indc_labels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_labels ALTER COLUMN id SET DEFAULT nextval('public.indc_labels_id_seq'::regclass);


--
-- Name: indc_sectors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_sectors ALTER COLUMN id SET DEFAULT nextval('public.indc_sectors_id_seq'::regclass);


--
-- Name: indc_sources id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_sources ALTER COLUMN id SET DEFAULT nextval('public.indc_sources_id_seq'::regclass);


--
-- Name: indc_submissions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_submissions ALTER COLUMN id SET DEFAULT nextval('public.indc_submissions_id_seq'::regclass);


--
-- Name: indc_values id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_values ALTER COLUMN id SET DEFAULT nextval('public.indc_values_id_seq'::regclass);


--
-- Name: location_members id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.location_members ALTER COLUMN id SET DEFAULT nextval('public.location_members_id_seq'::regclass);


--
-- Name: locations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.locations ALTER COLUMN id SET DEFAULT nextval('public.locations_id_seq'::regclass);


--
-- Name: ndc_sdg_goals id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ndc_sdg_goals ALTER COLUMN id SET DEFAULT nextval('public.ndc_sdg_goals_id_seq'::regclass);


--
-- Name: ndc_sdg_ndc_target_sectors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ndc_sdg_ndc_target_sectors ALTER COLUMN id SET DEFAULT nextval('public.ndc_sdg_ndc_target_sectors_id_seq'::regclass);


--
-- Name: ndc_sdg_ndc_targets id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ndc_sdg_ndc_targets ALTER COLUMN id SET DEFAULT nextval('public.ndc_sdg_ndc_targets_id_seq'::regclass);


--
-- Name: ndc_sdg_sectors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ndc_sdg_sectors ALTER COLUMN id SET DEFAULT nextval('public.ndc_sdg_sectors_id_seq'::regclass);


--
-- Name: ndc_sdg_targets id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ndc_sdg_targets ALTER COLUMN id SET DEFAULT nextval('public.ndc_sdg_targets_id_seq'::regclass);


--
-- Name: ndcs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ndcs ALTER COLUMN id SET DEFAULT nextval('public.ndcs_id_seq'::regclass);


--
-- Name: quantification_labels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quantification_labels ALTER COLUMN id SET DEFAULT nextval('public.quantification_labels_id_seq'::regclass);


--
-- Name: quantification_values id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quantification_values ALTER COLUMN id SET DEFAULT nextval('public.quantification_values_id_seq'::regclass);


--
-- Name: socioeconomic_indicators id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.socioeconomic_indicators ALTER COLUMN id SET DEFAULT nextval('public.socioeconomic_indicators_id_seq'::regclass);


--
-- Name: stories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stories ALTER COLUMN id SET DEFAULT nextval('public.stories_id_seq'::regclass);


--
-- Name: timeline_documents id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.timeline_documents ALTER COLUMN id SET DEFAULT nextval('public.timeline_documents_id_seq'::regclass);


--
-- Name: timeline_notes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.timeline_notes ALTER COLUMN id SET DEFAULT nextval('public.timeline_notes_id_seq'::regclass);


--
-- Name: timeline_sources id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.timeline_sources ALTER COLUMN id SET DEFAULT nextval('public.timeline_sources_id_seq'::regclass);


--
-- Name: user_stories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_stories ALTER COLUMN id SET DEFAULT nextval('public.user_stories_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: visualizations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visualizations ALTER COLUMN id SET DEFAULT nextval('public.visualizations_id_seq'::regclass);


--
-- Name: wb_extra_country_data id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wb_extra_country_data ALTER COLUMN id SET DEFAULT nextval('public.wb_extra_country_data_id_seq'::regclass);


--
-- Name: wri_metadata_acronyms id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wri_metadata_acronyms ALTER COLUMN id SET DEFAULT nextval('public.wri_metadata_acronyms_id_seq'::regclass);


--
-- Name: wri_metadata_properties id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wri_metadata_properties ALTER COLUMN id SET DEFAULT nextval('public.wri_metadata_properties_id_seq'::regclass);


--
-- Name: wri_metadata_sources id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wri_metadata_sources ALTER COLUMN id SET DEFAULT nextval('public.wri_metadata_sources_id_seq'::regclass);


--
-- Name: wri_metadata_values id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wri_metadata_values ALTER COLUMN id SET DEFAULT nextval('public.wri_metadata_values_id_seq'::regclass);


--
-- Name: adaptation_values adaptation_values_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.adaptation_values
    ADD CONSTRAINT adaptation_values_pkey PRIMARY KEY (id);


--
-- Name: adaptation_variables adaptation_variables_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.adaptation_variables
    ADD CONSTRAINT adaptation_variables_pkey PRIMARY KEY (id);


--
-- Name: ar_internal_metadata ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: historical_emissions_data_sources historical_emissions_data_sources_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historical_emissions_data_sources
    ADD CONSTRAINT historical_emissions_data_sources_pkey PRIMARY KEY (id);


--
-- Name: historical_emissions_gases historical_emissions_gases_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historical_emissions_gases
    ADD CONSTRAINT historical_emissions_gases_pkey PRIMARY KEY (id);


--
-- Name: historical_emissions_gwps historical_emissions_gwps_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historical_emissions_gwps
    ADD CONSTRAINT historical_emissions_gwps_pkey PRIMARY KEY (id);


--
-- Name: historical_emissions_records historical_emissions_records_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historical_emissions_records
    ADD CONSTRAINT historical_emissions_records_pkey PRIMARY KEY (id);


--
-- Name: historical_emissions_sectors historical_emissions_sectors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historical_emissions_sectors
    ADD CONSTRAINT historical_emissions_sectors_pkey PRIMARY KEY (id);


--
-- Name: indc_categories indc_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_categories
    ADD CONSTRAINT indc_categories_pkey PRIMARY KEY (id);


--
-- Name: indc_category_types indc_category_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_category_types
    ADD CONSTRAINT indc_category_types_pkey PRIMARY KEY (id);


--
-- Name: indc_indicators_categories indc_indicators_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_indicators_categories
    ADD CONSTRAINT indc_indicators_categories_pkey PRIMARY KEY (id);


--
-- Name: indc_indicators indc_indicators_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_indicators
    ADD CONSTRAINT indc_indicators_pkey PRIMARY KEY (id);


--
-- Name: indc_labels indc_labels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_labels
    ADD CONSTRAINT indc_labels_pkey PRIMARY KEY (id);


--
-- Name: indc_sectors indc_sectors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_sectors
    ADD CONSTRAINT indc_sectors_pkey PRIMARY KEY (id);


--
-- Name: indc_sources indc_sources_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_sources
    ADD CONSTRAINT indc_sources_pkey PRIMARY KEY (id);


--
-- Name: indc_submissions indc_submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_submissions
    ADD CONSTRAINT indc_submissions_pkey PRIMARY KEY (id);


--
-- Name: indc_values indc_values_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_values
    ADD CONSTRAINT indc_values_pkey PRIMARY KEY (id);


--
-- Name: location_members location_members_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.location_members
    ADD CONSTRAINT location_members_pkey PRIMARY KEY (id);


--
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- Name: ndc_sdg_goals ndc_sdg_goals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ndc_sdg_goals
    ADD CONSTRAINT ndc_sdg_goals_pkey PRIMARY KEY (id);


--
-- Name: ndc_sdg_ndc_target_sectors ndc_sdg_ndc_target_sectors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ndc_sdg_ndc_target_sectors
    ADD CONSTRAINT ndc_sdg_ndc_target_sectors_pkey PRIMARY KEY (id);


--
-- Name: ndc_sdg_ndc_targets ndc_sdg_ndc_targets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ndc_sdg_ndc_targets
    ADD CONSTRAINT ndc_sdg_ndc_targets_pkey PRIMARY KEY (id);


--
-- Name: ndc_sdg_sectors ndc_sdg_sectors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ndc_sdg_sectors
    ADD CONSTRAINT ndc_sdg_sectors_pkey PRIMARY KEY (id);


--
-- Name: ndc_sdg_targets ndc_sdg_targets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ndc_sdg_targets
    ADD CONSTRAINT ndc_sdg_targets_pkey PRIMARY KEY (id);


--
-- Name: ndcs ndcs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ndcs
    ADD CONSTRAINT ndcs_pkey PRIMARY KEY (id);


--
-- Name: quantification_labels quantification_labels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quantification_labels
    ADD CONSTRAINT quantification_labels_pkey PRIMARY KEY (id);


--
-- Name: quantification_values quantification_values_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quantification_values
    ADD CONSTRAINT quantification_values_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: socioeconomic_indicators socioeconomic_indicators_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.socioeconomic_indicators
    ADD CONSTRAINT socioeconomic_indicators_pkey PRIMARY KEY (id);


--
-- Name: stories stories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stories
    ADD CONSTRAINT stories_pkey PRIMARY KEY (id);


--
-- Name: timeline_documents timeline_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.timeline_documents
    ADD CONSTRAINT timeline_documents_pkey PRIMARY KEY (id);


--
-- Name: timeline_notes timeline_notes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.timeline_notes
    ADD CONSTRAINT timeline_notes_pkey PRIMARY KEY (id);


--
-- Name: timeline_sources timeline_sources_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.timeline_sources
    ADD CONSTRAINT timeline_sources_pkey PRIMARY KEY (id);


--
-- Name: user_stories user_stories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_stories
    ADD CONSTRAINT user_stories_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: visualizations visualizations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visualizations
    ADD CONSTRAINT visualizations_pkey PRIMARY KEY (id);


--
-- Name: wb_extra_country_data wb_extra_country_data_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wb_extra_country_data
    ADD CONSTRAINT wb_extra_country_data_pkey PRIMARY KEY (id);


--
-- Name: wri_metadata_acronyms wri_metadata_acronyms_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wri_metadata_acronyms
    ADD CONSTRAINT wri_metadata_acronyms_pkey PRIMARY KEY (id);


--
-- Name: wri_metadata_properties wri_metadata_properties_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wri_metadata_properties
    ADD CONSTRAINT wri_metadata_properties_pkey PRIMARY KEY (id);


--
-- Name: wri_metadata_sources wri_metadata_sources_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wri_metadata_sources
    ADD CONSTRAINT wri_metadata_sources_pkey PRIMARY KEY (id);


--
-- Name: wri_metadata_values wri_metadata_values_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wri_metadata_values
    ADD CONSTRAINT wri_metadata_values_pkey PRIMARY KEY (id);


--
-- Name: indc_indicators_categories_uniq; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX indc_indicators_categories_uniq ON public.indc_indicators_categories USING btree (indicator_id, category_id);


--
-- Name: index_adaptation_values_on_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_adaptation_values_on_location_id ON public.adaptation_values USING btree (location_id);


--
-- Name: index_adaptation_values_on_variable_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_adaptation_values_on_variable_id ON public.adaptation_values USING btree (variable_id);


--
-- Name: index_adaptation_variables_on_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_adaptation_variables_on_slug ON public.adaptation_variables USING btree (slug);


--
-- Name: index_historical_emissions_records_on_data_source_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_records_on_data_source_id ON public.historical_emissions_records USING btree (data_source_id);


--
-- Name: index_historical_emissions_records_on_gas_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_records_on_gas_id ON public.historical_emissions_records USING btree (gas_id);


--
-- Name: index_historical_emissions_records_on_gwp_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_records_on_gwp_id ON public.historical_emissions_records USING btree (gwp_id);


--
-- Name: index_historical_emissions_records_on_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_records_on_location_id ON public.historical_emissions_records USING btree (location_id);


--
-- Name: index_historical_emissions_records_on_sector_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_records_on_sector_id ON public.historical_emissions_records USING btree (sector_id);


--
-- Name: index_historical_emissions_sectors_on_data_source_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_sectors_on_data_source_id ON public.historical_emissions_sectors USING btree (data_source_id);


--
-- Name: index_historical_emissions_sectors_on_parent_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_historical_emissions_sectors_on_parent_id ON public.historical_emissions_sectors USING btree (parent_id);


--
-- Name: index_indc_categories_on_category_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_indc_categories_on_category_type_id ON public.indc_categories USING btree (category_type_id);


--
-- Name: index_indc_categories_on_parent_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_indc_categories_on_parent_id ON public.indc_categories USING btree (parent_id);


--
-- Name: index_indc_categories_on_slug_and_category_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_indc_categories_on_slug_and_category_type_id ON public.indc_categories USING btree (slug, category_type_id);


--
-- Name: index_indc_category_types_on_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_indc_category_types_on_name ON public.indc_category_types USING btree (name);


--
-- Name: index_indc_indicators_categories_on_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_indc_indicators_categories_on_category_id ON public.indc_indicators_categories USING btree (category_id);


--
-- Name: index_indc_indicators_categories_on_indicator_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_indc_indicators_categories_on_indicator_id ON public.indc_indicators_categories USING btree (indicator_id);


--
-- Name: index_indc_indicators_on_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_indc_indicators_on_slug ON public.indc_indicators USING btree (slug);


--
-- Name: index_indc_indicators_on_source_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_indc_indicators_on_source_id ON public.indc_indicators USING btree (source_id);


--
-- Name: index_indc_labels_on_indicator_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_indc_labels_on_indicator_id ON public.indc_labels USING btree (indicator_id);


--
-- Name: index_indc_sectors_on_parent_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_indc_sectors_on_parent_id ON public.indc_sectors USING btree (parent_id);


--
-- Name: index_indc_sources_on_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_indc_sources_on_name ON public.indc_sources USING btree (name);


--
-- Name: index_indc_submissions_on_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_indc_submissions_on_location_id ON public.indc_submissions USING btree (location_id);


--
-- Name: index_indc_values_on_indicator_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_indc_values_on_indicator_id ON public.indc_values USING btree (indicator_id);


--
-- Name: index_indc_values_on_label_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_indc_values_on_label_id ON public.indc_values USING btree (label_id);


--
-- Name: index_indc_values_on_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_indc_values_on_location_id ON public.indc_values USING btree (location_id);


--
-- Name: index_indc_values_on_sector_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_indc_values_on_sector_id ON public.indc_values USING btree (sector_id);


--
-- Name: index_location_members_on_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_location_members_on_location_id ON public.location_members USING btree (location_id);


--
-- Name: index_location_members_on_member_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_location_members_on_member_id ON public.location_members USING btree (member_id);


--
-- Name: index_locations_on_iso_code2; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_locations_on_iso_code2 ON public.locations USING btree (iso_code2);


--
-- Name: index_locations_on_iso_code3; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_locations_on_iso_code3 ON public.locations USING btree (iso_code3);


--
-- Name: index_ndc_sdg_goals_on_number; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_ndc_sdg_goals_on_number ON public.ndc_sdg_goals USING btree (number);


--
-- Name: index_ndc_sdg_ndc_target_sectors_on_ndc_target_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_ndc_sdg_ndc_target_sectors_on_ndc_target_id ON public.ndc_sdg_ndc_target_sectors USING btree (ndc_target_id);


--
-- Name: index_ndc_sdg_ndc_target_sectors_on_sector_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_ndc_sdg_ndc_target_sectors_on_sector_id ON public.ndc_sdg_ndc_target_sectors USING btree (sector_id);


--
-- Name: index_ndc_sdg_ndc_targets_on_ndc_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_ndc_sdg_ndc_targets_on_ndc_id ON public.ndc_sdg_ndc_targets USING btree (ndc_id);


--
-- Name: index_ndc_sdg_ndc_targets_on_target_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_ndc_sdg_ndc_targets_on_target_id ON public.ndc_sdg_ndc_targets USING btree (target_id);


--
-- Name: index_ndc_sdg_targets_on_goal_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_ndc_sdg_targets_on_goal_id ON public.ndc_sdg_targets USING btree (goal_id);


--
-- Name: index_ndc_sdg_targets_on_number; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_ndc_sdg_targets_on_number ON public.ndc_sdg_targets USING btree (number);


--
-- Name: index_ndcs_on_full_text_tsv; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_ndcs_on_full_text_tsv ON public.ndcs USING gin (full_text_tsv);


--
-- Name: index_ndcs_on_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_ndcs_on_location_id ON public.ndcs USING btree (location_id);


--
-- Name: index_quantification_labels_on_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_quantification_labels_on_name ON public.quantification_labels USING btree (name);


--
-- Name: index_quantification_values_on_label_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_quantification_values_on_label_id ON public.quantification_values USING btree (label_id);


--
-- Name: index_quantification_values_on_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_quantification_values_on_location_id ON public.quantification_values USING btree (location_id);


--
-- Name: index_socioeconomic_indicators_on_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_socioeconomic_indicators_on_location_id ON public.socioeconomic_indicators USING btree (location_id);


--
-- Name: index_socioeconomic_indicators_on_location_id_and_year; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_socioeconomic_indicators_on_location_id_and_year ON public.socioeconomic_indicators USING btree (location_id, year);


--
-- Name: index_timeline_documents_on_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_timeline_documents_on_location_id ON public.timeline_documents USING btree (location_id);


--
-- Name: index_timeline_documents_on_source_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_timeline_documents_on_source_id ON public.timeline_documents USING btree (source_id);


--
-- Name: index_timeline_notes_on_document_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_timeline_notes_on_document_id ON public.timeline_notes USING btree (document_id);


--
-- Name: index_users_on_ct_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_users_on_ct_id ON public.users USING btree (ct_id);


--
-- Name: index_wb_extra_country_data_on_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wb_extra_country_data_on_location_id ON public.wb_extra_country_data USING btree (location_id);


--
-- Name: index_wri_metadata_acronyms_on_acronym; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_wri_metadata_acronyms_on_acronym ON public.wri_metadata_acronyms USING btree (acronym);


--
-- Name: index_wri_metadata_properties_on_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_wri_metadata_properties_on_slug ON public.wri_metadata_properties USING btree (slug);


--
-- Name: index_wri_metadata_values_on_property_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wri_metadata_values_on_property_id ON public.wri_metadata_values USING btree (property_id);


--
-- Name: index_wri_metadata_values_on_source_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wri_metadata_values_on_source_id ON public.wri_metadata_values USING btree (source_id);


--
-- Name: source_id_property_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX source_id_property_id_index ON public.wri_metadata_values USING btree (source_id, property_id);


--
-- Name: wri_metadata_values fk_rails_079e0dfdee; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wri_metadata_values
    ADD CONSTRAINT fk_rails_079e0dfdee FOREIGN KEY (property_id) REFERENCES public.wri_metadata_properties(id) ON DELETE CASCADE;


--
-- Name: indc_indicators_categories fk_rails_0aab1cd23e; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_indicators_categories
    ADD CONSTRAINT fk_rails_0aab1cd23e FOREIGN KEY (category_id) REFERENCES public.indc_categories(id) ON DELETE CASCADE;


--
-- Name: historical_emissions_records fk_rails_0c4499c126; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historical_emissions_records
    ADD CONSTRAINT fk_rails_0c4499c126 FOREIGN KEY (sector_id) REFERENCES public.historical_emissions_sectors(id) ON DELETE CASCADE;


--
-- Name: indc_sectors fk_rails_172dcdfbe0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_sectors
    ADD CONSTRAINT fk_rails_172dcdfbe0 FOREIGN KEY (parent_id) REFERENCES public.indc_sectors(id) ON DELETE CASCADE;


--
-- Name: ndcs fk_rails_19d1c9c3f7; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ndcs
    ADD CONSTRAINT fk_rails_19d1c9c3f7 FOREIGN KEY (location_id) REFERENCES public.locations(id) ON DELETE CASCADE;


--
-- Name: indc_categories fk_rails_2684980181; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_categories
    ADD CONSTRAINT fk_rails_2684980181 FOREIGN KEY (parent_id) REFERENCES public.indc_categories(id) ON DELETE CASCADE;


--
-- Name: timeline_documents fk_rails_2ac4f5f0c8; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.timeline_documents
    ADD CONSTRAINT fk_rails_2ac4f5f0c8 FOREIGN KEY (source_id) REFERENCES public.timeline_sources(id) ON DELETE CASCADE;


--
-- Name: indc_values fk_rails_3d45bd9e1b; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_values
    ADD CONSTRAINT fk_rails_3d45bd9e1b FOREIGN KEY (indicator_id) REFERENCES public.indc_indicators(id) ON DELETE CASCADE;


--
-- Name: ndc_sdg_ndc_target_sectors fk_rails_3db44d6b30; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ndc_sdg_ndc_target_sectors
    ADD CONSTRAINT fk_rails_3db44d6b30 FOREIGN KEY (ndc_target_id) REFERENCES public.ndc_sdg_ndc_targets(id) ON DELETE CASCADE;


--
-- Name: indc_categories fk_rails_3e5bc702f2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_categories
    ADD CONSTRAINT fk_rails_3e5bc702f2 FOREIGN KEY (category_type_id) REFERENCES public.indc_category_types(id) ON DELETE CASCADE;


--
-- Name: ndc_sdg_ndc_target_sectors fk_rails_4391f3a35d; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ndc_sdg_ndc_target_sectors
    ADD CONSTRAINT fk_rails_4391f3a35d FOREIGN KEY (sector_id) REFERENCES public.ndc_sdg_sectors(id) ON DELETE CASCADE;


--
-- Name: indc_submissions fk_rails_47352eee01; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_submissions
    ADD CONSTRAINT fk_rails_47352eee01 FOREIGN KEY (location_id) REFERENCES public.locations(id) ON DELETE CASCADE;


--
-- Name: wb_extra_country_data fk_rails_498e2daf90; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wb_extra_country_data
    ADD CONSTRAINT fk_rails_498e2daf90 FOREIGN KEY (location_id) REFERENCES public.locations(id) ON DELETE CASCADE;


--
-- Name: indc_values fk_rails_78b5d1bae9; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_values
    ADD CONSTRAINT fk_rails_78b5d1bae9 FOREIGN KEY (sector_id) REFERENCES public.indc_sectors(id) ON DELETE CASCADE;


--
-- Name: indc_indicators_categories fk_rails_7f8ee8d66f; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_indicators_categories
    ADD CONSTRAINT fk_rails_7f8ee8d66f FOREIGN KEY (indicator_id) REFERENCES public.indc_indicators(id) ON DELETE CASCADE;


--
-- Name: quantification_values fk_rails_86ebcd5ef2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quantification_values
    ADD CONSTRAINT fk_rails_86ebcd5ef2 FOREIGN KEY (label_id) REFERENCES public.quantification_labels(id) ON DELETE CASCADE;


--
-- Name: ndc_sdg_ndc_targets fk_rails_898d96a83b; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ndc_sdg_ndc_targets
    ADD CONSTRAINT fk_rails_898d96a83b FOREIGN KEY (target_id) REFERENCES public.ndc_sdg_targets(id) ON DELETE CASCADE;


--
-- Name: socioeconomic_indicators fk_rails_8c7796599b; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.socioeconomic_indicators
    ADD CONSTRAINT fk_rails_8c7796599b FOREIGN KEY (location_id) REFERENCES public.locations(id) ON DELETE CASCADE;


--
-- Name: ndc_sdg_ndc_targets fk_rails_923c2f7e20; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ndc_sdg_ndc_targets
    ADD CONSTRAINT fk_rails_923c2f7e20 FOREIGN KEY (ndc_id) REFERENCES public.ndcs(id) ON DELETE CASCADE;


--
-- Name: visualizations fk_rails_a3de285f9a; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visualizations
    ADD CONSTRAINT fk_rails_a3de285f9a FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: adaptation_values fk_rails_a4c627cc64; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.adaptation_values
    ADD CONSTRAINT fk_rails_a4c627cc64 FOREIGN KEY (location_id) REFERENCES public.locations(id) ON DELETE CASCADE;


--
-- Name: ndc_sdg_targets fk_rails_ada759fb26; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ndc_sdg_targets
    ADD CONSTRAINT fk_rails_ada759fb26 FOREIGN KEY (goal_id) REFERENCES public.ndc_sdg_goals(id);


--
-- Name: wri_metadata_values fk_rails_b2362e90f1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wri_metadata_values
    ADD CONSTRAINT fk_rails_b2362e90f1 FOREIGN KEY (source_id) REFERENCES public.wri_metadata_sources(id) ON DELETE CASCADE;


--
-- Name: location_members fk_rails_b5628ffc75; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.location_members
    ADD CONSTRAINT fk_rails_b5628ffc75 FOREIGN KEY (location_id) REFERENCES public.locations(id) ON DELETE CASCADE;


--
-- Name: timeline_notes fk_rails_b7e3f5033a; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.timeline_notes
    ADD CONSTRAINT fk_rails_b7e3f5033a FOREIGN KEY (document_id) REFERENCES public.timeline_documents(id) ON DELETE CASCADE;


--
-- Name: historical_emissions_sectors fk_rails_bac381b199; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historical_emissions_sectors
    ADD CONSTRAINT fk_rails_bac381b199 FOREIGN KEY (data_source_id) REFERENCES public.historical_emissions_data_sources(id) ON DELETE CASCADE;


--
-- Name: historical_emissions_records fk_rails_bf53b0a2c4; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historical_emissions_records
    ADD CONSTRAINT fk_rails_bf53b0a2c4 FOREIGN KEY (location_id) REFERENCES public.locations(id) ON DELETE CASCADE;


--
-- Name: quantification_values fk_rails_c3ca9bbcf7; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quantification_values
    ADD CONSTRAINT fk_rails_c3ca9bbcf7 FOREIGN KEY (location_id) REFERENCES public.locations(id) ON DELETE CASCADE;


--
-- Name: indc_values fk_rails_c54a901967; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_values
    ADD CONSTRAINT fk_rails_c54a901967 FOREIGN KEY (location_id) REFERENCES public.locations(id) ON DELETE CASCADE;


--
-- Name: user_stories fk_rails_c5856684d6; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_stories
    ADD CONSTRAINT fk_rails_c5856684d6 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: historical_emissions_sectors fk_rails_c62660f611; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historical_emissions_sectors
    ADD CONSTRAINT fk_rails_c62660f611 FOREIGN KEY (parent_id) REFERENCES public.historical_emissions_sectors(id) ON DELETE CASCADE;


--
-- Name: location_members fk_rails_c76de7d5fc; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.location_members
    ADD CONSTRAINT fk_rails_c76de7d5fc FOREIGN KEY (member_id) REFERENCES public.locations(id) ON DELETE CASCADE;


--
-- Name: historical_emissions_records fk_rails_d47c0f188e; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historical_emissions_records
    ADD CONSTRAINT fk_rails_d47c0f188e FOREIGN KEY (gas_id) REFERENCES public.historical_emissions_gases(id) ON DELETE CASCADE;


--
-- Name: historical_emissions_records fk_rails_d6211ecb28; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historical_emissions_records
    ADD CONSTRAINT fk_rails_d6211ecb28 FOREIGN KEY (data_source_id) REFERENCES public.historical_emissions_data_sources(id) ON DELETE CASCADE;


--
-- Name: indc_labels fk_rails_e3ff491fe6; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_labels
    ADD CONSTRAINT fk_rails_e3ff491fe6 FOREIGN KEY (indicator_id) REFERENCES public.indc_indicators(id) ON DELETE CASCADE;


--
-- Name: timeline_documents fk_rails_e4ed014ad2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.timeline_documents
    ADD CONSTRAINT fk_rails_e4ed014ad2 FOREIGN KEY (location_id) REFERENCES public.locations(id) ON DELETE CASCADE;


--
-- Name: adaptation_values fk_rails_f59219f112; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.adaptation_values
    ADD CONSTRAINT fk_rails_f59219f112 FOREIGN KEY (variable_id) REFERENCES public.adaptation_variables(id) ON DELETE CASCADE;


--
-- Name: historical_emissions_records fk_rails_f6973beb7a; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historical_emissions_records
    ADD CONSTRAINT fk_rails_f6973beb7a FOREIGN KEY (gwp_id) REFERENCES public.historical_emissions_gwps(id);


--
-- Name: indc_indicators fk_rails_f8dc47815d; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_indicators
    ADD CONSTRAINT fk_rails_f8dc47815d FOREIGN KEY (source_id) REFERENCES public.indc_sources(id) ON DELETE CASCADE;


--
-- Name: indc_values fk_rails_f9f8ebf207; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.indc_values
    ADD CONSTRAINT fk_rails_f9f8ebf207 FOREIGN KEY (label_id) REFERENCES public.indc_labels(id) ON DELETE CASCADE;


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
('20180613124118');


