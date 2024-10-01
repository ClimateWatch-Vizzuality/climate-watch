import { europeGroupLabel } from 'app/data/european-countries';
import {
  CHART_NAMED_COLORS,
  CHART_NAMED_EXTENDED_COLORS,
  CHART_NAMED_GRAY_COLORS,
  CHART_NAMED_EXTRA_COLORS
} from 'app/styles/constants';

const { GFW_API } = process.env;
const { CW_API } = process.env;
const { ESP_API } = process.env;

export const LOGIN_URL = `${GFW_API}/auth/`;
export const LOGIN_PARAMS = `?applications=climate-watch&token=true&callbackUrl=${location.origin}${CW_API}/auth/login`;
export const LOGOUT_URL = '/auth/logout';
export const ESP_HOST = ESP_API && ESP_API.replace('/api/v1', '');

export const SOCIAL_APP_NAMES = ['twitter', 'facebook', 'google'];

export const GHG_CALCULATION_OPTIONS = {
  ABSOLUTE_VALUE: {
    label: 'Total',
    value: 'ABSOLUTE_VALUE'
  },
  PER_CAPITA: {
    label: 'per Capita',
    value: 'PER_CAPITA'
  },
  PER_GDP: {
    label: 'per GDP',
    value: 'PER_GDP'
  },
  CUMULATIVE: {
    label: 'Cumulative across available years',
    value: 'CUMULATIVE'
  },
  PERCENTAGE_CHANGE: {
    label: 'Percentage change from prior year',
    value: 'PERCENTAGE_CHANGE'
  }
};

export const CHART_TYPES = {
  line: 'line',
  area: 'area',
  percentage: 'percentage'
};

export const CHART_TYPE_OPTIONS = [
  { label: 'Line chart', value: CHART_TYPES.line },
  { label: 'Stacked area Chart', value: CHART_TYPES.area },
  { label: '100% stacked area chart', value: CHART_TYPES.percentage }
];

export const NOT_COVERED_LABEL = 'Not covered';

export const CALCULATION_OPTIONS = {
  ABSOLUTE_VALUE: {
    label: 'Total',
    value: 'ABSOLUTE_VALUE'
  },
  PER_CAPITA: {
    label: 'per Capita',
    value: 'PER_CAPITA'
  },
  PER_GDP: {
    label: 'per GDP',
    value: 'PER_GDP'
  }
};

export const QUANTIFICATION_COLORS = {
  BAU: '#113750',
  QUANTIFIED: '#ffc735',
  NOT_QUANTIFIABLE: '#868697',
  NET_ZERO: '#D3187C'
};

export const QUANTIFICATIONS_CONFIG = {
  bau: { label: 'Business as usual', color: QUANTIFICATION_COLORS.BAU },
  quantified: {
    label: 'Estimated quantified emissions targets',
    color: QUANTIFICATION_COLORS.QUANTIFIED
  },
  not_quantifiable: {
    label: 'Target not quantifiable',
    color: QUANTIFICATION_COLORS.NOT_QUANTIFIABLE
  },
  net_zero: {
    label: 'Net-Zero Target',
    color: QUANTIFICATION_COLORS.NET_ZERO
  }
};

export const DATA_SCALE = 1000000;

export const DEFAULT_EMISSIONS_SELECTIONS = {
  'Climate Watch': {
    gas: 'All GHG',
    sector: 'Total including LULUCF',
    location: 'WORLD'
  },
  PIK: {
    gas: 'KYOTOGHG',
    sector: 'Total excluding LULUCF',
    location: 'WORLD'
  },
  UNFCCC_AI: {
    gas: 'Aggregate GHGs',
    sector: 'Total GHG emissions with LULUCF',
    location: 'ANNEXI'
  },
  UNFCCC_NAI: {
    gas: 'Aggregate GHGs',
    sector: 'Total GHG emissions including LULUCF',
    location: 'TOP'
  },
  GCP: {
    gas: 'CO2',
    sector: 'Total fossil fuels and cement',
    location: 'WORLD'
  },
  US: {
    gas: 'All GHG',
    sector: 'Total including LULUCF',
    location: 'USA'
  }
};

