import { createSelector, createStructuredSelector } from 'reselect';
import { isEmpty, orderBy, some } from 'lodash';
import { format } from 'd3-format';
import { precentageTwoPlacesRound } from 'utils/utils';

const getCountriesContextsData = ({ agricultureCountriesContexts }) =>
  agricultureCountriesContexts && agricultureCountriesContexts.data;

const getCountriesContextsMetaData = ({ agricultureCountriesContexts }) =>
  agricultureCountriesContexts && agricultureCountriesContexts.meta;

const getWBCountriesData = ({ wbCountryData }) =>
  wbCountryData && wbCountryData.data;
const getLocationsData = ({ countries }) => countries && countries.data;
const getSearch = ({ search }) => search || null;

const getIndicatorsLabels = createSelector(
  [getCountriesContextsMetaData],
  contextsMetaData => {
    if (!contextsMetaData) return null;
    const myLabels = contextsMetaData.reduce((obj, item) => {
      obj[item.short_name] = item.indicator;
      return obj;
    }, {});
    return { ...myLabels };
  }
);

const legendHtmlDot = (text, color, value, unit) =>
  `<p><span style="background-color: ${color}; width: 10px; height: 10px;
  display: inline-block; border-radius: 10px; margin-right: 10px;" >
  </span>${text}</p><p style="color: ${color};">${value || '---'} ${unit}<p/>`;

const getChartConfig = (labels, year, unit, colors, suffix) => ({
  outerRadius: 55,
  innerRadius: 25,
  hideLegend: true,
  hideLabel: true,
  tooltip: {
    [labels[0].slug]: { label: `${labels[0].label}` },
    [labels[1].slug]: { label: `${labels[1].label}` }
  },
  animation: true,
  axes: {
    yLeft: {
      unit,
      label: year,
      suffix
    }
  },
  theme: {
    [labels[0].slug]: { label: labels[0].label, stroke: `${colors[0]}` },
    [labels[1].slug]: { label: labels[1].label, stroke: `${colors[1]}` }
  }
});

const getCountries = createSelector(getLocationsData, locations => {
  if (!locations) return [];
  return locations.map(l => ({
    label: l.wri_standard_name,
    value: l.iso_code3
  }));
});

export const getSelectedCountry = createSelector(
  [getSearch, getCountries],
  (search, countries) => {
    if (!search && !search.country && isEmpty(countries)) return null;
    if (search && !search.country && !isEmpty(countries)) return countries[0];
    const selectedCountry = countries.find(c => c.value === search.country);
    return selectedCountry;
  }
);

const getYears = createSelector(
  [getCountriesContextsData, getSelectedCountry],
  (data, selectedCountry) => {
    if (isEmpty(data) || !selectedCountry) return null;
    const selectedCountryData = data.filter(
      d => d.iso_code3 === selectedCountry.value
    );
    return orderBy(selectedCountryData, 'year', 'desc').map(r => ({
      label: r.year.toString(),
      value: r.year.toString()
    }));
  }
);

export const getSelectedYear = createSelector(
  [getSearch, getYears],
  (search, years) => {
    if (!search && !search.countryYear && !years) return null;
    if (
      (!search ||
        !search.countryYear ||
        !some(years, ['value', search.countryYear])) &&
      years
    ) {
      return years[0];
    }
    return { label: search.countryYear, value: search.countryYear };
  }
);

