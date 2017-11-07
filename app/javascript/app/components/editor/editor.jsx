import React, { Component } from 'react';
import { EditorState, AtomicBlockUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createFocusPlugin from 'draft-js-focus-plugin';

import Modal from 'components/modal';
import createPlugin from './components/draft-plugin';
import Barchart from './components/barchart';
import Picker from './components/widget-picker';

import styles from './editor-styles';
import focusTheme from './focus-theme';

const focusPlugin = createFocusPlugin({
  theme: focusTheme
});

const decorator = focusPlugin.decorator;
const barchartPlugin = createPlugin({
  decorator,
  component: Barchart,
  type: 'barchart'
});
const plugins = [focusPlugin, barchartPlugin];

class StoryEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      editorState: EditorState.createEmpty()
    };
  }

  onChange = editorState => {
    this.setState({ editorState });
  };

  focus = () => {
    this.editor.focus();
  };

  showPicker = () => {
    this.setState({ showPicker: true });
  };

  hidePicker = () => {
    this.setState({ showPicker: false });
  };

  selectVisualiation = payload => {
    this.insertAtomic(payload);
    this.setState({ showPicker: false });
  };

  // logState = () => {
  //   const content = this.state.editorState.getCurrentContent();
  //   console.log(convertToRaw(content));
  // }

  insertAtomic = ({ type, mode = 'IMMUTABLE', data }) => {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(type, mode, data);
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });

    this.setState(
      {
        editorState: AtomicBlockUtils.insertAtomicBlock(
          newEditorState,
          entityKey,
          ' '
        )
      },
      () => setTimeout(() => this.focus(), 0)
    );

    return entityKey;
  };

  render() {
    const { editorState, showPicker } = this.state;

    return (
      <div className={styles.container}>
        <h1>Editor</h1>
        <Modal isOpen={showPicker} onRequestClose={this.hidePicker}>
          <Picker
            onHidePicker={this.hidePicker}
            onSelectVis={this.selectVisualiation}
          />
        </Modal>
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          ref={ref => {
            this.editor = ref;
          }}
          spellCheck
          plugins={plugins}
        />
        <button onClick={this.showPicker}>Select visualisation</button>
      </div>
    );
  }
}

export default StoryEditor;