export const TOP_EMITTERS_REGION_COUNTRIES = [
  { iso: 'CHN', label: 'China' },
  { iso: 'USA', label: 'United States' },
  { iso: 'EUU', label: europeGroupLabel },
  { iso: 'IND', label: 'India' },
  { iso: 'RUS', label: 'Russia' },
  { iso: 'JPN', label: 'Japan' },
  { iso: 'BRA', label: 'Brasil' },
  { iso: 'IDN', label: 'Indonesia' },
  { iso: 'IRN', label: 'Iran' },
  { iso: 'KOR', label: 'South Korea' }
];

export const OTHER_COLOR = CHART_NAMED_GRAY_COLORS.grayColor1;

export const CHART_COLORS = Object.values(CHART_NAMED_COLORS);
export const CHART_COLORS_EXTENDED = Object.values(CHART_NAMED_EXTENDED_COLORS);
export const CHART_COLORS_EXTRA = Object.values(CHART_NAMED_EXTRA_COLORS);

export const GREY_CHART_COLORS = [
  '#68696B',
  '#818285',
  '#999B9D',
  '#ACAEB8',
  '#C3C4CD',
  '#E2E4EA'
];

export const COUNTRY_COMPARE_COLORS = ['#113750', '#00B4D2', '#D2187C'];

export const UNITS = {
  CO2e: 'CO<sub>2</sub>e'
};

export const DEFAULT_AXES_CONFIG = {
  xBottom: {
    name: 'Year',
    unit: 'date',
    format: 'YYYY'
  },
  yLeft: {
    name: 'Emissions',
    unit: UNITS.CO2e,
    format: 'number'
  }
};

export const ESP_BLACKLIST = {
  models: [
    'id',
    'scenario_ids',
    'indicator_ids',
    'availability',
    'current_version',
    'development_year',
    'expertise',
    'license'
  ],
  scenarios: ['id', 'model_id', 'indicator_ids'],
  indicators: ['id', 'parent_id']
};

export const ESP_HIGH_ROWS = ['description', 'purpose', 'Statement'];
export const ESP_MEDIUM_ROWS = [
  'composite_name',
  'definition',
  'technology_coverage',
  'purpose_or_objective',
  'socieconomics',
  'policy_coverage',
  'geographic_coverage',
  'reference'
];

export const ESP_NARROW_COLUMNS = ['year', 'unit', 'first', 'last'];
export const ESP_WIDE_COLUMNS = ['description', 'acronym_definition'];

export const FILTERS_BY_CATEGORY = {
  models: ['country'],
  scenarios: ['model'],
  indicators: ['category', 'subcategory']
};

export const MIN_ZOOM_SHOW_ISLANDS = '8';
export const PATH_LAYERS = {
  COUNTRIES: 'COUNTRIES',
  ISLANDS: 'ISLANDS',
  POINTS: 'POINTS'
};

export const CLIMATE_VULNERABILITY_DEFINITIONS = {
  climateRisks: `A risk is often represented as probability of occurrence of hazardous events or trends multiplied by the impacts
    if these events or trends occur.In this case, the impacts are the effects on natural and human systems of extreme weather and climate
    events and of climate change.Impacts generally refer to effects on lives, livelihoods, health, ecosystems, economies, societies,
    cultures, services, and infrastructure due to the interaction of climate changes or hazardous climate events occurring
    within a speciﬁc time period and the vulnerability of an exposed society or system.
    Source: IPCC, " Annex II: Glossary," 2014.[Online].Available: http://www.ipcc.ch/pdf/assessment-report/ar5/wg3/ipcc_wg3_ar5_annex-ii.pdf.]`,
  exposed: `The presence of people, livelihoods, species or ecosystems, environmental functions, services, and resources,
     infrastructure, or economic, social, or cultural assets in places and settings that could be adversely affected.
      Source: IPCC, " Annex II: Glossary," 2014. [Online]. Available: http://www.ipcc.ch/pdf/assessment-report/ar5/wg3/ipcc_wg3_ar5_annex-ii.pdf.`,
  sensitive: `The proportion of the population particularly susceptible to a climate change hazard. The extent to which it is dependent
    upon sectors negatively affected by climate hazards.
    Source: University of Notre Dame Global Adaptation Index, "Country Index Technical Report," 2015. [Online].
    Available: http://index.nd-gain.org:8080/documents/nd-gain_technical_document_2015.pdf.`,
  vulnerable: `The propensity or predisposition to be adversely affected. Vulnerability encompasses a variety of concepts
    and elements including exposure, sensitivity or and ability to adapt to extreme weather events.
    Source: IPCC, " Annex II: Glossary," 2014. [Online]. Available: http://www.ipcc.ch/pdf/assessment-report/ar5/wg3/ipcc_wg3_ar5_annex-ii.pdf.`,
  resilient: `The capacity of social, economic and environmental systems to cope with a hazardous event or trend or disturbance,
    responding or reorganizing in ways that maintain their essential function, identity and structure, while also maintaining the capacity
    for adaptation, learning and transformation.
    Source: IPCC, “Working Group 2, Assessment Report 5, Summary for Policy Makers,” 2014. [Online.]
    Available: http://www.ipcc.ch/pdf/assessment-report/ar5/wg2/ar5_wgII_spm_en.pdf.`,
  ready: `Readiness measures a country's ability to leverage investments and convert them to adaptation actions.
    Source: University of Notre Dame Global Adaptation Index, "Country Index Technical Report," 2015.
    [Online]. Available: http://index.nd-gain.org:8080/documents/nd-gain_technical_document_2015.pdf`,
  adapt: `The process of adjustment to actual or expected climate and its effects. In human systems, adaptation seeks
    to moderate or avoid harm or exploit beneficial opportunities.
    Source: IPCC, " Annex II: Glossary," 2014. [Online]. Available: http://www.ipcc.ch/pdf/assessment-report/ar5/wg3/ipcc_wg3_ar5_annex-ii.pdf`
};

