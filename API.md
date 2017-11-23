# API docs

The rails server exposes a JSON API. All API endpoints are prefixed by `/api/v1`.

## Locations

### `GET /locations/countries`

Lists all locations that are countries

#### Query parameters

* `topojson` - if present, the location's topojson structure will be sent with the object.

### `GET /locations/regions`

Lists all locations that are regions

#### Query parameters

* `topojson` - if present, the location's topojson structure will be sent with the object.

## World Bank Demographic data (WB Extra)

### `GET /wb_extra`

Retrives World Bank demographic information (population and gdp) per country, per year.

#### Query parameters

* `startYear`
* `endYear`

#### Observations

Collection is serialized as an object with country codes as keys.

### `GET /wb_extra/:iso`

Retrives World Bank demographic information (population and gdp) per country, per year.

#### Query parameters

* `startYear` - show results from this year onwards
* `endYear` - show results up to this year

## Historical Emissions

### `GET /emissions/meta`

Retrieves metadata of the historical emissions dataset. This metadata is the list of `data_sources`, `sectors`, `gases`, `locations` and `gwps`. All these parameters are filters in the `/emissions` endpoint

#### Observations

Collection is serialized as an object with the metadata entity as key.

### `GET /emissions`

Retrieves time series data for historical emissions.

#### Query parameters

* `source` - emission data source id (cait, pik, wb)
* `gas` - emission gas id
* `sector` - emission sector id
* `gwp` - emission gwp id
* `location` - location iso3 code
* `date_after` - show results from this year onwards
* `date_before` - show results up to this year

Note: all these parameters accept multiple values, separated by commas.

#### Observations

`source` query parameter is mandatory, together with at least one of `location`, `sector` or `gas`.

## NDCs (texts)

### `GET /ndcs/text`

Lists all known NDC texts

#### Query parameters

* `query` - Free text search (lists snippets)

The following parameters can be used to search sdg linkages' snippets of text (lists snippets in the original text).

* `target` - NdcSdg target number
* `goal` - NdcSdg goal number
* `sector` - NdcSdg sector number

### `GET /ndcs/:iso/text`

Shows NDC texts for the country given by the :iso parameter

#### Query parameters

* `query` - Free text search (highlights snippets in the original text)

The following parameters can be used to search and highlight sdg linkages' snippets of text

* `target` - NdcSdg target number
* `goal` - NdcSdg goal number
* `sector` - NdcSdg sector number

## NDCs (SDG linkages)

### `GET /ndcs/sdgs`

Shows the relations between all SDG metadata (targets, goals and sectors)

#### Observations

Collection is serialized as an object with the metadata entity as key

### `GET /ndcs/:iso/sdgs`

Shows linkage data for the given country code.

### `GET /ndcs/sdgs_overview`

Shows an overview of linkage data to meet specific front-end requirements.

## NDCs (indicators)

### `GET /ndcs`

Lists NDC indicator information

#### Query parameters

* `filter` - Filter by category type (global, overview, map)

* `category` - Filter by global category name

* `location` - Filter by location iso code3. Accepts multiple values separated by commas.

#### Observations

Collection is serialized as an object with embedded metadata (`categories` and ` sectors` keys). NDC data is inside the `indicators` key, where the collection is again an object with country iso codes as keys.


### `GET /ndcs/:iso/content_overview`

Shows an overview of the given country's indicators, tailored to meet specific frontend needs.

## Adaptations

### `GET /adaptations`

Lists adaptation indicator data

#### Query parameters

* `location` - Filter by location iso code3. Accepts multiple values separated by commas.

## Quantifications

### `GET /quantifications`

Lists quantification data, representing NDC emissions targets.

#### Query parameters

* `location` - Filter by location iso code3. Accepts multiple values separated by commas.

## Socioeconomics

### `GET /socioeconomics/:iso`

Shows socioeconomic data for the given location `iso` code.

## Metadata

### `GET /metadata/acronyms`

Lists all acronyms from the metadata dataset

### `GET /metadata`

Lists all attribution data from the metadata dataset

### `GET /metadata/:source`

Shows the attribution data for the given `source`

## Timeline

### `GET /timeline`

Lists all timeline data

### `GET /timeline/:iso`

Shows timeline data for the given location `iso` code

## Stories

### `GET /stories`

#### Query parameters

* `limit`
