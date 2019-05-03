import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import { CWAPI } from 'services/api';

import {
  updateEditorContent,
  insertAtomicBlock,
  deleteAtomicBlock,
  logEditorState,
  toRaw
} from 'app/utils/draft';

export const openPicker = createAction('openPicker');
export const closePicker = createAction('closePicker');

export const updateContent = createAction('updateContent');
export const focusEditor = createAction('focusEditor');
export const focusTitle = createAction('focusTitle');
export const updateTitle = createAction('updateTitle');

export const logState = createThunkAction(
  'logState',
  () => (dispatch, getState) => {
    const { myCWEditor: { content: editorState } } = getState();
    console.log(logEditorState(editorState)); // eslint-disable-line no-console
  }
);

export const insertAtomic = createThunkAction(
  'insertAtomic',
  ({ type, mode, data }) => (dispatch, getState) => {
    const { myCWEditor: { content: editorState } } = getState();
    const { entityKey, newEditorState } = updateEditorContent({
      editorState,
      type,
      mode,
      data
    });
    dispatch(
      updateContent(
        insertAtomicBlock({ editorState: newEditorState, entityKey, char: ' ' })
      )
    );
    dispatch(focusEditor());
  }
);

export const deleteAtomic = createThunkAction(
  'deleteAtomic',
  atomic => (dispatch, getState) => {
    const { myCWEditor: { content: editorState } } = getState();
    dispatch(updateContent(deleteAtomicBlock(atomic, editorState)));
    dispatch(focusEditor());
  }
);

export const pickVisualiation = createThunkAction(
  'pickVisualiation',
  data => dispatch => {
    dispatch(
      insertAtomic({
        mode: 'IMMUTABLE',
        type: 'multichart',
        data
      })
    );
    dispatch(closePicker());
  }
);

export const clearInsight = createAction('clearInsight');
export const fetchInsightReady = createAction('fetchInsightReady');
export const fetchInsightFail = createAction('fetchInsightFail');
export const saveInsightReady = createAction('saveInsightReady');
export const saveInsightFail = createAction('saveInsightFail');
export const deleteInsightFail = createAction('deleteInsightFail');
export const deleteInsightReady = createAction('deleteInsightReady');

export const fetchInsight = createThunkAction(
  'fetchInsight',
  insightId => dispatch => {
    CWAPI.get(`my_cw/user_stories/${insightId}`)
      .then(insight => {
        dispatch(fetchInsightReady(insight));
      })
      .catch(e => {
        console.warn(e);
        dispatch(fetchInsightFail());
      });
  }
);

export const saveInsight = createThunkAction(
  'saveInsight',
  ({ content, title, id }) => dispatch => {
    const body = content.getCurrentContent();
    const story = {
      user_story: {
        title,
        body: toRaw(body),
        public: true
      }
    };

    const req = id
      ? CWAPI.patch(`my_cw/user_stories/${id}`, story)
      : CWAPI.post('my_cw/user_stories', story);

    return req
      .then(response => {
        dispatch(saveInsightReady(response));
        dispatch(clearInsight());
      })
      .catch(e => {
        console.warn(e);
        dispatch(saveInsightFail());
      });
  }
);

export const deleteInsight = createThunkAction(
  'deleteInsight',
  id => dispatch =>
    CWAPI.delete(`my_cw/user_stories/${id}`)
      .then(response => {
        dispatch(deleteInsightReady(response));
      })
      .catch(e => {
        console.warn(e);
        dispatch(deleteInsightFail());
      })
);
