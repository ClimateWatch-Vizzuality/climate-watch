# Data format guidelines

Over the course of the Climate Watch project, you may need/wish to update the sites data. Please provide your data updates according the following formatting guidelines.

**Please provide all files in comma separated value (*.csv*) format with utf-8 encoding.** This will avoid any issues with special characters. If you have your data in an Excel table and are unsure how to produce a *csv* file, you can export a single sheet (the active sheet) by clicking `Save As` in the drop-down `File` menu, and selecting *csv* as a file-type.

Unless you have a specific reason not to do so, you should leave any missing data fields blank. If there is currently filler data fields, such as NA, N/A, None, nil, -9999, etc, please remove these values and leave the entries blank (unless you have a good reason not to do so, and it is clear from the metadata that these missing data are present).

Please ensure columns are included with the column names written in an identical manner and that the contents conform to the below data types. Entries that must be present (i.e. fields that cannot be left blank) have their column names highlighted in bold.

Please avoid using hidden columns as you work on the file as a spreadsheet, because those will end up as visible in the CSV file and in case of column name clashes wrong data may be used unexpectedly. Any columns that are not needed should be deleted. Please also do not use highlighting on the file to denote special treatment of particular rows, as this information is lost when saving as a csv and is better encoded in the file by using a separate column.

Please as much as possible aim to design files in a horizontal manner, as csv files are normally read row by row and not in columns.

## NDC-SDG Linkages

For this data to be imported correctly some SDG metadata is needed first.

### sdgs.csv

| Column Name | Data Type | Example |
| ---| --|--|
| **number** | String  | SDG number e.g. 1 |
| **title** | String | full goal title (might be redundant if we only use short names), e.g. End poverty in all its forms everywhere |
| **cw_title** | String | goal title as displayed in Climate Watch, e.g. No poverty |

### sdg_targets.csv
| Column Name | Data Type | Example |
| ---| --|--|
| **goal_number** | String  | SDG number e.g. 1 |
| **number** | String  | SDG target number e.g. 1.1 |
| **title** | String | target title|

### ndc_sdg_targets.csv
| Column Name | Data Type | Example |
| ---| --|--|
| Country | String  | Country name e.g. Afghanistan, not required - for human perusal only |
| wri_standard_name | String | Standardised country name e.g. Afghanistan, not required - for human perusal only |
| **iso_code3** | String | 3-letter country iso code |
| Goal | String | Goal 1 - No Poverty |
| **Target** | String | 6.b |
| **INDC_text** | String | reduce poverty and improve agricultural productions |
|Status| String | Future |
|Sector| String | Comma-separated list of sectors e.g. Agriculture, Water |
| Climate_response | String | Mitigation |
| Type_of_information | String | Action |


## NDC Summary Content

