import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const setModalMetadataParams = createAction('setModalMetadataParams');
const setModalMetadata = createThunkAction(
  'setModalMetadata',
  payload => dispatch => {
    dispatch(setModalMetadataParams(payload));
    if (payload.slugs) dispatch(fetchModalMetaData(payload.slugs));
  }
);

const fetchModalMetaDataInit = createAction('fetchModalMetaDataInit');
const fetchModalMetaDataFail = createAction('fetchModalMetaDataFail');
const fetchModalMetaDataReady = createAction('fetchModalMetaDataReady');

const fetchModalMetaData = createThunkAction(
  'fetchModalMetaDataData',
  slugs => (dispatch, state) => {
    const { modalMetadata } = state();
    const someSlugDataIsMissing = slugs.some(slug => !modalMetadata.data[slug]);
    const someSlugDataHasError = slugs.some(
      slug => modalMetadata.data[slug] === 'error'
    );
    if (someSlugDataIsMissing || someSlugDataHasError) {
      dispatch(fetchModalMetaDataInit());
      const promises = slugs.map(slug =>
        fetch(`/api/v1/metadata/${slug.toLowerCase()}`).then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
      );

      Promise.all(promises)
        .then(data => {
          dispatch(fetchModalMetaDataReady({ slugs, data }));
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchModalMetaDataReady({ slugs, data: 'error' }));
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