const getCardsData = createSelector(
  [
    getCountriesContextsData,
    getWBCountriesData,
    getSelectedCountry,
    getSelectedYear,
    getCountries,
    getYears,
    getIndicatorsLabels
  ],
  (contextsData, wbData, country, year, countries, years, indicatorsLabels) => {
    if (isEmpty(contextsData) || isEmpty(indicatorsLabels) || isEmpty(wbData)) {
      return null;
    }
    const c = country || countries[0];
    const y = year || years[0];
    if (!y) return null;
    const countryCode = c.value;
    const yearData = contextsData
      .filter(d => d.year === parseInt(y.value, 10))
      .find(d => d.iso_code3 === countryCode);
    const wbCountryData =
      wbData[countryCode] &&
      (wbData[countryCode].find(d => d.year === parseInt(y.value, 10)) || {});
    const socioeconomic = {
      population: [
        {
          value: yearData.employment_agri_female,
          label: indicatorsLabels.employment_agri_female,
          valueLabel: `${precentageTwoPlacesRound(
            yearData.employment_agri_female
          )}%`,
          color: '#0677B3'
        },
        {
          value: yearData.employment_agri_male,
          label: indicatorsLabels.employment_agri_male,
          valueLabel: `${precentageTwoPlacesRound(
            yearData.employment_agri_male
          )}%`,
          color: '#1ECDB0'
        }
      ],
      countryName: c.label,
      title: 'Socio-economic indicators',
      text: `<p> Agriculture is a source of livelihood for more than 2 billion
        people around the world. In <span>${y.value}</span>,
        <span>${precentageTwoPlacesRound(yearData.employment_agri_total) ||
          '---'}%</span> of <span>${c.label}'s</span> population was employed in
      the agriculture sector.`,
      noDataMessage: `No population data for ${c.label} on ${y.value}`
    };

    const GDP = {
      chartConfig: getChartConfig(
        [
          { label: 'Agriculture production', slug: 'agricultureProduction' },
          { label: 'Total GDP', slug: 'totalGDP' }
        ],
        y.label,
        '$',
        ['#0677B3', '#CACCD0']
      ),
      chartData: [
        {
          name: 'agricultureProduction',
          value:
            wbCountryData && wbCountryData.gdp * yearData.value_added_agr / 100,
          fill: '#0677B3'
        },
        {
          name: 'totalGDP',
          value: yearData.value_added_agr && wbCountryData && wbCountryData.gdp,
          fill: '#CACCD0'
        }
      ],
      title: 'GDP indicators',
      countryName: c.label,
      legend: [
        {
          text:
            wbCountryData &&
            legendHtmlDot(
              'Agriculture production',
              '#0677B3',
              format('.2s')(
                wbCountryData.gdp
                  ? wbCountryData.gdp * yearData.value_added_agr / 100
                  : yearData.value_added_agr
              ),
              '$USD'
            )
        },
        {
          text: legendHtmlDot(
            'Total GDP',
            '#CACCD0',
            format('.2s')(wbCountryData ? wbCountryData.gdp : 0),
            '$USD'
          )
        }
      ],
      text:
        '<p><span>Agriculture</span> makes up a significant portion of the economic output of many developing countries and economic growth in the sector can often reduce poverty and increase food security. </p>',
      noDataMessage: `No GDP data for ${c.label} in ${y.value}`
    };

    const water = {
      title: 'Water withdrawal and water stress',
      chartConfig: getChartConfig(
        [
          {
            label: 'Agricultural activities',
            slug: 'agricultureActivities'
          },
          {
            label: 'Non-agricultural activities',
            slug: 'nonAgricultureActivities'
          }
        ],
        y.label,
        'percentage',
        ['#0677B3', '#CACCD0'],
        '%'
      ),
      chartData: [
        {
          name: 'nonAgricultureActivities',
          value: yearData.water_withdrawal && 100 - yearData.water_withdrawal
        },
        { name: 'agricultureActivities', value: yearData.water_withdrawal }
      ],
      legend: [
        {
          text: legendHtmlDot(
            'Agricultural activities',
            '#0677B3',
            format('.2')(yearData.water_withdrawal),
            '%'
          )
        }
      ],
      countryName: c.label,
      rank: yearData.water_withdrawal_rank
        ? `<p>Water stress country ranking <span>${yearData.water_withdrawal_rank}</span> of 156</p>`
        : '',
      text:
        '<p>Globally, 70 percent of all freshwater withdrawn from rivers, lakes and aquifers was used for agriculture. In many regions, baseline water stress coincides with regions  of key crop production, increasing water stress and future risks.</p>',
      noDataMessage: `No water withdrawal data for ${c.label} in ${y.value}`
    };

    const fertilizer = {
      chartConfig: getChartConfig(
        [
          { label: indicatorsLabels.total_fertilizers, slug: 'fertilizerUse' },
          {
            label: indicatorsLabels.total_pesticides_use,
            slug: 'pesticidesUse'
          }
        ],
        y.label,
        'tonnes',
        ['#0677B3', '#1ECDB0']
      ),
      chartData: [
        { name: 'fertilizerUse', value: yearData.total_fertilizers },
        { name: 'pesticidesUse', value: yearData.total_pesticides_use }
      ],
      legend: [
        {
          text: legendHtmlDot(
            'Fertilizer use',
            '#0677B3',
            format('.2s')(yearData.total_fertilizers),
            'tonnes'
          )
        },
        {
          text: legendHtmlDot(
            'Pesticides use',
            '#1ECDB0',
            format('.2s')(yearData.total_pesticides_use),
            'tonnes of active ingredients'
          )
        }
      ],
      title: 'Fertilizer and pesticide use',
      text:
        '<p>The use of synthetic nitrogen fertilizer is a large contributor to emissions in agriculture, owing to the potent greenhouse gas N2O. Heavy pesticide use can lead to harmful impacts on the environment.</p>',
      noDataMessage: `No fertilizer and pesticide use data for ${c.label} in ${y.value}`
    };

    return [GDP, socioeconomic, water, fertilizer];
  }
);

export const countriesContexts = createStructuredSelector({
  query: getSearch,
  years: getYears,
  selectedYear: getSelectedYear,
  countries: getCountries,
  selectedCountry: getSelectedCountry,
  cards: getCardsData
});
