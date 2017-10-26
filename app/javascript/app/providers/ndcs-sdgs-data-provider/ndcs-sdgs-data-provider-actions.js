import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const getNdcsSdgsDataInit = createAction('getNdcsSdgsDataInit');
const getNdcsSdgsDataReady = createAction('getNdcsSdgsDataReady');

const getNdcsSdgsData = createThunkAction(
  'getNdcsSdgsData',
  iso => (dispatch, state) => {
    const { ndcsSdgsData } = state();
    if (ndcsSdgsData && isEmpty(ndcsSdgsData.data[iso])) {
      dispatch(getNdcsSdgsDataInit());
      fetch(`/api/v1/ndcs/${iso}/sdgs`)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          dispatch(getNdcsSdgsDataReady(data));
        })
        .catch(error => {
          console.info(error);
        });
    }
  }
);

export default {
  getNdcsSdgsData,
  getNdcsSdgsDataInit,
  getNdcsSdgsDataReady
};
