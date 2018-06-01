# Data Explorer JSON API & CSV download

## Historical emissions

### Parameters
- regions[] (ISO code 3)
- source_ids[]
- gwp_ids[]
- gas_ids[]
- sector_ids[]
- years[]

### CSV download endpoint

`/api/v1/data/historical_emissions/download.csv`


File format:

Iso code 3 | Region | Data source | Gwp | Sector | Gas | Unit | year 1 | year 2 | ...


### JSON API endpoint

#### Data

`/api/v1/data/historical_emissions`

```
{
   "data":[
      {
         "id":66319,
         "region":"string",
         "iso_code3":"ISO code 3",
         "data_source":"string",
         "gwp":"string",
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
      ]
   }
}
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
{
   "data":[
      {
         "id":number,
         "name":"string e.g. CAIT"
      }
   ]
}
```

### GWPs

`/api/v1/data/historical_emissions/gwps`

```
{
   "data":[
      {
         "id":number,
         "name":"string e.g. AR2"
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
