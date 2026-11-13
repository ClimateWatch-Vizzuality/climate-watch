---
layout: default
title: General architecture
nav_order: 1
parent: Developers
has_children: true
has_toc: true
permalink: /_docs/dev/architecture
---

## Frontend Architectural choices

The frontend is a [react](https://reactjs.org/) application with a [ruby on rails](https://rubyonrails.org/) backend.

We use [redux](https://redux.js.org/) as a state manager with [redux actions](https://redux-actions.js.org/).

For the router we use [react-router](https://reactrouter.com/).

There are some peculiarities in the architectural choices that we will outline in this section.

---

## Backend (Rails) architecture

- API-first Rails app serving a JSON REST API under `/api/v1` consumed by the SPA.
  - See `config/routes.rb` for the full map. Major domains include: Locations, NDCs (texts, SDG linkages, content_overview), LTS, Net-zero, Country profile, Historical emissions, Socioeconomics, Quantifications, Metadata, Timeline, Stories, LSE Laws & Policies, Notifications, Key Visualizations, Zip files. Downloadable CSV/ZIP endpoints live under the `/api/v1/data/*` namespaces.
  - Controllers live in `app/controllers/api/v1/**`, backed by AR models in `app/models/**` and JSON serializers in `app/serializers/api/v1/**`.
- Admin and jobs
  - Admin: Devise + ActiveAdmin; Sidekiq UI is mounted at `/sidekiq` for authenticated admins.
  - Background processing via Sidekiq; configuration in `config/initializers/sidekiq.rb`.
- Data ingestion pipeline
  - Central orchestration in `lib/tasks/db.rake`:
    - `db:import` chains dataset imports (locations, ndcs, sdgs, historical_emissions, adaptation, wri_metadata, wb_extra, timeline, quantifications, socioeconomics, stories, key_visualizations, country_profile, zip_files).
    - `db:reimport` resets a set of tables then invokes `db:import` (destructive; see task body for the exact list).
  - Dataset-specific tasks reside under `lib/tasks/*.rake` (e.g., `historical_emissions.rake`, `indc.rake`, `ndcs.rake`, `agriculture_profile.rake`, etc.).
- Geolocation
  - Uses MaxMind GeoLite2 to resolve user IP to a country code; see `app/services/geolocation_service.rb`.
  - `db:import_maxmind` downloads the real DB (requires `MAXMIND_LICENSE_KEY`). In development, you can force the real DB via `MAXMIND_REAL_DB=1` or override with `CW_USER_COUNTRY_OVERRIDE`.
- Persistence and environment
  - PostgreSQL is the DB (CI uses PostgreSQL 13). Local connection is read from `POSTGRES_URL` (`config/database.yml`).

## Frontend (React) architecture

- Entry points and bootstrapping
  - Webpacker pack at `app/javascript/packs/main.jsx` renders `<App />` into `#root`.
  - `app/javascript/app/app.jsx` wires `Provider` + `BrowserRouter` and builds the store from `app/javascript/app/store.js` (Redux + redux-thunk). The router `basename` is computed at runtime based on containment.
- Routing as data
  - Routes are defined as configuration in `app/javascript/app/routes/` and rendered with `react-router-config`.
  - The tree contains two major branches: `/embed` and the main app `/`; the main app may be wrapped by a "contained" layout depending on `isPageContained`.
- State and modules
  - Module-based structure: each feature co-locates component, actions, reducers, selectors, and styles.
  - Reducers are assembled via a `handleActions` wrapper and combined in `app/javascript/app/reducers.js`, which composes three groups: providers (data-fetching modules), pages, and reusable components.
  - Async flows use `redux-thunk`. A large set of provider modules live under `app/javascript/app/providers/**` and are attached to the store (see `reducers.js`).
- Styling and theming
  - CSS Modules with SCSS are the default; theming via `react-css-themr` for reusable components.
- Environment-driven behavior
  - Frontend reads `CW_API`, `ESP_API`, and `GFW_API` from the environment (injected at build time). See `app/javascript/app/data/constants.js` for login URLs and other constants derived from these values.

## Routing model (Rails ↔ SPA)

- Rails serves the HTML shell at `/` and falls back to `application#index` for client-side routes.
- API endpoints are strictly under `/api/v1/**`. The browser-only routes are handled by React Router; embedded experiences are mounted at `/embed/*`.

## Build system and asset pipeline

- Webpack 5 via Webpacker with custom configs under `config/webpack/*`:
  - `shared.js` injects `.env` values, sets up CSS Modules, SCSS loaders, SVG sprite loader, file-loader assets, module aliases (`app`, `components`, `routes`), and a manifest plugin.
  - `development.js` configures the dev server (CORS headers, historyApiFallback, polling watch). `production.js` adds Terser, MiniCssExtract, environment plugin (GA and API variables), WebP optimization, and gzip compression with hashed filenames.
- Node version is pinned to 12.13.0 (`.nvmrc`). Yarn 1.x is used across scripts.

## Testing and CI

- Frontend: Jest configured in `jest.config.js` with `rootDir: app/javascript/app`, Babel transform, and moduleNameMapper for SCSS and path aliases.
- Backend: RSpec lives under `spec/**` with controllers, models, services, factories, and JSON schema matchers.
- GitHub Actions split suites:
  - Backend tests: bundle, set up Postgres service, prepare the test DB, run `bundle exec rspec`.
  - Frontend tests: set up Node/Ruby, install, prepare DB (for parity), run `yarn test`.
  - Security: Brakeman and bundle-audit.

## Environment and configuration

- Key environment variables (also see `.env.sample` and `_docs/env.md`):
  - `POSTGRES_URL`, `REDIS_SERVER`, `CW_API`, `ESP_API`, `GFW_API`, `DEV_USER_ID`, `DEV_USER_TOKEN`, `MAXMIND_LICENSE_KEY`, GA/Tag Manager IDs, and feature flags (`FEATURE_*`).
- Docker compose is available for local orchestration of Rails, Webpack dev server, PostgreSQL, and Redis.

## Useful entry points (by file path)

- Rails API surface: `config/routes.rb`
- Data import orchestration: `lib/tasks/db.rake`
- SPA entry and composition:
  - `app/javascript/packs/main.jsx`
  - `app/javascript/app/app.jsx`
  - `app/javascript/app/store.js`
  - `app/javascript/app/reducers.js`
  - `app/javascript/app/routes/routes.js`
- Environment-driven constants: `app/javascript/app/data/constants.js`
- Webpack configuration: `config/webpack/*`
- Tests: `jest.config.js`, `spec/**`
