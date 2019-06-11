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
         "name":"string e.g. CAIT",
         "display_name":"string e.g. CAIT",
         "gas_ids":[1,2,3],
         "sector_ids":[1,2,3],
         "location_ids":[1,2,3]
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

## Agriculture Profiles

### Emissions

`/api/v1/data/agriculture_profile/emissions`

#### Parameters

- location_id
- iso_code3

#### Data

```
{
    "data": [
        {
            "values": {
                "1961": "645.1939",
                "1962": "647.313",
                "1963": "655.6237",
                "1964": "649.705",
                "1965": "655.735",
                "1966": "657.9464",
                "1967": "697.1418",
                "1968": "698.0193",
                "1969": "706.6969",
                "1970": "731.0808",
                "1971": "757.1259"
            },
            "emission_subcategory": {
                "name": "Manure Management",
                "short_name": "total_emissions_agr_2",
                "indicator_name": "Total Emissions in agriculture",
                "category_id": 100,
                "category_name": "Total Emissions",
                "category unit": "CO2eq gigagrams"
            }
        }
        ...
   ],
   "meta": {
     "emission_locations_with_data": ["ITA", "HUN", "COL", "IRQ"...]
   }
```

### Country Contexts

`/api/v1/data/agriculture_profile/country_contexts`

#### Parameters

- year
- location_id
- iso_code3

#### Data

```
{
    "data": [
        {
            "location_id": 16,
            "year": 1991,
            "employment_agri_female": 8.538000107,
            "employment_agri_male": 6.613999844,
            "employment_agri_total": 7.403999805,
            "total_pesticides_use": 4487,
            "total_fertilizers": 288700,
            "water_withdrawal": null,
            "water_withdrawal_rank": null,
            "value_added_agr": 2.347019
        }
    ],
    "meta": [
        {
            "id": 107,
            "short_name": "total_pesticides_use",
            "indicator": "Total pesticides use in agriculture",
            "category": "Total pesticides use",
            "subcategory": null,
            "unit": "tonnes of active ingredients"
        },
        {
            "id": 108,
            "short_name": "total_fertilizers",
            "indicator": "Total Fertilizers (agriculture use)",
            "category": "Total Fertilizers (agriculture use)",
            "subcategory": null,
            "unit": "tonnes"
        },
        {
            "id": 116,
            "short_name": "value_added_Agr",
            "indicator": "Value Added (Agriculture) in share of GDP in US$",
            "category": null,
            "subcategory": null,
            "unit": "%"
        },
        {
            "id": 143,
            "short_name": "water_withdrawal",
            "indicator": "Water withdrawal for agricultural use",
            "category": null,
            "subcategory": null,
            "unit": null
        },
        {
            "id": 152,
            "short_name": "employment_agri_female",
            "indicator": "Employment in agriculture, female (% of female employment) (modeled ILO estimate)",
            "category": null,
            "subcategory": null,
            "unit": "%"
        },
        {
            "id": 153,
            "short_name": "employment_agri_male",
            "indicator": "Employment in agriculture, male (% of female employment) (modeled ILO estimate)",
            "category": null,
            "subcategory": null,
            "unit": "%"
        },
        {
            "id": 154,
            "short_name": "employment_agri_total",
            "indicator": "Employment in agriculture (% of female employment) (modeled ILO estimate)",
            "category": null,
            "subcategory": null,
            "unit": "%"
        }
    ]
}
```

### Areas

`/api/v1/data/agriculture_profile/areas`

#### Parameters

- year
- location_id
- iso_code3

#### Data

```
{
    "data": [
        {
            "location_id": 16,
            "year": 1991,
            "share_in_land_area_1": 8258,
            "share_in_land_area_2": 3036.9,
            "share_in_land_area_3": 1438.9,
            "share_in_land_area_4": 3782.2,
            "share_in_agricultural_area_1": 1445,
            "share_in_agricultural_area_2": 79,
            "share_in_agricultural_area_3": 1512.9
        }
    ]

    "meta": [
            {
                "id": 109,
                "short_name": "share_in_land_area_1",
                "indicator": "Total Land Area",
                "category": "Land area",
                "subcategory": null,
                "unit": "1000 ha"
            },
            {
                "id": 110,
                "short_name": "share_in_land_area_2",
                "indicator": "Share in Land Area",
                "category": "Agricultural Area",
                "subcategory": null,
                "unit": "1000 ha"
            },
            {
                "id": 111,
                "short_name": "share_in_land_area_3",
                "indicator": "Share in Land Area",
                "category": "Other Land",
                "subcategory": null,
                "unit": "1000 ha"
            },
            {
                "id": 112,
                "short_name": "share_in_land_area_4",
                "indicator": "Share in Land Area",
                "category": "Forest",
                "subcategory": null,
                "unit": "1000 ha"
            },
            {
                "id": 113,
                "short_name": "share_in_agricultural_area_1",
                "indicator": "Share in Agriculture Area",
                "category": "Arable land",
                "subcategory": null,
                "unit": "1000 ha"
            },
            {
                "id": 114,
                "short_name": "share_in_agricultural_area_2",
                "indicator": "Share in Agriculture Area",
                "category": "Permanent crops",
                "subcategory": null,
                "unit": "1000 ha"
            },
            {
                "id": 115,
                "short_name": "share_in_agricultural_area_3",
                "indicator": "Share in Agriculture Area",
                "category": "Permanent meadows and pastures",
                "subcategory": null,
                "unit": "1000 ha"
            }
        ]
```

