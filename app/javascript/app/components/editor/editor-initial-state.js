import { EditorState } from 'draft-js';

export default {
  pickerIsOpen: false,
  title: '',
  titlePlaceholder: 'Title of the insight',
  content: EditorState.createEmpty(),
  editorIsFocused: false
};
