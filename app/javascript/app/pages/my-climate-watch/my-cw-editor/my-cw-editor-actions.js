import { createAction, createThunkAction } from 'redux-tools';
import { RichUtils, SelectionState, EditorState } from 'draft-js';

import {
  updateEditorContent,
  insertAtomicBlock,
  logEditorState
} from 'app/utils/draft';

export const openPicker = createAction('openPicker');
export const closePicker = createAction('closePicker');
export const openCreator = createAction('openCreator');
export const closeCreator = createAction('closeCreator');

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
    const content = editorState.getCurrentContent();
    const atomicKey = atomic.block.getKey();
    const blockBefore = content.getBlockBefore(atomicKey);
    const keyBefore = blockBefore.getKey();
    const lengthBefore = blockBefore.getLength();

    const withSelectionAboveAtomic = EditorState.forceSelection(
      editorState,
      new SelectionState({
        anchorKey: keyBefore,
        anchorOffset: lengthBefore,
        focusKey: keyBefore,
        focusOffset: lengthBefore
      })
    );
    const newContentState = RichUtils.onDelete(withSelectionAboveAtomic);
    dispatch(updateContent(newContentState));
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