### Meat Consumption

`/api/v1/data/agriculture_profile/meat_consumptions`

#### Parameters

- year
- location_id
- iso_code3

#### Data

```
{
    "data": [
        {
            "location_id": 16,
            "year": 1991,
            "meat_consumption_1": 112,
            "meat_consumption_2": 3,
            "meat_consumption_3": 189,
            "meat_consumption_4": 153,
            "meat_consumption_per_capita_1": 2.952443071,
            "meat_consumption_per_capita_2": 0.088121388,
            "meat_consumption_per_capita_3": 6.263397087,
            "meat_consumption_per_capita_4": 5.07036907
        }
    ]
    "meta": [
            {
                "id": 144,
                "short_name": "meat_consumption_1",
                "indicator": "Meat consumption",
                "category": "Beef",
                "subcategory": null,
                "unit": "thousand tonnes"
            },
            {
                "id": 145,
                "short_name": "meat_consumption_2",
                "indicator": "Meat consumption",
                "category": "Pork",
                "subcategory": null,
                "unit": "thousand tonnes"
            },
            {
                "id": 146,
                "short_name": "meat_consumption_3",
                "indicator": "Meat consumption",
                "category": "Poultry",
                "subcategory": null,
                "unit": "thousand tonnes"
            },
            {
                "id": 147,
                "short_name": "meat_consumption_4",
                "indicator": "Meat consumption",
                "category": "Sheep",
                "subcategory": null,
                "unit": "thousand tonnes"
            },
            {
                "id": 148,
                "short_name": "meat_consumption_per_capita_1",
                "indicator": "Meat consumption per capita",
                "category": "Beef",
                "subcategory": null,
                "unit": "kilograms/capita"
            },
            {
                "id": 149,
                "short_name": "meat_consumption_per_capita_2",
                "indicator": "Meat consumption per capita",
                "category": "Pork",
                "subcategory": null,
                "unit": "kilograms/capita"
            },
            {
                "id": 150,
                "short_name": "meat_consumption_per_capita_3",
                "indicator": "Meat consumption per capita",
                "category": "Poultry",
                "subcategory": null,
                "unit": "kilograms/capita"
            },
            {
                "id": 151,
                "short_name": "meat_consumption_per_capita_4",
                "indicator": "Meat consumption per capita",
                "category": "Sheep",
                "subcategory": null,
                "unit": "kilograms/capita"
            }
        ]
```

### Meat Production

`/api/v1/data/agriculture_profile/meat_productions`

#### Parameters

- year
- location_id
- iso_code3

#### Data

```
{
    "data": [
        {
            "location_id": 16,
            "year": 1991,
            "production_agr_1": 1571361,
            "production_agr_2": null,
            "production_agr_3": 36770,
            "production_agr_4": 1375253,
            "production_agr_5": 243791,
            "production_agr_6": 462406,
            "production_agr_7": 76733,
            "production_agr_8": 312,
            "production_agr_9": 3329700,
            "production_agr_10": 17762
        }
    ]
    "meta": [
            {
                "id": 117,
                "short_name": "production_Agr_1",
                "indicator": "Agriculture Production",
                "category": "Maize",
                "subcategory": null,
                "unit": "tonnes"
            },
            {
                "id": 118,
                "short_name": "production_Agr_2",
                "indicator": "Agriculture Production",
                "category": "Rice Paddy",
                "subcategory": null,
                "unit": "tonnes"
            },
            {
                "id": 119,
                "short_name": "production_Agr_3",
                "indicator": "Agriculture Production",
                "category": "Soy beans",
                "subcategory": null,
                "unit": "tonnes"
            },
            {
                "id": 120,
                "short_name": "production_Agr_4",
                "indicator": "Agriculture Production",
                "category": "Wheat",
                "subcategory": null,
                "unit": "tonnes"
            },
            {
                "id": 121,
                "short_name": "production_Agr_5",
                "indicator": "Agriculture Production",
                "category": "Cattle",
                "subcategory": null,
                "unit": "tonnes"
            },
            {
                "id": 122,
                "short_name": "production_Agr_6",
                "indicator": "Agriculture Production",
                "category": "Pig",
                "subcategory": null,
                "unit": "tonnes"
            },
            {
                "id": 123,
                "short_name": "production_Agr_7",
                "indicator": "Agriculture Production",
                "category": "Chicken",
                "subcategory": null,
                "unit": "tonnes"
            },
            {
                "id": 124,
                "short_name": "production_Agr_8",
                "indicator": "Agriculture Production",
                "category": "Goat",
                "subcategory": null,
                "unit": "tonnes"
            },
            {
                "id": 125,
                "short_name": "production_Agr_9",
                "indicator": "Agriculture Production",
                "category": "Milk Cow",
                "subcategory": null,
                "unit": "tonnes"
            },
            {
                "id": 126,
                "short_name": "production_Agr_10",
                "indicator": "Agriculture Production",
                "category": "Milk Goat",
                "subcategory": null,
                "unit": "tonnes"
            }
        ]
```

