import { EditorState } from 'draft-js';

export default {
  pickerIsOpen: true,
  title: '',
  titlePlaceholder: 'Title of the insight',
  content: EditorState.createEmpty(),
  titleIsFocused: true,
  editorIsFocused: false
};
