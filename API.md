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

## My Climate Watch (Users)

### `GET my_cw/user`

Shows the current user's information

### `POST my_cw/users`

Creates a new user in CW and links it to the Control Tower user

#### Query parameters

* `user[ct_id]` - The ID from Control Tower

## My Climate Watch (User Stories)

All these requests expects a header to identify the user, returning a `401` error if not provided.

### `GET my_cw/user_stories`

Lists all the stories of the current user

### `GET my_cw/user_stories/:id`

Shows the story with the given id (as long as it belongs to the user, otherwise it returns 403)

### `POST my_cw/user_stories`

Returns a `json` with the created story if successfully created or `422` if there was an error (and the reason for failing)

#### Query Params

* title (string) *MANDATORY* - The title of the story

* body (json) - The body of the story

* public (boolean) - The privacy of the story

### `PUT my_cw/user_stories/:id`

Returns a `json` with the updated story if successfully created or `422` if there was an error (and the reason for failing) or `401` if the user doesn't have permission to edit the story

#### Query Params

* user_story[title] (string) *MANDATORY* - The title of the story

* user_story[body] (json) - The body of the story

* user_story[public] (boolean) - The privacy of the story

### `DELETE my_cw/user_stories/:id`

Removes the story and returns `200` if it worked or `401` if the user doesn't have permission to delete the story

## My Climate Watch (Visualizations )

All these requests expects a header to identify the user, returning a `401` error if not provided.

### `GET my_cw/visualizations`

List all the visualizations of the current user

### `GET my_cw/visualizations/:id`

Shows the visualization with the given id (as long as it belongs to the user, otherwise it returns 403)

### `POST my_cw/visualizations`

Returns a `json` with the created visualization if successfully created or `422` if there was an error (and the reason for failing)

#### Query Params

* visualization[title] (string) *MANDATORY* - The title of the visualization

* visualization[description] (text) - The description of the visualization

* visualization[json_body] (json) - The body of the visualization

### `PUT my_cw/visualizations/:id`

Returns a `json` with the updated visualization if successfully created or `422` if there was an error (and the reason for failing) or `401` if the user doesn't have permission to edit the story

#### Query Params

* visualization[title] (string) *MANDATORY* - The title of the visualization

* visualization[description] (text) - The description of the visualization

* visualization[json_body] (json) - The body of the visualization

### `DELETE my_cw/visualizations/:id`

Removes the visualization and returns `200` if it worked or `401` if the user doesn't have permission to delete the story

