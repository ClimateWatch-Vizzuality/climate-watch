import { createSelector } from 'reselect';
import { getColorByIndex, createLegendBuckets } from 'utils/map';
import { deburrUpper } from 'app/utils';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import { generateLinkToDataExplorer } from 'utils/data-explorer';
import worldPaths from 'app/data/world-50m-paths';
import { europeSlug, europeanCountries } from 'app/data/european-countries';
import { PATH_LAYERS } from 'app/data/constants';
import isEmpty from 'lodash/isEmpty';

const getSearch = state => state.search || null;
const getCountries = state => state.countries || null;
const getCategoriesData = state => state.categories || null;
const getIndicatorsData = state => state.indicators || null;
const getQuery = state => deburrUpper(state.query) || '';

const targetIndicators = [
  "submission",
  "ndce_2020_submitted",
  "ndce_plan_2020",
  "ndce_2015_revised"
]

export const getISOCountries = createSelector([getCountries], countries =>
  countries.map(country => country.iso_code3)
);

export const getCategories = createSelector(getCategoriesData, categories => {
  if (!categories) return null;
  return (sortBy(
    Object.keys(categories).map(category => ({
      label: categories[category].name,
      value: categories[category].slug,
      id: category
    })),
    'label'
  )).filter(cat => cat.value === 'ndc_enhancement' || cat.value === 'unfccc_process');
});

export const getIndicatorsParsed = createSelector(
  [getIndicatorsData, getISOCountries],
  (indicators, isos) => {
    if (!indicators || !indicators.length) return null;
    return sortBy(
      uniqBy(
        indicators.map(i => {
          const legendBuckets = createLegendBuckets(
            i.locations,
            i.labels,
            isos
          );
          return {
            label: i.name,
            value: i.slug,
            categoryIds: i.category_ids,
            locations: i.locations,
            legendBuckets
          };
        }),
        'value'
      ),
      'label'
    );
  }
);

export const getCategoryIndicators = createSelector(
  [getIndicatorsParsed, getCategories],
  (indicatorsParsed, categories) => {
    if (!indicatorsParsed) return null;
    const categoryIndicators = indicatorsParsed.filter(
      indicator => {
        let found = false;
        categories.every(cat => {
          found = indicator.categoryIds.indexOf(parseInt(cat.id)) > -1;
          return !found;
        });
        return found;
      }
    );
    return categoryIndicators;
  }
);

export const getIndicators = createSelector(
  getCategoryIndicators,
  (indicators = []) => {
    if (!indicators || !indicators.length) return null;
    return indicators.filter(
      ind => targetIndicators.indexOf(ind.value) > -1
    ).sort(
      (a,b) => a.value == "submission" ? -1 : 0
    );
  }
);

export const mergeIndicators = createSelector(
  [getIndicators,getISOCountries],
  (indicators = [],isos) => {
    if (!indicators || !indicators.length) return {};
    const {categoryIds,locations} = indicators[0];
    const mergedIndicator = {
      categoryIds,
      locations,
      label: "Status of NDC Enhancement(s)",
      labels: {},
      value: "ndce_status"
    };
    const indicatorRef = {};
    indicators.forEach((indicator,i) => {
      if (indicator.value !== "submission") {
        indicatorRef[indicator.value] = indicator.label;
        mergedIndicator.labels[i.toString()] = {
          name:indicator.label,
          index:i
        }
      }
    });
    (["First NDC Submitted","No NDC Submitted"]).forEach(label => {
      let len = Object.keys(mergedIndicator.labels).length+1;
      mergedIndicator.labels[len.toString()] = {
        name:label,
        index:len
      }
    });

    
    const parseLocationValues = (locationValues => {
      if ((locationValues.ndce_2020_submitted && locationValues.ndce_2020_submitted != "No")
        || (locationValues.submission && locationValues.submission == "Second NDC Submitted")) {
        return indicatorRef.ndce_2020_submitted;
      } else if (locationValues.ndce_plan_2020 && locationValues.ndce_plan_2020 != "No") {
        return indicatorRef.ndce_plan_2020;
      } else if (locationValues.ndce_2015_revised && locationValues.ndce_2015_revised != "No") {
        return indicatorRef.ndce_2015_revised;
      } else if (locationValues.submission && locationValues.submission == "First NDC Submitted") {
        return locationValues.submission;
      } else {
        return "No NDC Submitted";
      }
    });    

    for (let l in locations) {
      const location = locations[l];
      const locationValues = {};
      indicators.forEach(indicator => {
        locationValues[indicator.value] = indicator.locations[l] ? indicator.locations[l].value : "No";
      })
      const val = parseLocationValues(locationValues);
      mergedIndicator.locations[l].value = val;
      mergedIndicator.locations[l].label_id = (val => {
        let id;
        for (let i in mergedIndicator.labels) {
          if (mergedIndicator.labels[i].name == val) {
            id = i;
            break;
          } 
        }
        return id;
      })(val);
    }
    mergedIndicator.legendBuckets = createLegendBuckets(
      mergedIndicator.locations,
      mergedIndicator.labels,
      isos
    );

    //Shift "Not Applicable" to bottom of legend items
    mergedIndicator.legendBuckets[Object.keys(mergedIndicator.legendBuckets).length] = mergedIndicator.legendBuckets["0"];
    delete mergedIndicator.legendBuckets["0"];

    return mergedIndicator;
  }
)

