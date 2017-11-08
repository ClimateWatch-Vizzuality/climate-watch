import { createElement, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './editor-actions';
import initialState from './editor-initial-state';
import reducers from './editor-reducers';
import EditorComponent from './editor-component';

class Editor extends Component {
  componentWillReceiveProps({ editorIsFocused, titleIsFocused }) {
    if (editorIsFocused && this.editor) setTimeout(() => this.focusEditor(), 0);
    if (titleIsFocused && this.editor) setTimeout(() => this.focusTitle(), 0);
  }

  getEditorRef = ref => {
    this.editor = ref;
  };

  getTitleRef = ref => {
    this.title = ref;
  };

  focusEditor = () => {
    this.editor.focus();
  };

  focusTitle = () => {
    this.title.focus();
  };

  render() {
    const {
      updateContent,
      content,
      openPicker,
      closePicker,
      ...props
    } = this.props;

    return createElement(EditorComponent, {
      showPicker: openPicker,
      hidePicker: closePicker,
      editorState: content,
      onChange: updateContent,
      getEditorRef: this.getEditorRef,
      getTitleRef: this.getTitleRef,
      focusEditor: this.focusEditor,
      focusTitle: this.focusTitle,
      ...props
    });
  }
}

Editor.propTypes = {
  updateContent: PropTypes.func.isRequired,
  content: PropTypes.object.isRequired,
  pickVisualiation: PropTypes.func.isRequired,
  openPicker: PropTypes.func.isRequired,
  closePicker: PropTypes.func.isRequired,
  pickerIsOpen: PropTypes.bool.isRequired,
  updateTitle: PropTypes.func.isRequired,
  logState: PropTypes.func,
  title: PropTypes.string,
  titlePlaceholder: PropTypes.string
};

const mapStateToProps = ({ editor }) => editor;

export { actions, reducers, initialState };

export default connect(mapStateToProps, { ...actions })(Editor);
