import * as actions from './editor-actions';

export default {
  [actions.openPicker]: state => ({ ...state, pickerIsOpen: true }),
  [actions.closePicker]: state => ({ ...state, pickerIsOpen: false }),
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
    title: payload.target.value,
    editorIsFocused: false
  })
};
