import { createSelector, createStructuredSelector } from 'reselect';
import { isEmpty, sortBy, some } from 'lodash';
import { format } from 'd3-format';

const getCountriesContextsData = ({ agricultureCountriesContexts }) =>
  agricultureCountriesContexts && agricultureCountriesContexts.data;
const getWBCountriesData = ({ wbCountryData }) =>
  wbCountryData && wbCountryData.data;
const getLocationsData = ({ countries }) => countries && countries.data;
const getSearch = ({ search }) => search || null;

const legendHtmlDot = (text, color, value, unit) =>
  `<p><span style="background-color: ${color}; width: 10px; height: 10px; display: inline-block; border-radius: 10px; margin-right: 10px;" ></span>${text}</p><p style="color: ${color};">${value ||
    '---'} ${unit}<p/>`;

const getChartConfig = (labels, year, unit, colors) => ({
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
      label: year
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
    return sortBy(selectedCountryData, 'year').map(r => ({
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
    getYears
  ],
  (contextsData, wbData, country, year, countries, years) => {
    if (isEmpty(contextsData) || isEmpty(wbData)) return null;
    const c = country || countries[0];
    const y = year || years[0];
    const countryCode = c.value;
    const yearData = contextsData
      .filter(d => d.year === parseInt(y.value, 10))
      .find(d => d.iso_code3 === countryCode);
    const wbCountryData =
      wbData[countryCode].find(d => d.year === parseInt(y.value, 10)) || {};

    // TODO: Replace the hardcoded values with data!!!
    const socioeconomic = {
      title: 'Socio-economic indicators',
      text: `<p>There were <span style="color: red;">21 million</span> people (<span style="color: red;">10.5%</span> of the population) employed in <span>${c.label}'s</span> Agriculture sector in <span>${y.value}</span>, of which <span>${Math.round(
        yearData.employment_agri_female * 100
      ) / 100}%</span> were female.</p>`
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
          value: wbCountryData.gdp * yearData.value_added_agr / 100,
          fill: '#0677B3'
        },
        {
          name: 'totalGDP',
          value: wbCountryData.gdp,
          fill: '#CACCD0'
        }
      ],
      title: 'GDP indicators',
      legend: [
        {
          text: legendHtmlDot(
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
        '<p><span>Agriculture</span> makes up a significant proportion of the total economic output of many countries, especially developing ones. </p>'
    };
    const water = {
      title: 'Water withdrawal and water stress',
      legend: [
        {
          text: legendHtmlDot(
            'Agricultural activities',
            '#0677B3',
            yearData.water_withdrawal,
            '%'
          )
        }
      ],
      rank: `<p>Water stress country ranking <span>${yearData.water_withdrawal_rank ||
        '---'}</span> of 156</p>`,
      text: `<p>In <span>${c.label}</span> in <span>${y.label}</span>, <span>${contextsData.water_withdrawal ||
        '---'} %</span> of total water withdrawn was employed in agricultural activities.</p>`
    };
    const fertilizer = {
      chartConfig: getChartConfig(
        [
          { label: 'Fertilizer use', slug: 'fertilizerUse' },
          { label: 'Pesticides use', slug: 'pesticidesUse' }
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
        '<p>The use of synthetic nitrogen fertilizer is a large contributor to emissions in agriculture, owing to the potent greenhouse gas N2O. Heavy pesticide use can lead to harmful impacts on the environment.</p>'
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
