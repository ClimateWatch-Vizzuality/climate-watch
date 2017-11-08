import { createAction } from 'redux-actions';
import { createThunkAction } from 'app/utils/redux';
import {
  updateEditorContent,
  insertAtomicBlock,
  logEditorState
} from 'app/utils/draft';

export const openPicker = createAction('openPicker');
export const closePicker = createAction('closePicker');
export const updateContent = createAction('updateContent');
export const focusEditor = createAction('focusEditor');
export const logState = createThunkAction(
  'logState',
  () => (dispatch, getState) => {
    const { editor: { content: editorState } } = getState();
    console.log(logEditorState(editorState)); // eslint-disable-line no-console
  }
);

export const insertAtomic = createThunkAction(
  'insertAtomic',
  ({ type, mode, data }) => (dispatch, getState) => {
    const { editor: { content: editorState } } = getState();
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

export const pickVisualiation = createThunkAction(
  'pickVisualiation',
  payload => dispatch => {
    dispatch(insertAtomic(payload));
    dispatch(closePicker());
  }
);
