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

const fetchModalMetaData = createThunkAction(
  'fetchModalMetaDataData',
  slug => (dispatch, state) => {
    const { modalMetadata } = state();
    if (!modalMetadata.data[slug] || modalMetadata.data[slug] === 'error') {
      dispatch(fetchModalMetaDataInit());
      fetch(`/api/v1/metadata/${slug}`)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          dispatch(fetchModalMetaDataReady({ slug, data }));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchModalMetaDataReady({ slug, data: 'error' }));
        });
    }
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
