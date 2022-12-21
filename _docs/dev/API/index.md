---
layout: default
title: API and layers
parent: Developers
has_children: true
has_toc: true
nav_order: 2
permalink: /_docs/dev/API
---

## API

This application is using an API from the rails backend (CW_API) as other services like the Emissions Pathways API (ESP_API) or the Global Forest Watch API (GFW_API).

## Climate Watch API Examples

### NDC-SDG Linkages

#### Overview page

- `GET /api/v1/ndcs/sdgs_overview` will return a response with the following
format:

```
[
  {
    "id": 35,
    "locations": {
      "AFG": {
        numbers:
          [
            "1.1",
            "1.5"
          ],
        document_type: 'ndc',
        language: 'EN'
      }
      "AGO": {
        numbers:
          [
            "1.1"
          ],
        document_type: 'indc',
        language: 'EN'
      }
    },
    "number": "1",
    "targets": [
      "1.1",
      "1.2",
      "1.3",
      "1.4",
      "1.5",
      "1.a",
      "1.b"
    ]
  }
]
```

Where:

- `id`: is the Sustainable Development Goal id;
- `number`: is the goal number;
- `locations`: is an array with all the locations that have linkages to targets
of this goal;
- `targets`: is the list of targets available for a given SDG goal;


#### WB (World Bank) Extra Country Data

- `GET /api/v1/wb_extra/`  will return a response with the following
format:

```
[
  'AUS':
    [
      {
          "population": 30739250,
          "gdp": 13834300571,
          "year": 1961,
          ...
      },
      {
          "population": 31023366,
          "gdp": 16138545209,
          "year": 1962.
          ...
      }, ...
    ],
  'ANG':
    ...
]
```

Where:

- `population`: is the total population for the year and the iso code of the country;
- `gdp`: is the gross domestic product for the year and the iso code of the country;
- `year`: year


- `GET /api/v1/wb_extra/:iso` will return a response with the following

extra params:
  startYear: min limit to the year. If its not included will get the closest min year
  endYear: min limit to the year. If its not included will get the closest max year

format:

```
[
    {
        "population": 30739250,
        "gdp": 13834300571,
        "year": 1961
    },
    {
        "population": 31023366,
        "gdp": 16138545209,
        "year": 1962
    }, ...
]
```
