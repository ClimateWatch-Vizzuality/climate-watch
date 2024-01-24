import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

import { apiWithCache } from 'services/api';

const getMetadataInit = createAction('getMetadataInit');
const getMetadataReady = createAction('getMetadataReady');
const getMetadataFail = createAction('getMetadataFail');

const getMetadata = createThunkAction('getMetadata', props => dispatch => {
  const { source } = props;

  dispatch(getMetadataInit());

  apiWithCache
    .get(`/api/v1/metadata${source ? `/${source}` : ''}`)
    .then(response => {
      dispatch(getMetadataReady(response.data));
    })
    .catch(error => {
      console.warn(error);
      dispatch(getMetadataFail());
    });
});

export default {
  getMetadata,
  getMetadataInit,
  getMetadataReady,
  getMetadataFail
};
