/* eslint-disable max-len */
import { createSelector } from 'reselect';
import {
  getColorByIndex,
  createLegendBuckets,
  shouldShowPath
} from 'utils/map';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import { generateLinkToDataExplorer } from 'utils/data-explorer';
import worldPaths from 'app/data/world-50m-paths';
import { europeSlug, europeanCountries } from 'app/data/european-countries';
import { COUNTRY_STYLES } from 'components/ndcs/shared/constants';
import { CHART_NAMED_COLORS } from 'styles/constants';

const ENHANCEMENT_CATEGORY = 'ndc_enhancement';
const INDICATOR_SLUGS = {
  EMISSIONS: 'ndce_ghg',
  MAP: 'ndce_status_2020'
};

export const LABEL_SLUGS = {
  INTENDS_TO_ENHANCE: 'enhance_2020',
  SUBMITTED_2020: 'submitted_2020',
  ENHANCED_MITIGATION: 'enhanced_migitation',
  NO_INFO: 'no_info_2020'
};

const LABEL_COLORS = {
  SUBMITTED_2020: CHART_NAMED_COLORS.color1,
  INTENDS_TO_ENHANCE: CHART_NAMED_COLORS.color2,
  ENHANCED_MITIGATION: CHART_NAMED_COLORS.color3
};

const getSearch = state => state.search || null;
const getCountries = state => state.countries || null;
const getCategories = state => state.categories || null;
const getIndicatorsData = state => state.indicators || null;

export const getIsEnhancedChecked = createSelector(
  getSearch,
  search => search.showEnhancedAmbition === 'true'
);

export const getISOCountries = createSelector([getCountries], countries =>
  countries.map(country => country.iso_code3)
);

export const getIndicatorsParsed = createSelector(
  [getCategories, getIndicatorsData, getISOCountries],
  (categories, indicators, isos) => {
    if (!categories || !indicators || !indicators.length) return null;
    const categoryId = Object.keys(categories).find(
      id => categories[id].slug === ENHANCEMENT_CATEGORY
    );
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
    ).filter(ind => ind.categoryIds.indexOf(parseInt(categoryId, 10)) > -1);
  }
);

export const getMapIndicator = createSelector(
  [getIndicatorsParsed, getISOCountries],
  (indicators, isos) => {
    if (!indicators || !indicators.length) return null;
    const mapIndicator = indicators.find(
      ind => ind.value === INDICATOR_SLUGS.MAP
    );
    if (!mapIndicator) return null;

    const updatedMapIndicator = { ...mapIndicator };
    const noInfoId = Object.keys(updatedMapIndicator.legendBuckets).find(
      id => updatedMapIndicator.legendBuckets[id].slug === LABEL_SLUGS.NO_INFO
    );

    // Set all countries without values to "No Information" by default
    if (noInfoId) {
      isos.forEach(iso => {
        if (!updatedMapIndicator.locations[iso]) {
          updatedMapIndicator.locations[iso] = {
            value: updatedMapIndicator.legendBuckets[noInfoId].name,
            label_id: noInfoId,
            label_slug: updatedMapIndicator.legendBuckets[noInfoId].slug
          };
        }
      });
    }
    return updatedMapIndicator;
  }
);

export const filterEnhancedValueOnIndicator = createSelector(
  [getMapIndicator, getIsEnhancedChecked],
  (indicator, isEnhancedChecked) => {
    if (!indicator) return null;
    if (isEnhancedChecked) return indicator;
    const { legendBuckets, locations } = indicator;
    const enhancedLabelId = Object.keys(legendBuckets).find(
      key => legendBuckets[key].slug === LABEL_SLUGS.ENHANCED_MITIGATION
    );
    const submittedLabelId = Object.keys(legendBuckets).find(
      key => legendBuckets[key].slug === LABEL_SLUGS.SUBMITTED_2020
    );

    const updatedLegendBuckets = { ...legendBuckets };
    delete updatedLegendBuckets[enhancedLabelId];

    const updatedLocations = { ...locations };
    Object.keys(updatedLocations).forEach(iso => {
      const countryData = updatedLocations[iso];
      if (countryData && countryData.label_id) {
        const shouldHideEnhancedLabel =
          !isEnhancedChecked &&
          String(countryData.label_id) === enhancedLabelId;
        const updatedLabelId = shouldHideEnhancedLabel
          ? submittedLabelId
          : countryData.label_id;
        updatedLocations[iso] = {
          ...updatedLocations[iso],
          label_id: +updatedLabelId
        };
      }
    });
    return {
      ...indicator,
      locations: updatedLocations,
      legendBuckets: updatedLegendBuckets
    };
  }
);

export const sortIndicatorLegend = createSelector(
  [filterEnhancedValueOnIndicator],
  indicator => {
    if (!indicator) return null;
    const updatedIndicator = { ...indicator };
    const slugsLegendOrder = [
      LABEL_SLUGS.ENHANCED_MITIGATION,
      LABEL_SLUGS.SUBMITTED_2020,
      LABEL_SLUGS.INTENDS_TO_ENHANCE,
      null,
      LABEL_SLUGS.NO_INFO
    ]; // null it's for 'Not Applicable'
    Object.entries(updatedIndicator.legendBuckets).forEach(([key, value]) => {
      updatedIndicator.legendBuckets[key] = {
        ...updatedIndicator.legendBuckets[key],
        order: value.slug ? slugsLegendOrder.indexOf(value.slug) : 3 // Not Applicable should have order number 3
      };
    });
    return updatedIndicator;
  }
);

