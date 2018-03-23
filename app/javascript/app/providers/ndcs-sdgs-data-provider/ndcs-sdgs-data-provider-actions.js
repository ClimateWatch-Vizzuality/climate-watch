import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const getNdcsSdgsDataInit = createAction('getNdcsSdgsDataInit');
const getNdcsSdgsDataReady = createAction('getNdcsSdgsDataReady');

const getNdcsSdgsData = createThunkAction(
  'getNdcsSdgsData',
  (iso, document) => (dispatch, state) => {
    const { ndcsSdgsData } = state();
    if (ndcsSdgsData) {
      dispatch(getNdcsSdgsDataInit());
      const documentFilter = document ? `?document=${document}` : '';
      fetch(`/api/v1/ndcs/${iso}/sdgs${documentFilter}`)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          dispatch(getNdcsSdgsDataReady(data));
        })
        .catch(error => {
          console.info(error);
          dispatch(getNdcsSdgsDataReady({}));
        });
    }
  }
);

export default {
  getNdcsSdgsData,
  getNdcsSdgsDataInit,
  getNdcsSdgsDataReady
};
