import { initialState as map } from 'components/map';
import { initialState as countrySDGLinkages } from 'components/country-ndc-sdg-linkages';
import { initialState as countrySelect } from 'components/countries-select';
import { initialState as autocompleteSearch } from 'components/autocomplete-search';
import { initialState as ndcsAutocompleteSearch } from 'components/ndcs-autocomplete-search';
import { initialState as stories } from 'components/stories';
import { initialState as modalMetadata } from 'components/modal-metadata';
import { initialState as ghgEmissions } from 'components/ghg-emissions';
import { initialState as countryGhgEmissionsMap } from 'components/country-ghg-map';
import { initialState as countryGhgEmissions } from 'components/country-ghg-emissions';
import { initialState as countryNDCOverview } from 'components/country-ndc-overview';
import { initialState as ndcs } from 'pages/ndcs';
import { initialState as countryNDC } from 'pages/ndc-country';
import { initialState as countryNDCFull } from 'pages/ndc-country-full';
import { initialState as NDCCompare } from 'pages/ndc-compare';
import { initialState as ndcSearch } from 'pages/ndc-search';
import { initialState as ndcSdg } from 'pages/ndc-sdg';
import { initialState as countries } from 'providers/countries-provider';
import { initialState as regions } from 'providers/regions-provider';
import { initialState as ndcsSdgsMeta } from 'providers/ndcs-sdgs-meta-provider';
import { initialState as geoLocation } from 'providers/geolocation-provider';
import { initialState as ghgEmissionsMeta } from 'providers/ghg-emissions-meta-provider';
import { initialState as wbCountryData } from 'providers/wb-country-data-provider';

export default {
  countries,
  regions,
  ndcsSdgsMeta,
  stories,
  geoLocation,
  map,
  modalMetadata,
  ndcs,
  countryGhgEmissions,
  countrySDGLinkages,
  countryNDC,
  countryNDCFull,
  countryNDCOverview,
  NDCCompare,
  countrySelect,
  autocompleteSearch,
  ndcsAutocompleteSearch,
  ndcSearch,
  ghgEmissions,
  countryGhgEmissionsMap,
  ghgEmissionsMeta,
  wbCountryData,
  ndcSdg
};
