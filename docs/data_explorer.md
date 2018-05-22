# Data Explorer JSON API & CSV download

## Historical emissions

### Parameters
- source_ids[]
- gwp_ids[]
- region_ids[]
- gas_ids[]
- sector_ids[]
- years[]

### CSV download endpoint

`/api/v1/data/historical_emissions/download.csv`


File format:

Source | Gwp | Iso code 3 | Region | Gas | Unit | Sector | year 1 | year 2 | ...

### JSON API endpoint

#### Data

`/api/v1/data/historical_emissions`

```
[
  {
    "source": "name",
    "gwp": "name",
    "region": "name",
    "gas": "name",
    "unit": "name",
    "sector": "name",
    "emissions": [
      {"year": 2000, "value": 0.9090}
    ]
  }
]
```

Response is paginated. Pagination headers are in place.

```
Link: <http://localhost:3000/api/v1/data/historical_emissions?page=622&start_year=2000>; rel="last", <http://localhost:3000/api/v1/data/historical_emissions?page=2&start_year=2000>; rel="next"
Per-Page: 50
Total: 31090
```

#### Metadata

`/api/v1/data/historical_emissions/meta`

Returns a Link header with meta endpoint urls for discovery (can be used with a HEAD request)

```
Link: </api/v1/data/historical_emissions/data_sources>; rel="meta data_sources", </api/v1/data/historical_emissions/gwps>; rel="meta gwps", </api/v1/data/historical_emissions/gases>; rel="meta gases", </api/v1/data/historical_emissions/sectors>; rel="meta sectors", </api/v1/locations/regions>; rel="meta locations"
```

### Data sources

`/api/v1/data/historical_emissions/data_sources`

```
[
   {
      "id":7,
      "name":"CAIT"
   }
]
```

### GWPs

`/api/v1/data/historical_emissions/gwps`

```
[
   {
      "id":1,
      "name":"AR2"
   }
]
```

### Gases

`/api/v1/data/historical_emissions/gases`

```
[
   {
      "id":25,
      "name":"All GHG"
   }
]
```

### Sectors

`/api/v1/data/historical_emissions/sectors`

```
[
   {
      "id":69,
      "name":"Total excluding LUCF",
      "parent_id":null,
      "data_source_id":7,
      "annex_type":null
   }
]
```

### Regions

`/api/v1/locations/regions`

```
[
   {
      "iso_code3":"AILAC",
      "pik_name":null,
      "cait_name":null,
      "ndcp_navigators_name":null,
      "wri_standard_name":"AILAC",
      "unfccc_group":null,
      "centroid":null,
      "members":[
         {
            "iso_code3":"CHL",
            "pik_name":"Chile",
            "cait_name":"Chile",
            "ndcp_navigators_name":null,
            "wri_standard_name":"Chile",
            "unfccc_group":"UNFCCC Non-Annex I",
            "centroid":{
               "type":"Point",
               "coordinates":[
                  -71.3643727120124,
                  -37.7436220064921
               ]
            }
         }
      ]
   }
]
```
