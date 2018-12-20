# Data Explorer JSON API & CSV download

## Historical emissions

### Parameters
- regions[] (ISO code 3)
- source_ids[]
- gas_ids[]
- sector_ids[]
- start_year
- end_year
- sort_dir (ASC / DESC)
- sort_col (column name or year - see meta)

### CSV download endpoint

`/api/v1/data/historical_emissions/download.csv`


File format:

Country | Data source | Sector | Gas | Unit | year n | year n-1 | ...


### JSON API endpoint

#### Data

`/api/v1/data/historical_emissions`

```
{
   "data":[
      {
         "id":66319,
         "iso_code3":"ISO code 3",
         "country":"string",
         "data_source":"string",
         "sector":"string",
         "gas":"string",
         "unit":"string",
         "emissions":[
            {
               "year":integer,
               "value":double
            }
         ]
      }
   ],
   "meta":{
      "years":[
         integer
      ],
      "header_years":[
         integer
      ],
      "columns":[
         "string"
      ],
      "sorting":{
         "sort_col":"string","sort_dir":"string"
      }
   }
}
```

Response is paginated. Pagination headers are in place. Meta section is to inform the rendering of data in a tabular form: it lists available years of data without year range filter applied (useful when used as dropdowns) and years of data with year range filter applied (useful when used as column headers) and all available data columns. Current sorting column and direction are also returned.

```
Link: <http://localhost:3000/api/v1/data/historical_emissions?page=622&start_year=2000>; rel="last", <http://localhost:3000/api/v1/data/historical_emissions?page=2&start_year=2000>; rel="next"
Per-Page: 50
Total: 31090
```

#### Metadata

`/api/v1/data/historical_emissions/meta`

Returns a Link header with meta endpoint urls for discovery (can be used with a HEAD request)

```
Link: </api/v1/data/historical_emissions/data_sources>; rel="meta data_sources", </api/v1/data/historical_emissions/gases>; rel="meta gases", </api/v1/data/historical_emissions/sectors>; rel="meta sectors", </api/v1/locations/regions>; rel="meta locations"
```

### Data sources

`/api/v1/data/historical_emissions/data_sources`

```
{
   "data":[
      {
         "id":number,
         "name":"string e.g. CAIT"
      }
   ]
}
```

### Gases

`/api/v1/data/historical_emissions/gases`

```
{
   "data":[
      {
         "id":number,
         "name":"string e.g. All GHG"
      }
   ]
}
```

### Sectors

`/api/v1/data/historical_emissions/sectors`

```
{
   "data":[
      {
         "id":number,
         "name":"string",
         "parent_id":number or null,
         "data_source_id":number,
         "annex_type":"string or null"
      }
   ]
}
```

### Regions

`/api/v1/locations/regions`

```
[
   {
      "iso_code3":"ISO code 3 or region abbreviation",
      "pik_name":"string or null",
      "cait_name":"string or null",
      "ndcp_navigators_name":"string or null",
      "wri_standard_name":"string",
      "unfccc_group":"string or null",
      "centroid":"string or null",
      "members":[
         {
            "iso_code3":"ISO code 3",
            "pik_name":"string",
            "cait_name":"string",
            "ndcp_navigators_name":"string or null",
            "wri_standard_name":"string",
            "unfccc_group":"string or null",
            "centroid":{
               "type":"Point",
               "coordinates":[
                  double,
                  double
               ]
            }
         }
      ]
   }
]
```

## NDC SDG linkages

### Parameters
- countries[]
- goal_ids[]
- target_ids[]
- sector_ids[]
- sort_dir (ASC / DESC)
- sort_col (column name for sortable columns - see meta)

### CSV download endpoint

`/api/v1/data/ndc_sdg/download.csv`


File format:

Country | SDG | SDG Target | Indc text | Status | Sector | Climate response | Type of information

### JSON API endpoint

#### Data

`/api/v1/data/ndc_sdg`

```
{
   "data":[
      {
         "id":1,
         "iso_code3":"ISO code 3",
         "country":"name",
         "sdg":"17 Strengthen the means of implementation and revitalize the global partnership for sustainable development",
         "sdg_target":"17.6 Enhance North-South, South-South and triangular regional and international cooperation on and access to science, technology and innovation and enhance knowledge sharing on mutually agreed terms, including through improved coordination among existing mechanisms, in particular at the United Nations level, and through a global technology facilitation mechanism",
         "indc_text":"Matching text",
         "status":"Future",
         "sector":"Forest and land use",
         "climate_response":"Adaptation",
         "type_of_information":"Needs \u0026 Gaps"
      }
   ],
   "meta":{
      "columns":[
         "string"
      ],
      "statuses":[
        "string"
      ],
      "climate_responses":[
        "string"
      ],
      "types_of_information":[
        "string"
      ]
      "sorting":{
         "sort_col":"string","sort_dir":"string"
      }
   }
}
```

Response is paginated. Pagination headers are in place. Meta section is to inform the rendering of data in a tabular form: it lists available data columns. Current sorting column and direction are also returned.

```
Link: <http://localhost:3000/api/v1/data/ndc_sdg?page=170>; rel="last", <http://localhost:3000/api/v1/data/ndc_sdg?page=2>; rel="next"
Per-Page: 50
Total: 8498
```

