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
import getIPPaths from 'app/data/world-50m-paths';
import { europeSlug, europeanCountries } from 'app/data/european-countries';
import { COUNTRY_STYLES } from 'components/ndcs/shared/constants';

// TODO: Remove ndc_enhancement when new data on production
import {
  ENHANCEMENT_CATEGORIES,
  ENHANCEMENT_LABEL_SLUGS,
  NDC_2025_LABEL_COLORS,
  INDICATOR_SLUGS
} from 'data/constants';

const NDC_2025_SLUGS = {
  EMISSIONS: INDICATOR_SLUGS.emissions,
  MAP: INDICATOR_SLUGS.submitted2025
};

const getSearch = state => state.search || null;
const getCategories = state =>
  (state.ndcs && state.ndcs.data && state.ndcs.data.categories) || null;
const getIndicatorsData = state =>
  (state.ndcs && state.ndcs.data && state.ndcs.data.indicators) || null;
const getZoom = state => state.map.zoom || null;

const getPreviousComparisonIndicators = state =>
  state.ndcsPreviousComparison && state.ndcsPreviousComparison.data;
const getCountriesDocuments = state => state.countriesDocuments.data || null;

export const getCountries = state =>
  (state.countries && state.countries.data) || null;
export const getMetadata = state =>
  !state.metadata.loading ? state.metadata.data : null;

export const getIsEnhancedChecked = createSelector(
  getSearch,
  search => search.showEnhancedAmbition !== 'false'
);

export const getISOCountries = createSelector([getCountries], countries =>
  countries.map(country => country.iso_code3)
);

export const getIndicatorsParsed = createSelector(
  [getCategories, getIndicatorsData, getISOCountries],
  (categories, indicators, isos) => {
    if (!categories || !indicators || !indicators.length) return null;
    // const categoryId = Object.keys(categories).find(id =>
    //   ENHANCEMENT_CATEGORIES.includes(categories[id].slug)
    // );

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
    ); // .filter(ind => ind.categoryIds?.indexOf(parseInt(categoryId, 10)) > -1);
  }
);

export const getMapIndicator = createSelector(
  [getIndicatorsParsed, getISOCountries],
  (indicators, isos) => {
    if (!indicators || !indicators.length) return null;
    const mapIndicator = indicators.find(
      ind => ind.value === NDC_2025_SLUGS.MAP
    );

    if (!mapIndicator) return null;

    const updatedMapIndicator = { ...mapIndicator };

    // Missing slug in the legendBuckets data
    const noInfoId = Object.keys(updatedMapIndicator.legendBuckets).find(
      id => updatedMapIndicator.legendBuckets[id].name === 'No Information'
    );
    // .find(
    //   id =>
    //     updatedMapIndicator.legendBuckets[id].slug ===
    //     ENHANCEMENT_LABEL_SLUGS.NO_INFO
    // );

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

export const getCompareLinks = createSelector(
  [getCountriesDocuments],
  countriesDocuments => {
    if (!countriesDocuments) return null;
    const links = {};
    const baseURL =
      '/custom-compare/overview?section=overall_comparison_with_previous_ndc&targets=';
    // eslint-disable-next-line consistent-return
    Object.keys(countriesDocuments).forEach(iso => {
      // Only documents with submission date have been submitted
      const ndcDocuments = countriesDocuments[iso].filter(
        d => d.is_ndc && !!d.submission_date
      );
      if (!ndcDocuments.length) return null;

      const orderedDocuments = sortBy(uniqBy(ndcDocuments, 'id'), 'ordering')
        .reverse()
        .slice(0, 3);

      const link = `${baseURL}${orderedDocuments
        .map(d => `${iso}-${d.slug}`)
        .join(',')}`;

      links[iso] = {
        link,
        documents: orderedDocuments.map(d => d.description)
      };
    });

    return links;
  }
);

export const filterEnhancedValueOnIndicator = createSelector(
  [getMapIndicator, getIsEnhancedChecked],
  (indicator, isEnhancedChecked) => {
    if (!indicator) return null;
    if (isEnhancedChecked) return indicator;
    const { legendBuckets, locations } = indicator;
    const enhancedLabelId = Object.keys(legendBuckets).find(
      key =>
        legendBuckets[key].slug === ENHANCEMENT_LABEL_SLUGS.ENHANCED_MITIGATION
    );
    const submittedLabelId = Object.keys(legendBuckets).find(
      key => legendBuckets[key].slug === ENHANCEMENT_LABEL_SLUGS.SUBMITTED_2025
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
      ENHANCEMENT_LABEL_SLUGS.SUBMITTED_2025,
      null,
      ENHANCEMENT_LABEL_SLUGS.NO_INFO
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

const MAP_LABEL_COLORS = [
  ...Object.values(NDC_2025_LABEL_COLORS),
  'rgb(204, 204, 204)'
];
export const MAP_COLORS = [
  [...MAP_LABEL_COLORS],
  [...MAP_LABEL_COLORS],
  [...MAP_LABEL_COLORS],
  [...MAP_LABEL_COLORS]
];

export const getPathsWithStyles = createSelector(
  [filterEnhancedValueOnIndicator, getIPPaths, getZoom],
  (indicator, worldPaths, zoom) => {
    if (!indicator || !worldPaths) return [];
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
          const strokeWidth = zoom > 2 ? (1 / zoom) * 2 : 0.5;
          style = {
            ...COUNTRY_STYLES,
            default: {
              ...COUNTRY_STYLES.default,
              strokeWidth,
              fill: color,
              fillOpacity: 1
            },
            hover: {
              ...COUNTRY_STYLES.hover,
              cursor: 'pointer',
              strokeWidth,
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

export const getLinkToDataExplorer = createSelector(
  [getSearch, getCategories],
  (search, categories) => {
    if (!categories) return null;
    const category = Object.values(categories).find(c =>
      ENHANCEMENT_CATEGORIES.includes(c.slug)
    );
    if (!category) return null;

    const section = 'ndc-content';
    return generateLinkToDataExplorer(
      {
        category: category.slug,
        ...search
      },
      section
    );
  }
);

export const getPreviousComparisonCountryValues = createSelector(
  [getPreviousComparisonIndicators, getISOCountries],
  (previousComparisonIndicators, isos) => {
    if (!previousComparisonIndicators) return null;
    const previousComparisonCountryValues = {};
    isos.forEach(iso => {
      previousComparisonCountryValues[
        iso
      ] = previousComparisonIndicators.map(indicator => [
        indicator.name,
        indicator.locations[iso].value
      ]);
    });
    return previousComparisonCountryValues;
  }
);
