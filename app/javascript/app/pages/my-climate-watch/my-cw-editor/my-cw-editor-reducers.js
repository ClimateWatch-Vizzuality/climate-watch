import * as actions from './my-cw-editor-actions';

const closePicker = state => ({ ...state, pickerIsOpen: false });

export default {
  [actions.openPicker]: state => ({ ...state, pickerIsOpen: true }),
  [actions.closePicker]: closePicker,

  [actions.openCreator]: state =>
    closePicker({ ...state, creatorIsOpen: true }),
  [actions.closeCreator]: state => ({ ...state, creatorIsOpen: false }),

  [actions.updateContent]: (state, { payload }) => ({
    ...state,
    content: payload,
    titleIsFocused: false
  }),
  [actions.focusEditor]: state => ({
    ...state,
    editorIsFocused: true,
    titleIsFocused: false
  }),
  [actions.focusTitle]: state => ({
    ...state,
    titleIsFocused: true,
    editorIsFocused: false
  }),
  [actions.updateTitle]: (state, { payload }) => ({
    ...state,
    title: payload,
    editorIsFocused: false
  })
};
