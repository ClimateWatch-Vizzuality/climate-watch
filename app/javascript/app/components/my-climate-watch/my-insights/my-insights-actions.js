import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

export const gotStories = createAction('gotStories');

export const fetchStories = createThunkAction(
  'fetchStories',
  () => dispatch => {
    fetch('/api/v1/my_cw/user_stories', {
      credentials: 'same-origin'
    })
      .then(d => d.json())
      .then(stories => dispatch(gotStories(stories)));
  }
);