### Meat Trade

`/api/v1/data/agriculture_profile/meat_trades`

#### Parameters

- year
- location_id
- iso_code3

#### Data

```
{
    "data": [
        {
            "location_id": 16,
            "year": 1991,
            "trade_import_1": 66511,
            "trade_import_2": 118,
            "trade_import_3": 7149,
            "trade_import_4": 12007,
            "trade_import_5": 2803,
            "trade_import_6": 1626,
            "trade_import_7": 2,
            "trade_import_8": 480,
            "trade_export_1": 1164,
            "trade_export_2": 329340,
            "trade_export_3": 1172,
            "trade_export_4": 107164,
            "trade_export_5": 3430,
            "trade_export_6": 4,
            "trade_export_7": null,
            "trade_export_8": 1427
        }
    ]
    "meta": [
            {
                "id": 127,
                "short_name": "trade_export_1",
                "indicator": "Trade of agriculture commodities",
                "category": "Export",
                "subcategory": "Rice",
                "unit": "tonnes"
            },
            {
                "id": 128,
                "short_name": "trade_export_2",
                "indicator": "Trade of agriculture commodities",
                "category": "Export",
                "subcategory": "Wheat",
                "unit": "tonnes"
            },
            {
                "id": 129,
                "short_name": "trade_export_3",
                "indicator": "Trade of agriculture commodities",
                "category": "Export",
                "subcategory": "Soybeans",
                "unit": "tonnes"
            },
            {
                "id": 130,
                "short_name": "trade_export_4",
                "indicator": "Trade of agriculture commodities",
                "category": "Export",
                "subcategory": "Maize",
                "unit": "tonnes"
            },
            {
                "id": 131,
                "short_name": "trade_export_5",
                "indicator": "Trade of agriculture commodities",
                "category": "Export",
                "subcategory": "Cow",
                "unit": "tonnes"
            },
            {
                "id": 132,
                "short_name": "trade_export_6",
                "indicator": "Trade of agriculture commodities",
                "category": "Export",
                "subcategory": "Chicken",
                "unit": "tonnes"
            },
            {
                "id": 133,
                "short_name": "trade_export_7",
                "indicator": "Trade of agriculture commodities",
                "category": "Export",
                "subcategory": "Goat",
                "unit": "tonnes"
            },
            {
                "id": 134,
                "short_name": "trade_export_8",
                "indicator": "Trade of agriculture commodities",
                "category": "Export",
                "subcategory": "Pig",
                "unit": "tonnes"
            },
            {
                "id": 135,
                "short_name": "trade_import_1",
                "indicator": "Trade of agriculture commodities",
                "category": "Import",
                "subcategory": "Rice",
                "unit": "tonnes"
            },
            {
                "id": 136,
                "short_name": "trade_import_2",
                "indicator": "Trade of agriculture commodities",
                "category": "Import",
                "subcategory": "Wheat",
                "unit": "tonnes"
            },
            {
                "id": 137,
                "short_name": "trade_import_3",
                "indicator": "Trade of agriculture commodities",
                "category": "Import",
                "subcategory": "Soybeans",
                "unit": "tonnes"
            },
            {
                "id": 138,
                "short_name": "trade_import_4",
                "indicator": "Trade of agriculture commodities",
                "category": "Import",
                "subcategory": "Maize",
                "unit": "tonnes"
            },
            {
                "id": 139,
                "short_name": "trade_import_5",
                "indicator": "Trade of agriculture commodities",
                "category": "Import",
                "subcategory": "Cow",
                "unit": "tonnes"
            },
            {
                "id": 140,
                "short_name": "trade_import_6",
                "indicator": "Trade of agriculture commodities",
                "category": "Import",
                "subcategory": "Chicken",
                "unit": "tonnes"
            },
            {
                "id": 141,
                "short_name": "trade_import_7",
                "indicator": "Trade of agriculture commodities",
                "category": "Import",
                "subcategory": "Goat",
                "unit": "tonnes"
            },
            {
                "id": 142,
                "short_name": "trade_import_8",
                "indicator": "Trade of agriculture commodities",
                "category": "Import",
                "subcategory": "Pig",
                "unit": "tonnes"
            }
        ]
```