export const DISCLAIMER_SHOWN = 'disclaimerShown';
export const POP_UP_SHOWN = 'popUpShown';

export const CONTAINED_PATHNAME = 'contained';

export const LENSES_SELECTOR_INFO = {
  locations: `Every model has only a certain range of locations available. After one location is selected,
      all the locations which do not have a model in common with the selected location are filtered out.
      Hence, only the locations which have a model in common are displayed and are available for selection. `,
  models: `This drop-down menu shows only models which have information for all of the locations selected
      in the locations menu. You can select fewer locations to get a wider range of models.`
};

export const USERS_PROFESIONAL_SECTORS = [
  'Academic',
  'Commercial',
  'International Organization',
  'Media',
  'National Government',
  'NGO',
  'Other'
];

export const ALL_SELECTED = 'All Selected';
export const ALL_SELECTED_OPTION = { label: ALL_SELECTED, value: ALL_SELECTED };
export const NO_ALL_SELECTED_COLUMNS = [
  'breakBy',
  'chartType',
  'sources',
  'regions'
];

export const TOP_EMITTERS_OPTION = {
  iso: 'TOP',
  label: 'Top Emitters',
  value: 'TOP',
  expandsTo: TOP_EMITTERS_REGION_COUNTRIES.map(c => c.iso),
  regionCountries: TOP_EMITTERS_REGION_COUNTRIES,
  groupId: 'regions'
};

export const GAS_AGGREGATES = {
  'All GHG': ['CH4', 'CO2', 'F-Gas', 'N2O'],
  KYOTOGHG: ['CH4', 'CO2', 'HFCS', 'N2O', 'F-Gas'],
  'Aggregate GHGs': [
    'CH4',
    'CO2',
    'HFCs',
    'N2O',
    'PFCs',
    'SF6',
    'Aggregate F-gases'
  ],
  'Aggregate F-gases': ['HFCs', 'PFCs', 'SF6']
};

export const COMPARE_GHG_AGGREGATES = ['KYOTOGHG', 'All GHG', 'Aggregate GHGs'];

export const SUBNATIONAL_SOURCE_NAMES = ['US'];

export const GHG_TABLE_HEADER = {
  regions: 'Country/Region',
  gas: 'Gas',
  sector: 'Sector'
};

export const WRI_WEBSITE = 'https://www.wri.org/';
export const WRI_CLIMATE_BLOG =
  'https://www.wri.org/resources/tags/climatewatch-pinned-15461';
export const RW_WEBSITE = 'https://resourcewatch.org/';

export const AGRICULTURE_TOTAL_EMISSIONS = 'Agriculture Emissions: Total';

export const AGRICULTURE_INDICATORS_NAMES = {
  total_pesticides_use: 'Pesticides consumption',
  total_fertilizers: 'Fertilizers consumption',
  value_added_agr: 'Agriculture value added',
  water_withdrawal: 'Water withdrawal',
  employment_agri_female: 'Female employment',
  employment_agri_male: 'Male employment',
  employment_agri_total: 'Total employment'
};

