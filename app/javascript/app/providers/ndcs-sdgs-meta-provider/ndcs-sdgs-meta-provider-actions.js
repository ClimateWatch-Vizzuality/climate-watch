import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const getNdcsSdgsMetaInit = createAction('getNdcsSdgsMetaInit');
const getNdcsSdgsMetaReady = createAction('getNdcsSdgsMetaReady');
const getNdcsSdgsMetaFail = createAction('getTimelineFail');

const getNdcsSdgsMeta = createThunkAction(
  'getNdcsSdgsMeta',
  () => (dispatch, state) => {
    const { ndcsSdgsMeta } = state();
    if (ndcsSdgsMeta && isEmpty(ndcsSdgsMeta.data)) {
      dispatch(getNdcsSdgsMetaInit());
      fetch('/api/v1/ndcs/sdgs')
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          dispatch(getNdcsSdgsMetaReady(data));
        })
        .catch(error => {
          console.info(error);
          dispatch(getNdcsSdgsMetaFail());
        });
    }
  }
);

export default {
  getNdcsSdgsMeta,
  getNdcsSdgsMetaInit,
  getNdcsSdgsMetaReady
};