const countryStyles = {
  default: {
    fill: '#e9e9e9',
    fillOpacity: 1,
    stroke: '#f5f6f7',
    strokeWidth: 1,
    outline: 'none'
  },
  hover: {
    fill: '#e9e9e9',
    fillOpacity: 1,
    stroke: '#f5f6f7',
    strokeWidth: 1,
    outline: 'none'
  },
  pressed: {
    fill: '#e9e9e9',
    fillOpacity: 1,
    stroke: '#f5f6f7',
    strokeWidth: 1,
    outline: 'none'
  }
};

export const getPathsWithStyles = createSelector(
  mergeIndicators,
  indicator => {
    const paths = [];
    worldPaths.forEach(path => {
      if (path.properties.layer !== PATH_LAYERS.ISLANDS) {
        const { locations, legendBuckets } = indicator;

        if (!locations) {
          paths.push({
            ...path,
            countryStyles
          });
          return null;
        }

        const iso = path.properties && path.properties.id;
        const isEuropeanCountry = europeanCountries.includes(iso);
        const countryData = isEuropeanCountry
          ? locations[europeSlug]
          : locations[iso];

        let style = countryStyles;
        if (countryData && countryData.label_id) {
          const legendData = legendBuckets[countryData.label_id];
          const color = getColorByIndex(legendBuckets, legendData.index);
          style = {
            ...countryStyles,
            default: {
              ...countryStyles.default,
              fill: color,
              fillOpacity: 1
            },
            hover: {
              ...countryStyles.hover,
              fill: color,
              fillOpacity: 1
            }
          };
        }

        paths.push({
          ...path,
          style
        });
      }
      return null;
    });
    return paths;
  }
);

export const getLinkToDataExplorer = createSelector([getSearch], search => {
  const section = 'ndc-enhancements';
  return generateLinkToDataExplorer(search, section);
});

//Chart data methods

export const summarizeIndicators = createSelector(
  [mergeIndicators,getCategoryIndicators],
  (mergedIndicator,indicators) => {
    if (!mergedIndicator || !indicators) return null;
    console.log(mergedIndicator,indicators);
    let summaryData = {};
    (["planned","submitted"]).forEach(type => {
      summaryData[type] = {
        countries:{
          value:0,
          max:Object.keys(mergedIndicator.locations).length,
          opts: {
            color:getColorByIndex(mergedIndicator.legendBuckets, type == "submitted" ? "1" : "2"),
            label:"countries"
          }
        },
        emissions:{
          value:0,
          max:100,
          opts: {
            color:getColorByIndex(mergedIndicator.legendBuckets, type == "submitted" ? "1" : "2"),
            suffix:"%",
            label:"% of global emissions"
          }
        }
      }
    });
    const emissionsIndicator = indicators.find(indicator => indicator.value == "ndce_ghg");
    for (let l in mergedIndicator.locations) {
      const location = mergedIndicator.locations[l];
      var type = location.label_id == "1" ? "submitted" : location.label_id == "2" ? "planned" : null;
      if (type) {
        summaryData[type].countries.value++;
        if (emissionsIndicator.locations[l]) summaryData[type].emissions.value += parseFloat(emissionsIndicator.locations[l].value);
      }
    }
    return summaryData;
  }
)

//Table data methods 

export const tableGetCategory = createSelector(
  [getCategories],
  (categories = []) => {
    if (!categories || !categories.length) return null;
    return categories.find(cat => cat.value === 'ndc_enhancement') || categories[0];
  }
);

export const tableGetSelectedData = createSelector(
  [getCategoryIndicators, getCountries],
  (indicators, countries) => {
    if (!indicators || !indicators.length || !indicators[0].locations) return [];

    return Object.keys(indicators[0].locations).map(iso => {
      const countryData =
        countries.find(country => country.iso_code3 === iso) || {};
      let row = {
        country: countryData.wri_standard_name || iso,
        iso
      }
      indicators.forEach(ind => {
        row[ind.label] = ind.locations[iso].value;
      })
      return row;
    });
  }
);

export const tableGetFilteredData = createSelector(
  [tableGetSelectedData, getQuery],
  (data, query) => {
    if (!data || isEmpty(data)) return null;
    return data.filter(
      d => {
        let match = false;
        for (let col in d) {
          if (deburrUpper(d[col]).indexOf(query) > -1) {
            match = true;
            break;
          }
        }
        return match;
      }
    );
  }
);

export const tableRemoveIsoFromData = createSelector([tableGetFilteredData], data => {
  if (!data || isEmpty(data)) return null;
  return data.map(d => {
    const iso = d.iso;
    delete d.iso;
    return {
      ...d,
      urlNotShow: `/ndcs/country/${iso}`
    }
  });
});

export default {
  getCategories,
  getCategoryIndicators,
  getIndicators,
  tableGetCategory,
  tableRemoveIsoFromData,
  mergeIndicators,
  summarizeIndicators,
  getPathsWithStyles
};
