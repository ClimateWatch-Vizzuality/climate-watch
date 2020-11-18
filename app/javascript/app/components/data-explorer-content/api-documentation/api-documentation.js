import { createElement, PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { handleAnalytics } from 'utils/analytics';
import Component from './api-documentation-component';

const { CW_API } = process.env;
const { ESP_API } = process.env;

const startYearParam = {
  name: 'start_year',
  parameter: 'start_year',
  description: 'Show results from this year onwards'
};
const endYearParam = {
  name: 'end_year',
  parameter: 'end_year',
  description: 'Show results up to this year'
};
const countriesParam = {
  name: 'countries',
  parameter: 'countries[]',
  description: 'country ISO code (ISO Code for European Union (27) is EUU)'
};
const sortColumnParam = {
  name: 'sort_col',
  parameter: 'sort_col',
  description: 'column to sort the table by'
};
const sortDirectionParam = {
  name: 'sort_dir',
  parameter: 'sort_dir',
  description: 'sort direction (ASC or DESC)'
};
const linkHeaderDescription =
  'Returns a Link header with meta endpoint urls for discovery (can be used with a HEAD request)';
const linkHeaderExtra = 'This response only has headers not body';
const multipleValuesExtra =
  'All these parameters accept multiple values, separated by commas. Response is paginated. Pagination headers are in place.';

const API_CALLS = {
  'historical-emissions': [
    {
      title: 'GET /api/v1/data/historical_emissions/meta',
      url: `${CW_API}/data/historical_emissions/meta`,
      description: linkHeaderDescription,
      extra: linkHeaderExtra
    },
    {
      title: 'GET /api/v1/data/historical_emissions',
      url: `${CW_API}/data/historical_emissions`,
      description: 'Retrieves time series data for historical emissions',
      queryParams: [
        {
          name: 'data_sources',
          parameter: 'source_ids[]',
          description:
            'view data source id at https://www.climatewatchdata.org/api/v1/data/historical_emissions/data_sources'
        },
        {
          name: 'gases',
          parameter: 'gas_ids[]',
          description:
            'view gas id at https://www.climatewatchdata.org/api/v1/data/historical_emissions/gases'
        },
        {
          name: 'sectors',
          parameter: 'sector_ids[]',
          description:
            'view sector id at https://www.climatewatchdata.org/api/v1/data/historical_emissions/sectors'
        },
        {
          name: 'regions',
          parameter: 'regions[]',
          description:
            'region ISO code 3 (ISO Codes for World and European Union (27) are WORLD and EUU, respectively)'
        },
        startYearParam,
        endYearParam,
        sortColumnParam,
        sortDirectionParam
      ],
      extra: multipleValuesExtra
    }
  ],
  'emission-pathways': [
    {
      title: `GET ${ESP_API}/data/emission_pathways/meta`,
      url: `${ESP_API}/data/emission_pathways/meta.json`,
      description: linkHeaderDescription,
      extra: linkHeaderExtra
    },
    {
      title: `GET ${ESP_API}/data/emission_pathways`,
      url: `${ESP_API}/data/emission_pathways`,
      description: 'Retrieves time series data for Emission Pathways',
      queryParams: [
        {
          name: 'models',
          parameter: 'model_ids[]',
          description:
            'view model id at https://data.emissionspathways.org/api/v1/data/emission_pathways/models'
        },
        {
          name: 'scenarios',
          parameter: 'scenario_ids[]',
          description:
            'view scenario id at https://data.emissionspathways.org/api/v1/data/emission_pathways/scenarios'
        },
        {
          name: 'categories',
          parameter: 'category_ids[]',
          description:
            'view category id at https://data.emissionspathways.org/api/v1/data/emission_pathways/categories'
        },
        {
          name: 'indicators',
          parameter: 'indicator_ids[]',
          description:
            'view indicator id at https://data.emissionspathways.org/api/v1/data/emission_pathways/indicators'
        },
        {
          name: 'locations',
          parameter: 'location_ids[]',
          description:
            'view location id at https://data.emissionspathways.org/api/v1/data/emission_pathways/locations'
        },
        startYearParam,
        endYearParam,
        sortColumnParam,
        {
          ...sortDirectionParam,
          description: `${sortDirectionParam.description}. Years are not sortable`
        }
      ],
      extra: multipleValuesExtra
    }
  ],
  'ndc-sdg-linkages': [
    {
      title: 'GET /api/v1/data/ndc_sdg/meta',
      url: `${CW_API}/data/ndc_sdg/meta`,
      description: linkHeaderDescription,
      extra: linkHeaderExtra
    },
    {
      title: 'GET /api/v1/data/ndc_sdg',
      url: `${CW_API}/data/ndc_sdg`,
      description: 'Retrieves time series data for NDC SDG linkages',
      queryParams: [
        {
          name: 'goals',
          parameter: 'goal_ids[]',
          description:
            'view goal id at https://www.climatewatchdata.org/api/v1/data/ndc_sdg/goals'
        },
        {
          name: 'targets',
          parameter: 'target_ids[]',
          description:
            'view target id at https://www.climatewatchdata.org/api/v1/data/ndc_sdg/targets'
        },
        {
          name: 'sectors',
          parameter: 'sector_ids[]',
          description:
            'view sector id at https://www.climatewatchdata.org/api/v1/data/ndc_sdg/sectors'
        },
        countriesParam,
        sortColumnParam,
        sortDirectionParam
      ],
      extra: multipleValuesExtra
    }
  ],
  'ndc-content': [
    {
      title: 'GET /api/v1/data/ndc_content/meta',
      url: `${CW_API}/data/ndc_content/meta`,
      description: linkHeaderDescription,
      extra: linkHeaderExtra
    },
    {
      title: 'GET /api/v1/data/ndc_content',
      url: `${CW_API}/data/ndc_content`,
      description: 'Retrieves time series data for NDC content',
      queryParams: [
        countriesParam,
        {
          name: 'data_sources',
          parameter: 'source_ids[]',
          description:
            'view source id at https://www.climatewatchdata.org/api/v1/data/ndc_content/data_sources'
        },
        {
          name: 'indicators',
          parameter: 'indicator_ids[]',
          description:
            'view indicator id at https://www.climatewatchdata.org/api/v1/data/ndc_content/indicators'
        },
        {
          name: 'categories',
          parameter: 'category_ids[]',
          description:
            'view category id at https://www.climatewatchdata.org/api/v1/data/ndc_content/categories'
        },
        {
          name: 'sectors',
          parameter: 'sector_ids[]',
          description:
            'view sector id at https://www.climatewatchdata.org/api/v1/data/ndc_content/sectors'
        },
        sortColumnParam,
        sortDirectionParam
      ],
      extra: multipleValuesExtra
    }
  ],
  'lts-content': [
    {
      title: 'GET /api/v1/data/lts_content/meta',
      url: `${CW_API}/data/lts_content/meta`,
      description: linkHeaderDescription,
      extra: linkHeaderExtra
    },
    {
      title: 'GET /api/v1/data/lts_content',
      url: `${CW_API}/data/lts_content`,
      description: 'Retrieves time series data for LTS content',
      queryParams: [
        countriesParam,
        {
          name: 'data_sources',
          parameter: 'source_ids[]',
          description:
            'view source id at https://www.climatewatchdata.org/api/v1/data/lts_content/data_sources'
        },
        {
          name: 'indicators',
          parameter: 'indicator_ids[]',
          description:
            'view indicator id at https://www.climatewatchdata.org/api/v1/data/lts_content/indicators'
        },
        {
          name: 'category',
          parameter: 'category_ids[]',
          description:
            'view category id at https://www.climatewatchdata.org/api/v1/data/lts_content/categories'
        },
        {
          name: 'sectors',
          parameter: 'sector_ids[]',
          description:
            'view sector id at https://www.climatewatchdata.org/api/v1/data/lts_content/sectors'
        },
        sortColumnParam,
        sortDirectionParam
      ],
      extra: multipleValuesExtra
    }
  ],
  'net-zero-content': [
    {
      title: 'GET /api/v1/data/lts_content/meta',
      url: `${CW_API}/data/lts_content/meta`,
      description: linkHeaderDescription,
      extra: linkHeaderExtra
    },
    {
      title: 'GET /api/v1/data/lts_content',
      url: `${CW_API}/data/lts_content`,
      description: 'Retrieves time series data for LTS content',
      queryParams: [
        countriesParam,
        {
          name: 'sources',
          parameter: 'source_ids[]',
          description: 'source id'
        },
        indicatorsParam,
        categoriesParam,
        {
          name: 'labels',
          parameter: 'label_ids[]',
          description: 'label id'
        },
        sectorsParam,
        sortColumnParam,
        sortDirectionParam
      ],
      extra: multipleValuesExtra
    }
  ]
};

const handleAnalyticsTryLink = () =>
  handleAnalytics('Data Explorer', 'User tries the API', 'Click');
class ApiDocumentationContainer extends PureComponent {
  render() {
    const { section } = this.props;
    return createElement(Component, {
      ...this.props,
      handleAnalyticsTryLink,
      data: section && API_CALLS[section]
    });
  }
}

ApiDocumentationContainer.propTypes = {
  section: PropTypes.string
};

export default ApiDocumentationContainer;
