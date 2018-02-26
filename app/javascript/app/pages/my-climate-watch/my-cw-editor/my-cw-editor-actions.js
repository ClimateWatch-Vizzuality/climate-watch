import { createAction, createThunkAction } from 'redux-tools';
import { CWAPI } from 'services/api';

import {
  updateEditorContent,
  insertAtomicBlock,
  deleteAtomicBlock,
  logEditorState
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
export const getInsightInit = createAction('getInsightInit');
export const getInsightReady = createAction('getInsightReady');
export const getInsightFail = createAction('getInsightFail');
export const saveInsightInit = createAction('saveInsightInit');
export const saveInsightReady = createAction('saveInsightReady');
export const saveInsightFail = createAction('saveInsightFail');

export const getInsight = createThunkAction(
  'getInsight',
  insightId => dispatch => {
    dispatch(getInsightInit());
    CWAPI.get(`my_cw/user_stories/${insightId}`)
      .then(insight => {
        dispatch(getInsightReady(insight));
      })
      .catch(e => {
        console.warn(e);
        dispatch(getInsightFail());
      });
  }
);

export const saveInsight = createThunkAction(
  'saveInsight',
  ({ content, title, id = '' }) => dispatch => {
    dispatch(saveInsightInit());
    const story = {
      user_story: {
        title,
        body: content,
        public: true
      }
    };
    if (id) {
      CWAPI.patch(`my_cw/user_stories/${id}`, story)
        .then(response => {
          dispatch(saveInsightReady(response));
          dispatch(clearInsight(response));
        })
        .catch(e => {
          console.warn(e);
          dispatch(saveInsightFail());
        });
    } else {
      CWAPI.post('my_cw/user_stories', story)
        .then(response => {
          dispatch(saveInsightReady(response));
        })
        .catch(e => {
          console.warn(e);
          dispatch(saveInsightFail());
        });
    }
  }
);
