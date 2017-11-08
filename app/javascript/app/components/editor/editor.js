import { createElement, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import initialState from './editor-initial-state';
import * as actions from './editor-actions';
import reducers from './editor-reducers';
import EditorComponent from './editor-component';

class Editor extends Component {
  componentWillReceiveProps({ editorIsFocused }) {
    if (editorIsFocused && this.editor) setTimeout(() => this.focus(), 0);
  }

  getEditorRef = ref => {
    this.editor = ref;
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    const {
      updateContent,
      content,
      pickVisualiation,
      pickerIsOpen,
      openPicker,
      closePicker,
      logState
    } = this.props;
    return createElement(EditorComponent, {
      pickerIsOpen,
      showPicker: openPicker,
      hidePicker: closePicker,
      editorState: content,
      onChange: updateContent,
      pickVisualiation,
      getEditorRef: this.getEditorRef,
      logState
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
  logState: PropTypes.func
};

const mapStateToProps = ({ editor }) => editor;

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(Editor);