export const AGRICULTURE_INDICATORS_MAP_BUCKETS = {
  total_pesticides_use: {
    1: { name: 'No data', index: 0 },
    2: { name: '0 - 10 tonnes', index: 1 },
    3: { name: '10 - 100 tonnes', index: 2 },
    4: { name: '100 - 1,000 tonnes', index: 3 },
    5: { name: '> 1,000 tonnes', index: 4 }
  },
  total_fertilizers: {
    1: { name: 'No data', index: 0 },
    2: { name: '0 - 10,000 tonnes', index: 1 },
    3: { name: '10,000 - 100,000 tonnes', index: 2 },
    4: { name: '100,000 - 1 million tonnes', index: 3 },
    5: { name: '> 1 million tonnes', index: 4 }
  },
  value_added_agr: {
    1: { name: 'No data', index: 0 },
    2: { name: '< 5%', index: 1 },
    3: { name: '5% - 20%', index: 2 },
    4: { name: '20% - 50%', index: 3 },
    5: { name: '> 50%', index: 4 }
  },
  water_withdrawal: {
    1: { name: 'No data', index: 0 },
    2: { name: '< 5%', index: 1 },
    3: { name: '5% - 20%', index: 2 },
    4: { name: '20% - 50%', index: 3 },
    5: { name: '> 50%', index: 4 }
  },
  employment_agri_female: {
    1: { name: 'No data', index: 0 },
    2: { name: '< 5%', index: 1 },
    3: { name: '5% - 20%', index: 2 },
    4: { name: '20% - 50%', index: 3 },
    5: { name: '> 50%', index: 4 }
  },
  employment_agri_male: {
    1: { name: 'No data', index: 0 },
    2: { name: '< 5%', index: 1 },
    3: { name: '5% - 20%', index: 2 },
    4: { name: '20% - 50%', index: 3 },
    5: { name: '> 50%', index: 4 }
  },
  employment_agri_total: {
    1: { name: 'No data', index: 0 },
    2: { name: '< 5%', index: 1 },
    3: { name: '5% - 20%', index: 2 },
    4: { name: '20% - 50%', index: 3 },
    5: { name: '> 50%', index: 4 }
  }
};

export const DEFAULT_NDC_EXPLORE_CATEGORY_SLUG = 'unfccc_process';

export const CATEGORY_SOURCES = {
  NDC_EXPLORE: ['Climate Watch', 'WB', 'NDC Explorer', 'UNICEF'],
  NDC_CONTENT: ['Climate Watch', 'WB', 'NDC Explorer', 'UNICEF']
};

export const ENHANCEMENT_CATEGORIES = [
  'ndc_enhancement',
  '2020_ndc_tracker',
  'ndc_enhancement_tracker'
];

export const ENHANCEMENT_LABEL_SLUGS = {
  INTENDS_TO_ENHANCE: 'enhance_2020',
  SUBMITTED_2020: 'submitted_2020',
  SUBMITTED_2025: '2025_status',
  ENHANCED_MITIGATION: 'enhanced_migitation',
  NO_INFO: 'no_info_2020'
};

export const NDC_2025_LABEL_SLUGS = {
  SUBMITTED_2025: 'Submitted 2025 NDC',
  NO_INFO: 'No Information'
};

export const NET_ZERO_POSITIVE_LABELS = [
  'Net-zero Target in Law',
  'Net-zero Target in Policy Document',
  'Net-zero Target in Political Pledge'
];

export const ENHANCEMENT_LABEL_COLORS = {
  SUBMITTED_2020: CHART_NAMED_COLORS.color1,
  ENHANCED_MITIGATION: CHART_NAMED_COLORS.color2
};

export const NDC_2025_LABEL_COLORS = {
  SUBMITTED_2025: CHART_NAMED_COLORS.color2
};

export const INDICATOR_SLUGS = {
  emissions: 'ndce_ghg',
  enhancements: 'ndce_status_2020',
  submitted2025: '2025_status'
};

export const CATEGORY_SLUGS = {
  commitmentSummary: 'summary_of_commitment'
};

export const ENHANCEMENT_VALUE_COLORS = {
  blue: '#62C0FF',
  red: '#FF6C2F',
  orange: '#FFB800',
  white: 'white'
};

