import { createElement, PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import Component from './api-documentation-component';

const { CW_API } = process.env;
const { ESP_API } = process.env;

const API_CALLS = {
  'historical-emissions': [
    {
      title: 'GET /api/v1/data/historical_emissions/meta',
      url: `${CW_API}/data/historical_emissions/meta`,
      description:
        'Returns a Link header with meta endpoint urls for discovery (can be used with a HEAD request)',
      extra: 'This response only has headers not body'
    },
    {
      title: 'GET /api/v1/data/historical_emissions',
      url: `${CW_API}/data/historical_emissions`,
      description: 'Retrieves time series data for historical emissions',
      queryParams: [
        {
          name: 'data_sources',
          parameter: 'source_ids[]',
          description: 'emission data source id (CAIT, PIK, UNFCCC)'
        },
        {
          name: 'gwps',
          parameter: 'gwp_ids[]',
          description: 'emission gwps id'
        },
        {
          name: 'gases',
          parameter: 'gas_ids[]',
          description: 'emission data source id (CAIT, PIK, UNFCCC)'
        },
        {
          name: 'sectors',
          parameter: 'sector_ids[]',
          description: 'sector id'
        },
        {
          name: 'regions',
          parameter: 'regions[]',
          description: 'region ISO code 3'
        },
        {
          name: 'start_year',
          parameter: 'start_year',
          description: 'Show results from this year onwards'
        },
        {
          name: 'end_year',
          parameter: 'end_year',
          description: 'Show results up to this year'
        }
      ],
      extra:
        'All this parameters accept multiple values, separated by commas. Response is paginated. Pagination headers are in place.'
    }
  ],
  'emission-pathways': [
    {
      title: 'GET /api/v1/data/emission_pathways/meta',
      url: `${ESP_API}/data/emission_pathways/meta`,
      description:
        'Returns a Link header with meta endpoint urls for discovery (can be used with a HEAD request)',
      extra: 'This response only has headers not body'
    },
    {
      title: 'GET /api/v1/data/emission_pathways',
      url: `${ESP_API}/data/emission_pathways`,
      description: 'Retrieves time series data for Emission Pathways',
      queryParams: [
        {
          name: 'models',
          parameter: 'model_ids[]',
          description: 'model id'
        },
        {
          name: 'scenarios',
          parameter: 'scenario_ids[]',
          description: 'scenario id'
        },
        {
          name: 'categories',
          parameter: 'category_ids[]',
          description: 'category id'
        },
        {
          name: 'indicators',
          parameter: 'indicator_ids[]',
          description: 'indicator id'
        },
        {
          name: 'locations',
          parameter: 'locations[]',
          description: 'locations ISO code 3'
        },
        {
          name: 'start_year',
          parameter: 'start_year',
          description: 'Show results from this year onwards'
        },
        {
          name: 'end_year',
          parameter: 'end_year',
          description: 'Show results up to this year'
        }
      ],
      extra:
        'All this parameters accept multiple values, separated by commas. Response is paginated. Pagination headers are in place.'
    }
  ],
  'ndc-sdg-linkages': [
    {
      title: 'GET /api/v1/data/ndc_sdg/meta',
      url: `${CW_API}/data/ndc_sdg/meta`,
      description:
        'Returns a Link header with meta endpoint urls for discovery (can be used with a HEAD request)',
      extra: 'This response only has headers not body'
    },
    {
      title: 'GET /api/v1/data/ndc_sdg',
      url: `${CW_API}/data/ndc_sdg`,
      description: 'Retrieves time series data for NDC SDG linkages',
      queryParams: [
        {
          name: 'goals',
          parameter: 'goal_ids[]',
          description: 'goal id'
        },
        {
          name: 'targets',
          parameter: 'target_ids[]',
          description: 'target id'
        },
        {
          name: 'sectors',
          parameter: 'sector_ids[]',
          description: 'sector id'
        },
        {
          name: 'countries',
          parameter: 'countries[]',
          description: 'country ISO code'
        }
      ],
      extra:
        'All this parameters accept multiple values, separated by commas. Response is paginated. Pagination headers are in place.'
    }
  ],
  'ndc-content': [
    {
      title: 'GET /api/v1/data/ndc_content/meta',
      url: `${CW_API}/data/ndc_content/meta`,
      description:
        'Returns a Link header with meta endpoint urls for discovery (can be used with a HEAD request)',
      extra: 'This response only has headers not body'
    },
    {
      title: 'GET /api/v1/data/ndc_content',
      url: `${CW_API}/data/ndc_content`,
      description: 'Retrieves time series data for NDC content',
      queryParams: [
        {
          name: 'countries',
          parameter: 'countries[]',
          description: 'country ISO code'
        },
        {
          name: 'sources',
          parameter: 'source_ids[]',
          description: 'source id'
        },
        {
          name: 'indicators',
          parameter: 'indicator_ids[]',
          description: 'indicator id'
        },
        {
          name: 'categories',
          parameter: 'category_ids[]',
          description: 'category id'
        },
        {
          name: 'labels',
          parameter: 'label_ids[]',
          description: 'label id'
        },
        {
          name: 'sectors',
          parameter: 'sector_ids[]',
          description: 'sector id'
        }
      ],
      extra:
        'All this parameters accept multiple values, separated by commas. Response is paginated. Pagination headers are in place.'
    }
  ]
};

class ApiDocumentationContainer extends PureComponent {
  render() {
    const { section } = this.props;
    return createElement(Component, {
      ...this.props,
      data: section && API_CALLS[section]
    });
  }
}

ApiDocumentationContainer.propTypes = {
  section: PropTypes.string
};

export default ApiDocumentationContainer;