const MAP_LABEL_COLORS = [...Object.values(LABEL_COLORS), 'rgb(204, 204, 204)'];
export const MAP_COLORS = [
  [...MAP_LABEL_COLORS],
  [...MAP_LABEL_COLORS],
  [...MAP_LABEL_COLORS],
  [...MAP_LABEL_COLORS]
];

export const getPathsWithStyles = createSelector(
  [filterEnhancedValueOnIndicator],
  indicator => {
    if (!indicator) return [];
    const paths = [];
    worldPaths.forEach(path => {
      if (shouldShowPath(path)) {
        const { locations, legendBuckets } = indicator;
        if (!locations) {
          paths.push({
            ...path,
            COUNTRY_STYLES
          });
          return null;
        }

        const iso = path.properties && path.properties.id;
        const isEuropeanCountry = europeanCountries.includes(iso);
        const countryData = isEuropeanCountry
          ? locations[europeSlug]
          : locations[iso];

        let style = COUNTRY_STYLES;
        if (countryData && countryData.label_id) {
          const legendIndex = legendBuckets[countryData.label_id].index;
          const color = getColorByIndex(legendBuckets, legendIndex, MAP_COLORS);
          style = {
            ...COUNTRY_STYLES,
            default: {
              ...COUNTRY_STYLES.default,
              fill: color,
              fillOpacity: 1
            },
            hover: {
              ...COUNTRY_STYLES.hover,
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
  const section = 'ndc-content';
  return generateLinkToDataExplorer(
    {
      category: ENHANCEMENT_CATEGORY,
      ...search
    },
    section
  );
});

export const summarizeIndicators = createSelector(
  [getIndicatorsParsed, getMapIndicator],
  (indicators, indicator) => {
    if (!indicator || !indicators) return null;
    const summaryData = {};

    const locations = Object.keys(indicator.locations);
    const summaryLabels = [
      'enhance_2020',
      'enhanced_migitation',
      'submitted_2020'
    ];
    const labels = Object.keys(indicator.legendBuckets)
      .filter(id => summaryLabels.includes(indicator.legendBuckets[id].slug))
      .map(id => ({
        ...indicator.legendBuckets[id],
        id
      }));

    labels.forEach(label => {
      const color = getColorByIndex(
        indicator.legendBuckets,
        label.index,
        MAP_COLORS
      );
      summaryData[label.slug] = {
        includesEU: false,
        countries: {
          value: 0,
          max: locations.length,
          opts: { color }
        },
        emissions: {
          value: 0,
          max: 100,
          opts: { color }
        }
      };
    });

    const emissionsIndicator = indicators.find(
      ind => ind.value === INDICATOR_SLUGS.EMISSIONS
    );

    // Calculate countries number and emissions
    locations.forEach(l => {
      const location = indicator.locations[l];
      const type = location.label_slug;
      const emissionPercentages = emissionsIndicator.locations;
      if (type && summaryData[type]) {
        if (l === europeSlug) {
          const EUTotal = parseFloat(emissionPercentages[europeSlug].value);
          const europeanLocationIsos = locations.filter(iso =>
            europeanCountries.includes(iso)
          );
          const europeanLocationsValue = europeanLocationIsos.reduce(
            (acc, iso) => acc + parseFloat(emissionPercentages[iso].value),
            0
          );
          summaryData[type].emissions.value += EUTotal - europeanLocationsValue; // To avoid double counting
          summaryData[type].countries.value +=
            europeanCountries.length - europeanLocationIsos.length; // To avoid double counting

          summaryData[type].includesEU = true;
        } else {
          summaryData[type].countries.value += 1;

          // Enhanced mitigation should be counted as submitted 2020
          if (type === LABEL_SLUGS.ENHANCED_MITIGATION) {
            summaryData[LABEL_SLUGS.SUBMITTED_2020].countries.value += 1;
          }

          if (emissionsIndicator.locations[l]) {
            summaryData[type].emissions.value += parseFloat(
              emissionsIndicator.locations[l].value
            );
          }
        }
      }
    });

    // Add emissions values
    Object.keys(summaryData).forEach(type => {
      // Enhanced mitigation should be counted as submitted 2020
      const emissionsParsedValue =
        type === LABEL_SLUGS.SUBMITTED_2020
          ? parseFloat(summaryData.submitted_2020.emissions.value) +
            parseFloat(
              summaryData[LABEL_SLUGS.ENHANCED_MITIGATION].emissions.value
            )
          : parseFloat(summaryData[type].emissions.value);

      summaryData[type].emissions.value = emissionsParsedValue.toFixed(1);
    });

    // Add text
    Object.keys(summaryData).forEach(type => {
      const emissionsString = `<span title="2018 emissions data">${summaryData[type].emissions.value}% of global emissions</span>`;
      summaryData[type].countries.opts.label = {
        [LABEL_SLUGS.INTENDS_TO_ENHANCE]: `<strong>countries</strong> (${emissionsString}) <strong>have stated their intention to <span title="Definition: Strengthening mitigation ambition and/or increasing adaptation action in a new or updated NDC.">enhance ambition or action</span> in new or updated NDCs</strong>`,
        [LABEL_SLUGS.ENHANCED_MITIGATION]: `of the <strong>countries</strong> (${emissionsString}) that have submitted a new or updated NDC <strong>enhanced mitigation ambition</strong> compared to their previous NDC`,
        [LABEL_SLUGS.SUBMITTED_2020]: `<strong>countries (${emissionsString}) <strong>have submitted a new or updated NDC</strong>`
      }[type];
    });
    return summaryData;
  }
);
