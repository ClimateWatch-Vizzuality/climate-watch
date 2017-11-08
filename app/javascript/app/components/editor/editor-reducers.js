import * as actions from './editor-actions';

export default {
  [actions.openPicker]: state => ({ ...state, pickerIsOpen: true }),
  [actions.closePicker]: state => ({ ...state, pickerIsOpen: false }),
  [actions.updateContent]: (state, { payload }) => ({
    ...state,
    content: payload
  }),
  [actions.focusEditor]: state => ({ ...state, editorIsFocused: true })
};
