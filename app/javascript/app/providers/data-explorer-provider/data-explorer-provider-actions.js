import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import { DATA_EXPLORER_SECTION_NAMES } from 'data/constants';
import isEmpty from 'lodash/isEmpty';
import { parseLinkHeader } from 'utils/utils';

export const fetchDataExplorerInit = createAction('fetchDataExplorerInit');
export const fetchDataExplorerReady = createAction('fetchDataExplorerReady');
export const fetchDataExplorerFail = createAction('fetchDataExplorerFail');

export const fetchSectionMetadataInit = createAction(
  'fetchSectionMetadataInit'
);
export const fetchSectionMetadataReady = createAction(
  'fetchSectionMetadataReady'
);
export const fetchSectionMetadataFail = createAction(
  'fetchSectionMetadataFail'
);

export const fetchMetadataInit = createAction('fetchMetadataInit');
export const fetchMetadataReady = createAction('fetchMetadataReady');
export const fetchMetadataFail = createAction('fetchMetadataFail');

export const fetchDataExplorer = createThunkAction(
  'fetchDataExplorer',
  section => (dispatch, state) => {
    const { dataExplorer } = state();
    if (
      dataExplorer &&
      (isEmpty(dataExplorer) ||
        (dataExplorer.data && !dataExplorer.data[section]) ||
        (dataExplorer.data &&
          (isEmpty(dataExplorer.data[section].data) && !dataExplorer.loading)))
    ) {
      dispatch(fetchDataExplorerInit());
      fetch(`/api/v1/data/${DATA_EXPLORER_SECTION_NAMES[section]}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw Error(response.statusText);
        })
        .then(data => {
          if (data) {
            dispatch(fetchDataExplorerReady({ data, section }));
          } else {
            dispatch(fetchDataExplorerReady({}));
          }
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchDataExplorerFail());
        });
    }
  }
);

export const fetchSectionMetadata = createThunkAction(
  'fetchSectionMetadata',
  () => dispatch => {
    dispatch(fetchSectionMetadataInit());
    fetch('/api/v1/metadata')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.statusText);
      })
      .then(data => {
        if (data) {
          dispatch(
            fetchSectionMetadataReady({
              metadata: { 'section-metadata': data }
            })
          );
        } else {
          dispatch(fetchSectionMetadataReady({}));
        }
      })
      .catch(error => {
        console.warn(error);
        dispatch(fetchSectionMetadataFail());
      });
  }
);

export const fetchMetadata = createThunkAction(
  'fetchMetadata',
  section => (dispatch, state) => {
    dispatch(fetchMetadataInit());
    const { dataExplorer } = state();
    if (
      dataExplorer &&
      (isEmpty(dataExplorer) ||
        isEmpty(dataExplorer.metadata) ||
        !dataExplorer.metadata[section])
    ) {
      fetch(`/api/v1/data/${DATA_EXPLORER_SECTION_NAMES[section]}/meta`)
        .then(response => {
          if (response.ok && response.headers.get('Link')) {
            return parseLinkHeader(response.headers.get('Link'));
          }
          throw Error(response.statusText);
        })
        .then(links => {
          const parsedLinks = links;
          return Object.keys(parsedLinks).map(key => ({
            rel: key.substring('meta '.length),
            href: parsedLinks[key].href
          }));
        })
        .then(parsedLinks => {
          const promises = parsedLinks.map(l =>
            fetch(l.href).then(response => {
              if (response.ok) return response.json();
              throw Error(response.statusText);
            })
          );
          Promise.all(promises)
            .then(response => {
              const responseSections = parsedLinks.map(l => l.rel);
              const metadata = {};
              responseSections.forEach((s, index) => {
                metadata[s] = response[index].data;
              });
              dispatch(fetchMetadataReady({ metadata, section }));
            })
            .catch(error => {
              console.warn(error);
              dispatch(fetchMetadataFail());
            });
        })
        .catch(error => {
          console.warn(error);
          dispatch(fetchMetadataFail());
        });
    }
  }
);

export default {
  fetchDataExplorer,
  fetchDataExplorerInit,
  fetchDataExplorerReady,
  fetchDataExplorerFail,
  fetchSectionMetadata,
  fetchSectionMetadataInit,
  fetchSectionMetadataReady,
  fetchSectionMetadataFail,
  fetchMetadata,
  fetchMetadataInit,
  fetchMetadataReady,
  fetchMetadataFail
};