export const ENHANCEMENT_VALUES_COLORS = {
  'Submitted New or Updated NDC': ENHANCEMENT_VALUE_COLORS.blue,
  'Submitted New or Updated NDC with Reduced Total Emissions':
    ENHANCEMENT_VALUE_COLORS.blue,
  'Revised NDC compared with previous version': ENHANCEMENT_VALUE_COLORS.blue,
  'Revised from the previous submission': ENHANCEMENT_VALUE_COLORS.blue,
  'Yes, enhancement in the revised submission': ENHANCEMENT_VALUE_COLORS.blue,
  'No, no enhancement in the revised submission': ENHANCEMENT_VALUE_COLORS.red,
  Unclear: ENHANCEMENT_VALUE_COLORS.orange,
  'No previous submission available': ENHANCEMENT_VALUE_COLORS.white,
  'No revision compared with previous version': ENHANCEMENT_VALUE_COLORS.white,
  'No Document Submitted': ENHANCEMENT_VALUE_COLORS.white
};

export const LEGEND_ENHANCEMENT_VALUES_COLORS = {
  'Revised NDC compared with previous version': ENHANCEMENT_VALUE_COLORS.blue,
  'Yes, enhancement in the revised submission': ENHANCEMENT_VALUE_COLORS.blue,
  'No, no enhancement in the revised submission': ENHANCEMENT_VALUE_COLORS.red,
  Unclear: ENHANCEMENT_VALUE_COLORS.orange
};

export const ALL_ENHANCEMENT_VALUES_COLORS = {
  'Revised NDC compared with previous version': ENHANCEMENT_VALUE_COLORS.blue,
  'Revised from the previous submission': ENHANCEMENT_VALUE_COLORS.blue,
  ...ENHANCEMENT_VALUES_COLORS
};

export const ENHANCEMENT_LABELS_WITH_LETTERS = [
  {
    value: 'ndce_revised',
    letter: 'R',
    label: 'Revised: Revised from the previous submission'
  },
  {
    value: 'ndce_rdcd_ghg',
    letter: 'M',
    label: 'Mitigation: Reduced total GHG emissions in 2030'
  },
  {
    value: 'ndce_ghgt',
    letter: 'G',
    label: 'GHG: Strengthened or added GHG target'
  },
  {
    value: 'ndce_sectoral',
    letter: 'S',
    label: 'Sectoral: Strengthened or added sectoral target'
  },
  {
    value: 'ndce_pa',
    letter: 'P',
    label: 'Policy: Strengthened or added policies and actions'
  },
  {
    value: 'ndce_adp',
    letter: 'A',
    label: 'Adaptation: Strengthened adaptation'
  },
  {
    value: 'ndce_ctu',
    letter: 'I',
    label:
      'Information: Provided additional Information for clarity, transparency, and understanding'
  }
];

export const EXTERNAL_COUNTRY_LINKS = {
  indonesia: 'https://indonesia.climatewatchdata.org',
  india: 'https://indiaclimateexplorer.org/'
};

export const NDC_2025_COLORS = {
  lightBlue: '#62C0FF',
  darkBlue: '#0845CB',
  darkGray: '#999C9F',
  lightGray: '#CCCDCF',
  orange: '#FF6C2F',
  yellow: '#FFB800'
};

export const LEGEND_STATUS_2025_VALUES_COLORS = {
  'Submitted 2025 NDC': NDC_2025_COLORS.darkBlue,
  'No information': NDC_2025_COLORS.darkGray,
  'Not Applicable: Countries that are not a Party to the UNFCCC':
    NDC_2025_COLORS.lightGray
};

export const LEGEND_COMPARISON_2025_VALUES_COLORS = {
  'Revised NDC compared with previous version': NDC_2025_COLORS.lightBlue,
  'Yes, enhancement in the revised submission': NDC_2025_COLORS.lightBlue,
  'No, no enhancement in the revised submission': NDC_2025_COLORS.orange,
  Unclear: NDC_2025_COLORS.yellow
};

export const LEGEND_COMPARISON_2025_LETTERS = [
  { value: 'ndce_revised', letter: 'R', label: '2025 Compare 1 indicator' },
  { value: 'ndce_revised', letter: 'M', label: '2025 Compare 2 indicator' },
  { value: 'ndce_revised', letter: 'G', label: '2025 Compare 3 indicator' }
];