#### Metadata

`/api/v1/data/ndc_sdg/meta`

Returns a Link header with meta endpoint urls for discovery (can be used with a HEAD request)

```
Link: </api/v1/data/ndc_sdg/goals>; rel="meta goals", </api/v1/data/ndc_sdg/targets>; rel="meta targets", </api/v1/data/ndc_sdg/sectors>; rel="meta sectors", </api/v1/locations/countries>; rel="meta locations"
```

### Goals

`/api/v1/data/ndc_sdg/goals?inlude_targets=1&include_sectors=1`

```
{
   "data":[
      {
         "id":18,
         "number":"1",
         "title":"End poverty in all its forms everywhere",
         "cw_title":"No poverty",
         "targets":[
            {
               "id":177,
               "goal_id":18,
               "number":"1.b",
               "title":"Create sound policy frameworks at the national, regional and international levels, based on pro-poor and gender-sensitive development strategies, to support accelerated investment in poverty eradication actions",
               "sectors":[
                  {
                     "id":589,
                     "name":"Rural Development"
                  }
               ]
            }
         ]
      }
   ]
}
```

### Targets

`/api/v1/data/ndc_sdg/targets?goal_id=18&include_sectors=1`

```
{
   "data":[
      {
         "id":171,
         "goal_id":18,
         "number":"1.1",
         "title":"By 2030, eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day",
         "sectors":[
            {
               "id":581,
               "name":"Water"
            }
         ]
      }
   ]
}
```

### Sectors

`/api/v1/data/ndc_sdg/sectors`

```
{
   "data":[
      {
         "id":577,
         "name":"Forest and land use"
      }
   ]
}
```

### Countries

`/api/v1/locations/countries`

```
[
   {
      "iso_code3":"ISO code 3",
      "pik_name":"name",
      "cait_name":"name",
      "ndcp_navigators_name":null,
      "wri_standard_name":"name",
      "unfccc_group":"name",
      "centroid":{
         "type":"Point",
         "coordinates":[
            number,
            number
         ]
      }
   }
]
```

## NDC content

### Parameters
- source_ids[]
- countries[]
- category_ids[]
- sector_ids[]
- indicator_ids[]
- sort_dir (ASC / DESC)
- sort_col (column name for sortable columns - see meta)

### CSV download endpoint

`/api/v1/data/ndc_content/download.csv`


File format:

Country | Global category | Overview category | Sector | Subsector | Indicator Id | Indicator name | Value


### JSON API endpoint

#### Data

`/api/v1/data/ndc_content`

```
{
   "data":[
      {
         "id":1096025,
         "source":"string",
         "iso_code3":"ISO code 3",
         "country":"string",
         "global_category":"string",
         "overview_category":"string",
         "sector":"string or null",
         "subsector":"string or null",
         "indicator_id":"string",
         "indicator_name":"string",
         "value":"string",
      }
   ],
   "meta":{
      "columns":[
         "string"
      ],
      "sorting":{
         "sort_col":"string","sort_dir":"string"
      }
   }
}
```

Response is paginated. Pagination headers are in place. Meta section is to inform the rendering of data in a tabular form: it lists available data columns. Current sorting column and direction are also returned.

```
Link: <http://localhost:3000/api/v1/data/ndc_content?page=1933>; rel="last", <http://localhost:3000/api/v1/data/ndc_content?page=2>; rel="next"
Per-Page: 50
Total: 96650
```

#### Metadata

`/api/v1/data/ndc_content/meta`

Returns a Link header with meta endpoint urls for discovery (can be used with a HEAD request)

```
Link: </api/v1/data/ndc_content/indicators>; rel="meta indicators", </api/v1/data/ndc_content/categories>; rel="meta categories", </api/v1/data/ndc_content/labels>; rel="meta labels", </api/v1/data/ndc_content/sectors>; rel="meta sectors", </api/v1/locations/countries>; rel="meta locations"
```

### Data sources

`/api/v1/data/ndc_content/data_sources`

```
{
   "data":[
      {
         "id":53,
         "name":"CAIT"
      },
      {
         "id":54,
         "name":"WB"
      }
   ]
}
```

### Indicators

`/api/v1/data/ndc_content/indicators`

```
{
   "data":[
      {
         "id":6709,
         "slug":"indc_summary",
         "name":"(I)NDC summary",
         "description":null,
         "source_id":53,
         "category_ids":[
            821,
            817
         ]
      }
   ]
}
```

### Categories

`/api/v1/data/ndc_content/categories`

```
{
   "data":[
      {
         "id":1740,
         "slug":"overview",
         "name":"Overview",
         "parent_id":null,
         "category_type":{
            "id":181,
            "name":"global"
         }
      },
      {
         "id":1744,
         "slug":"ndc",
         "name":"NDC",
         "parent_id":1740,
         "category_type":{
            "id":182,
            "name":"overview"
         }
      }
   ]
}
```

### Sectors

`/api/v1/data/ndc_content/sectors`

```
{
   "data":[
      {
         "id":5538,
         "name":"Waste",
         "parent_id":null
      },
      {
         "id":5539,
         "name":"Waste: General",
         "parent_id":5538
      }
   ]
}
```
