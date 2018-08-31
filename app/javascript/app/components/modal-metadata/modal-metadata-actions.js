import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import { handleAnalytics } from 'utils/analytics';

const setModalMetadataParams = createAction('setModalMetadataParams');

// Requires payload params:
// slugs: array of slugs to fetch
// customTitle: custom title if there is more than one slug
const setModalMetadata = createThunkAction(
  'setModalMetadata',
  payload => dispatch => {
    dispatch(setModalMetadataParams(payload));
    let slugs = payload.slugs;
    if (slugs) {
      if (typeof slugs === 'string') slugs = [slugs];
      dispatch(fetchModalMetaData(slugs));
      handleAnalytics(
        payload.category,
        'User opens an Info window',
        payload.customTitle || slugs[0]
      );
    }
  }
);

const fetchModalMetaDataInit = createAction('fetchModalMetaDataInit');
const fetchModalMetaDataFail = createAction('fetchModalMetaDataFail');
const fetchModalMetaDataReady = createAction('fetchModalMetaDataReady');

const fetchModalMetaData = createThunkAction(
  'fetchModalMetaDataData',
  slugs => (dispatch, state) => {
    const { modalMetadata } = state();
    const slugsDataMissing = slugs.filter(slug => !modalMetadata.data[slug]);
    const slugsDataHasError = slugs.filter(
      slug => modalMetadata.data[slug] === 'error'
    );
    const slugsToFetch = slugsDataMissing.concat(slugsDataHasError);
    if (slugsToFetch.length > 0) {
      dispatch(fetchModalMetaDataInit());
      const promises = slugsToFetch.map(slug =>
        fetch(`/api/v1/metadata/${slug.toLowerCase()}`).then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
      );

      Promise.all(promises)
        .then(data => {
          dispatch(fetchModalMetaDataReady({ slugs: slugsToFetch, data }));
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
