import { createElement, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actions as creatorActions } from 'components/my-climate-watch/viz-creator';
import * as actions from './my-cw-editor-actions';
import * as reducers from './my-cw-editor-reducers';
import initialState from './my-cw-editor-initial-state';
import EditorComponent from './my-cw-editor-component';

class Editor extends Component {
  componentWillReceiveProps({ editorIsFocused, titleIsFocused, insight, ...props }) {
    if (editorIsFocused && this.editor) setTimeout(() => this.focusEditor(), 0);
    if (titleIsFocused && this.editor) setTimeout(() => this.focusTitle(), 0);
    if (insight.saved) props.history.push('/my-climate-watch');
  }

  getEditorRef = ref => {
    this.editor = ref;
  };

  getTitleRef = ref => {
    this.title = ref;
  };

  focusEditor = () => {
    if (this.editor) this.editor.focus();
  };

  focusTitle = () => {
    if (this.title) this.title.focus();
  };

  render() {
    const {
      updateContent,
      content,
      openPicker,
      closePicker,
      openCreator,
      closeCreator,
      insight,
      ...props
    } = this.props;

    return createElement(EditorComponent, {
      showPicker: openPicker,
      hidePicker: closePicker,
      showCreator: openCreator,
      hideCreator: closeCreator,
      editorState: content,
      onChange: updateContent,
      insight,
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
  insight: PropTypes.object.isRequired,
  pickVisualiation: PropTypes.func.isRequired,
  openPicker: PropTypes.func.isRequired,
  closePicker: PropTypes.func.isRequired,
  openCreator: PropTypes.func.isRequired,
  closeCreator: PropTypes.func.isRequired,
  pickerIsOpen: PropTypes.bool.isRequired,
  updateTitle: PropTypes.func.isRequired,
  logState: PropTypes.func,
  title: PropTypes.string,
  titlePlaceholder: PropTypes.string
};

const mapStateToProps = ({ myCWEditor }) => myCWEditor;

export { actions, reducers, initialState };

export default connect(mapStateToProps, { ...actions, ...creatorActions })(
  Editor
);
