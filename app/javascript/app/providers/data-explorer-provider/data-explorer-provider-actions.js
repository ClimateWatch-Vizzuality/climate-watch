import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import {
  DATA_EXPLORER_SECTIONS,
  DATA_EXPLORER_PER_PAGE
} from 'data/data-explorer-constants';
import { ESP_HOST } from 'data/constants';
import isEmpty from 'lodash/isEmpty';
import { parseLinkHeader } from 'utils/utils';
import { parseQuery } from 'utils/data-explorer';
import qs from 'query-string';

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

const devESPURL = section => (section === 'emission-pathways' ? ESP_HOST : '');

export const fetchDataExplorer = createThunkAction(
  'fetchDataExplorer',
  ({ section, query, page }) => (dispatch, state) => {
    const { dataExplorer } = state();
    if (
      dataExplorer &&
      (isEmpty(dataExplorer) ||
        (dataExplorer.data && !dataExplorer.data[section]) ||
        (dataExplorer.data && !dataExplorer.loading))
    ) {
      dispatch(fetchDataExplorerInit());

      const updatedQuery = qs.parse(query) || {};
      updatedQuery.page = page || 1;
      updatedQuery.per_page = DATA_EXPLORER_PER_PAGE;

      const parsedQuery = parseQuery(qs.stringify(updatedQuery), section);
      fetch(
        `${devESPURL(section)}/api/v1/data/${
          DATA_EXPLORER_SECTIONS[section].label
        }?${parsedQuery}`
      )
        .then(response =>
          response.json().then(json => {
            if (response.ok) {
              return {
                total: response.headers.get('Total'),
                data: json.data,
                meta: json.meta
              };
            }
            throw Error(response.statusText);
          })
        )
        .then(response => {
          if (response) {
            dispatch(fetchDataExplorerReady({ data: response, section }));
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
    fetch('https://www.climatewatchdata.org/api/v1/metadata')
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
              metadata: { methodology: data }
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
      fetch(
        `${devESPURL(section)}/api/v1/data/${
          DATA_EXPLORER_SECTIONS[section].label
        }/meta`
      )
        .then(response => {
          if (response.ok) {
            const links = response.headers.get('Link');
            return parseLinkHeader(links);
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
            fetch(`${devESPURL(section)}${l.href}`).then(response => {
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
