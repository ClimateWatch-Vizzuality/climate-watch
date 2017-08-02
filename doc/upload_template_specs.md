# Data format guidelines

Over the course of the Climate Watch project, you may need/wish to update the sites data. Please provide your data updates according the following formatting guidelines.

**Please provide all files in comma separated value (*.csv*) format with utf-8 encoding.** This will avoid any issues with special characters. If you have your data in an Excel table and are unsure how to produce a *csv* file, you can export a single sheet (the active sheet) by clicking `Save As` in the drop-down `File` menu, and selecting *csv* as a file-type.

Unless you have a specific reason not to do so, you should leave any missing data fields blank. If there is currently filler data fields, such as NA, N/A, None, nil, -9999, etc, please remove these values and leave the entries blank (unless you have a good reason not to do so, and it is clear from the metadata that these missing data are present).

## NDC-SDG Linkages

If you wish to update the NDC-SDG linkages table, ensure the following columns are included with the column names written in an identical manner and contents conforming to the below noted data types.:

| column name | data type |
| ---| --|
|  Country | String  |
| Goal| String separated by hyphen e.g. 'Goal 1 - No Poverty' |
|Target| String e.g. '6.b'|
| INDC_text| String e.g. 'reduce poverty and improve agricultural productions' |
|Status| String, e.g. 'Future'|
|Sector| String. Keywords separated by commas, e.g.'Agriculture, Water'|
| Climate_response | String, e.g. 'Mitigation' |
| Type_of_information | String, e.g. 'Action' |
| conditionality | String, e.g. 'conditional' |
| Governance_Level | String, e.g. 'National level' |
| Cooperation_type | String, e.g. 'Individual' |
| Non-CO2_Gases  | String, e.g. 'Black carbon' |
| Carbon_Pricing | String, e.g. 'not specified' |


## NDC Summary Content


## NDC Files

## Historical Climate data

### Data sources
| column name | data type |
| ---| --|
|  **name** | String, e.g. 'CAIT'  |
| long_name| String, e.g. 'CAIT Paris Contributions Map' |
| link | String e.g. 'http://cait.wri.org/indc/' |

### Sectors
| column name | data type |
| ---| --|
| **source** | String, e.g. 'CAIT', spellt exactly as in the Data sources file  |
| **name** | String, e.g. 'Electricity/Heat' |
| parent | String e.g. 'Energy', spellt exactly as the name of the parent sector |

Please note: rows which define subsectors should follow rows which defined their parents.

### Countries

Countries and country groups for which data is collected are referenced by a code, which is the 3-digit iso codes in case of countries and a custom code in case of country groups.

1. QUESTION: do we need to know which countries make up a country group? In such case another meta data file with inclusion relationships is needed
2. QUESTION: do we need to know what the name of the country is for PIK or CAIT or other data sources? In such case more columns are needed
3. QUESTION: is the difference between a REGION and a COUNTRY_GROUP relevant for the system? If not, possibly we could just have a boolean flag to say it's a group of countries instead of the type column
4. QUESTION: do we need the UNFCCC group here?

| column name | data type |
| ---| --|
| **Code** | String, 3-digit iso code for countries and custom code for country groups, e.g. 'USA'  |
| **Name** | String, name as displayed in the system, possibly the WRI standard name, e.g. 'United States' |
| **Type** | String, one of COUNTRY, REGION, COUNTRY_GROUP |


## Indicators
