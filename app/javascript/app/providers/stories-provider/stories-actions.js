import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

const fetchStoriesInit = createAction('fetchStoriesInit');
const fetchStoriesReady = createAction('fetchStoriesReady');
const fetchStoriesFail = createAction('fetchStoriesFail');

const TAGS = ['climatewatch'];

const fetchStories = createThunkAction('fetchStories', () => dispatch => {
  dispatch(fetchStoriesInit());
  fetch(`/api/v1/stories?tags=${TAGS}`)
    .then(response => {
      if (response.ok) return response.json();
      throw Error(response.statusText);
    })
    .then(data => {
      dispatch(fetchStoriesReady(data));
    })
    .catch(error => {
      console.info(error);
      dispatch(fetchStoriesFail());
    });
});

export default {
  fetchStories,
  fetchStoriesInit,
  fetchStoriesReady,
  fetchStoriesFail
};
