import { EditorState } from 'draft-js';

export default {
  pickerIsOpen: false,
  creatorIsOpen: false,
  title: '',
  titlePlaceholder: 'Title of the insight',
  content: EditorState.createEmpty(),
  titleIsFocused: true,
  editorIsFocused: false,
  insight: {
    loading: false,
    loaded: false,
    saving: false,
    saved: false,
    insight: {},
    error: false
  }
};
