import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const setModalMetadataParams = createAction('setModalMetadataParams');
const setModalMetadata = createThunkAction(
  'setModalMetadata',
  payload => dispatch => {
    dispatch(setModalMetadataParams(payload));
    if (payload.slug) dispatch(fetchModalMetaData(payload.slug));
  }
);

const fetchModalMetaDataInit = createAction('fetchModalMetaDataInit');
const fetchModalMetaDataFail = createAction('fetchModalMetaDataFail');
const fetchModalMetaDataReady = createAction('fetchModalMetaDataReady');

const data = {
  slug: 'cait_historical_emissions',
  title: 'CAIT Historical Emissions',
  link: 'http://cait.wri.org/historical/',
  sourceOrganization: 'WRI',
  summary:
    'Historical Country-level and sectoral GHG emission data (1850-2014)',
  description:
    'As of Oct 2017, CAIT Historical Emission data contains sector-level greenhouse gas (GHG) emissions data for 185 countries and the European Union (EU) for the period 1990-2014, including emissions of the six major GHGs from most major sources and sinks. It also contains historical country-level carbon dioxide (CO2) emissions data going back to 1850, and energy sub-sector CO2 emissions data going back to 1971.  See http://cait.wri.org/docs/CAIT2.0_CountryGHG_Methods.pdf for details regarding data source and methodology.'
};

const fetchModalMetaData = createThunkAction(
  'fetchModalMetaDataData',
  slug => dispatch => {
    dispatch(fetchModalMetaDataInit());
    setTimeout(() => {
      if (slug) {
        dispatch(fetchModalMetaDataReady(data));
      }
    }, 800);
  }
);

export default {
  setModalMetadata,
  setModalMetadataParams,
  fetchModalMetaData,
  fetchModalMetaDataInit,
  fetchModalMetaDataFail,
  fetchModalMetaDataReady
};
