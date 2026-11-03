---
layout: default
title: Import and rake tasks
permalink: /_docs/import-rake
nav_order: 4
---

# Import and rake tasks

This app uses a set of Rake tasks to import datasets and perform routine maintenance. Below is a concise reference for the most common tasks and how to run them locally and in CI/CD.

## Quick start

- Ensure dependencies are installed and the app can boot.
- Seed or migrate the database as needed.
- Run the full import (safe, non-destructive for dictionary tables):

```sh
bundle exec rake db:import
```

To reimport everything from scratch (destructive for several tables) use:

```sh
bundle exec rake db:reimport
```

## Global import tasks

- `db:import` — Imports all datasets in the correct order and replaces non-dictionary data. It invokes, in order:
	- `locations:import`
	- `location_members:import`
	- `ndcs:full:import`
	- `ndcs:full:index`
	- `sdgs:import`
	- `ndc_sdg_targets:import`
	- `indc:import`
	- `historical_emissions:import`
	- `adaptation:import`
	- `wri_metadata:import`
	- `wb_extra:import`
	- `timeline:import`
	- `quantifications:import`
	- `socioeconomics:import`
	- `stories:import`
	- `key_visualizations:import`
	- `country_profile:import`
	- `zip_files:import`

- `db:reimport` — Fully resets a number of tables and then runs `db:import`. It deletes: `NdcSdg::Target`, `NdcSdg::Goal`, `HistoricalEmissions::Record`, `WbExtra::CountryData`, `Socioeconomic::Indicator`, all `Location`s, and all `Story` records before importing again. Use with caution.

## Dataset-specific tasks

- Locations
	- `locations:import` — Import locations from CSV.
	- `location_members:import` — Import location members from CSV.

- NDCs (full text)
	- `ndcs:full:import` — Store and index NDC full text from S3.
	- `ndcs:full:index` — Rebuild the full-text TSV index.

- SDGs and NDC-SDG
	- `sdgs:import` — Import SDG data from CSV.
	- `ndc_sdg_targets:import` — Part of the overall import sequence (defined in codebase alongside SDGs/INDC models).

- INDC
	- `indc:import` — Import INDC dataset from CSV sources.
	- `indc:subsectors_data` — Generate NDC Explorer subsectors data.
	- `indc:delete_subsectors_data` — Clear auto-generated subsector indicators and values.

- Historical emissions
	- `historical_emissions:import` — Import historical emissions from CSV.

- Adaptation
	- `adaptation:import` — Import Adaptation dataset from CSV.

- WRI metadata
	- `wri_metadata:import` — Import WRI metadata from CSV.

- World Bank extras
	- `wb_extra:import` — Import WB Extra dataset from CSV.

- Timeline
	- `timeline:import` — Import documents timeline from CSV.

- Quantifications
	- `quantifications:import` — Import Quantifications dataset from CSV.

- Socioeconomics
	- `socioeconomics:import` — Import Socioeconomics dataset from CSV.

- Stories
	- `stories:import` — Import latest stories from WRI RSS feed.
	- `stories:fresh_import` — Delete existing stories and re-import.

- Key visualizations
	- `key_visualizations:import` — Import Key Visualizations definitions/data.

- Country profile
	- `country_profile:import` — Import Country Profile data.

- Zip files
	- `zip_files:import` — Create or refresh the Zip files structure (no upload).
	- `zip_files:import_with_upload` — Generate and upload Zip files.

- Agriculture profile
	- `agriculture_profile:import` — Run all agriculture subtasks (metadata, emissions, contexts, profile).
	- `agriculture_profile:import_metadata`
	- `agriculture_profile:import_emissions`
	- `agriculture_profile:import_contexts`
	- `agriculture_profile:import_profile`

## Database utilities

- `db:import_maxmind` — Download the GeoLite2 Country database and place it at `db/GeoLite2-Country.mmdb`. Requires `MAXMIND_LICENSE_KEY` in environment. Example:

```sh
MAXMIND_LICENSE_KEY=your_key bundle exec rake db:import_maxmind
```

- `db:user_creation` — Create a default user using `DEV_USER_ID` from `.env`.

- `db:mark_countries_with_in_eu_flag` — Mark EU member countries in `locations` using the internal EU list.

## MaxMind geolocation

MaxMind’s GeoLite2 Country database is used to resolve a user’s IP address to a 2-letter ISO country code. This enables country-aware behavior (e.g., default country selection) via a fast, local lookup.

- Implementation: see `app/services/geolocation_service.rb` (uses the `maxmind-db` gem).
- DB selection:
	- Dev/Test: uses `db/GeoLite2-Country-Test.mmdb` by default.
	- Real DB: uses `db/GeoLite2-Country.mmdb` when `MAXMIND_REAL_DB` is set or in non-dev/test environments.
- Overrides and fallbacks:
	- In development, set `CW_USER_COUNTRY_OVERRIDE` (e.g., `US`) to bypass lookup.
	- If an IP isn’t found, the service returns `nil`.
- Setup: run `db:import_maxmind` to download the real DB. Requires `MAXMIND_LICENSE_KEY`.

Examples:

```sh
# Download the real GeoLite2 Country DB
MAXMIND_LICENSE_KEY=your_key bundle exec rake db:import_maxmind

# Force using the real DB in dev
MAXMIND_REAL_DB=1 bundle exec rails s

# Override country in development (no lookup)
CW_USER_COUNTRY_OVERRIDE=GB bundle exec rails s
```

## Running tasks

- Local:
	- Ensure `.env` has required keys (see `_docs/env.md`).
	- Use `bundle exec rake <task>`; add `RAILS_ENV=development|test` as needed.

- Deployment/CI:
	- Common tasks include `db:migrate`, `db:import_maxmind`, `assets:precompile`, and `db:admin_boilerplate:create` (see Capistrano logs and deploy scripts).

## Notes and tips

- Long-running imports log with `TimedLogger`; check your console output or logs for progress.
- When iterating on a single dataset, prefer the dataset-specific import task instead of the full `db:import` to save time.
- `db:reimport` is destructive; ensure you understand the reset it performs before running it against shared databases.