The NDC summary data are spread across several sources: the World bank WB, CAIT, and DIE. These tables are the data source for NDC overview/comparison tables and also choropleths. The choropleths will use identical data to [DIE's klimalog](http://klimalog.die-gdi.de/ndc/#NDCExplorer/).

### DIE data
DIE Kimalog's site currently downloads their entire dataset to users (~300kb) in a csv file. We can use an identical method and their identical data:
[http://klimalog.die-gdi.de/ndc/assets/map_data/Explorer-NDC-Data.csv](http://klimalog.die-gdi.de/ndc/assets/map_data/Explorer-NDC-Data.csv)
These data will also be used in our summary tables. The dataset generally has two columns for every piece of data, a VIS for display as a Choropleth - these are integers indicating the category, and a TXT column containing the attributes to display on hover or in a table (the strings that should act as attributes/labels).
The DIE data are divided into 6 categories (
*cc_mitigation*, *cc_adaptation*, *finance_and_support*, *planning_process*, *broader_picture*
), the groupings and a sentence description are given in the file NDC content_data0424.xlsx, sheet DIE indicator.

The `Explorer-NDC-Data.csv` file (DIE data) contains the following columns:
```
'countryName',
'countryCode',
'1. typeOfTargetVIS',
'1. typeOfTargetTXT',
'2. costsOfCCMVIS',
'2. costsOfCCMTXT',
'3. renewableEnergyVIS',
'3. renewableenergyTXT',
'4. energyEffVIS',
'4. energyEffTXT',
'5. transportVIS',
'5. transportTXT',
'6. carbonCaptStorVIS',
'6. carbonCaptStorTXT',
'7. agricultureVIS',
'7. agricultureTXT',
'8. landUseChangeVIS',
'8. landUseChangeTXT',
'9. wasteVIS',
'9. wasteTXT',
'10. redNonCO2GasesVIS',
'10. redNonCO2GasesTXT',
'11. fossilFuelSubsidiaryVIS',
'11. fossilFuelSubsidiaryTXT',
'12. landusechangeVIS',
'12. landusechangeTXT',
'13. reddVIS',
'13. reddTXT',
'14. tradeVIS',
'14. tradeTXT',
'15. marketMechanismsVIS',
'15. marketMechanismsTXT',
'16. mitigationDocumentsVIS',
'16. mitigationDocumentsTXT',
'17. coBenefitsCCMVIS',
'17. coBenefitsCCMTXT',
'18. migrationDisplacementVIS',
'18. migrationDisplacementTXT',
'19. vulnerabilityAgricultureVIS',
'19. vulnerabilityAgricultureTXT',
'20. vulnerabilityWaterVIS',
'20. vulnerabilityWaterTXT',
'21. vulnerabilityEcosystemsVIS',
'21. vulnerabilityEcosystemsTXT',
'22. vulnerabilityHealthVIS',
'22. vulnerabilityHealthTXT',
'23. vulnerabilityCoastalZonesVIS',
'23. vulnerabilityCoastalZonesTXT',
'24. vulnerabilityCostsOfCRHVIS',
'24. vulnerabilityCostsOfCRHTXT',
'25. futureCostsVIS',
'25. futureCostsTXT',
'26. clRisksRxtremeWeatherVIS',
'26. clRisksExtremeWeatherTXT',
'27. clRisksFloodsVIS',
'27. clRisksFloodsTXT',
'28. clRisksDroughtsVIS',
'28. clRisksDroughtsTXT',
'29. clRisksTempIncreaseVIS',
'29. clRisksTempIncreaseTXT',
'30. clRisksSeaLevelRiseVIS',
'30. clRisksSeaLevelRiseTXT',
'31. prioritySectorsWaterVIS',
'31. prioritySectorsWaterTXT',
'32. prioritySectorsAgricultureVIS',
'32. prioritySectorsAgricultureTXT',
'33. prioritySectorsHealthVIS',
'33. prioritySectorsHealthTXT',
'34. prioritySectorsEcosystemsVIS',
'34. prioritySectorsEcosystemsTXT',
'35. prioritySectorsForestryVIS',
'35. prioritySectorsForestryTXT',
'36. quantifiedAdaptationTargetVIS',
'36. quantifiedAdaptationTargetTXT',
'37. costsOfAdaptationVIS',
'37. costsOfAdaptationTXT',
'38. adaptationDocumentsVIS',
'38. adaptationDocumentsTXT',
'39. coBenefitsCCAVIS',
'39. coBenefitsCCATXT',
'40. adaptationFinanceConditionalityVIS',
'40. adaptationFinanceConditionalityTXT',
'41. mitigationFinanceConditionalityVIS',
'41. mitigationFinanceConditionalityTXT',
'42. technNeedsVIS',
'42. techNeedsTXT',
'43. techTransferVIS',
'43. techTransferTXT',
'44. capacityBuildingVIS',
'44. capacityBuildingTXT',
'45. moiFairnessVIS',
'45. moiFairnessTXT',
'46. planningOfINDCFormulationVIS',
'46. planningOfINDCFormulationTXT',
'47. stakeholderConsFormulationVIS',
'47. stakeholderConsFormulationTXT',
'48. planningOfINDCImplementationVIS',
'48. planningOfINDCImplementationTXT',
'49. assessmentAndReviewVIS',
'49. assessmentAndReviewTXT',
'50. conjunctionWithSDGsVIS',
'50. conjunctionWithSDGsTXT',
'51. conjunctionWithNatSustDevtVIS',
'51. conjunctionWithNatSustDevtTXT',
'52. fossilFuelSubsReformVIS',
'52. fossilFuelSubsReformTXT',
'53. greenEconomyVIS',
'53. greenEconomyTXT',
'54. disasterRiskReductionVIS',
'54. disasterRiskReductionTXT',
'55. sectionOnFairnessVIS',
'55. sectionOnFairnessTXT',
'56. historicalResponsibVIS',
'56. historicalResponsibTXT',
'57. lossAndDamageVIS',
'57. lossAndDamageTXT',
'58. genderVIS',
'58. genderTXT',
'59. humanRightsVIS',
'59. humanRightsTXT',
'byIncomeVIS',
'byIncomeTXT',
'byRegionVIS',
'byRegionTXT',
'g20VIS',
'g20TXT',
```

### CAIT data

Currently these data seems to be in `NDC content data 0424.xlsx`. Looks like they need cleaning. We will ask WRI to clean these data and move these into a csv format, as testing indicates the file will be small.
E.g. currently there are values in percent with % symbol attached, html instead of unicode text, dates some as just date others with time attached, column names should be snake case, we should also have metadata dictionary mapping the column name to description. "" used to encapsulate any string with a comma inside. Blanks permitted.

## NDC Files

Collection of `.md` files, stored in a S3 bucket.

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
| **source** | String, e.g. 'CAIT', spelt exactly as in the Data sources file  |
| **name** | String, e.g. 'Electricity/Heat' |
| parent | String e.g. 'Energy', spelt exactly as the name of the parent sector |
| **gas** | String, e.g. 'CO2' or 'All GHG' |
| **unit** | String, e.g. 'MtCO2e' |
| definition | String, e.g. 'Emissions from energy sector' |

Please note: rows which define subsectors should follow rows which defined their parents.

### Countries

Countries and country groups for which data is collected are referenced by a code, which is the 3-digit iso codes in case of countries and a custom code in case of country groups.

| column name | data type |
| ---| --|
| **iso_code3** | String, 3-digit iso code for countries and custom code for country groups, e.g. 'USA'  |
| **iso_code2** | String, 2-digit iso code for countries and custom code for country groups, e.g. 'USA'  |
| **wri_standard_name** | String, name as displayed in the system, e.g. 'United States' |
| **location_type** | String, COUNTRY, REGION or GROUP |
| **show_in_cw** | String, 'no' if location not to be displayed |
| pik_name | String, name as used in PIK dataset|
| cait_name | String, name as used in CAIT dataset|
| ndcp_navigators_name | String, name as used in NDCP Navigators |
| unfccc_group | String, e.g. UNFCCC Non-Annex I |

### Country groups and regions

| column name | data type |
| ---| --|
| **parent_iso_code3** | String, 3-digit iso code for country groups, e.g. 'EUU'|
|name | String, name of country who is a member of a group, e.g. 'Poland' (not required)|
| **iso_code3** | String, 3-digit iso code for country who is member of a group, e.g. 'POL'|

### Emissions

| column name | data type |
| ---| --|
| **country** | String matching the `code` attribute of countries |
| **source** | String matching the `name` property of sources |
| **sector** | String matching the `name` attribute of sectors |
| **gas** | String matching the `gas` property of sectors |
| **gwp** | String, e.g. 'AR2' |
| **year** | Integer, e.g. 2000 |
| **value** | Float, e.g. 5.8 |

## Indicators
