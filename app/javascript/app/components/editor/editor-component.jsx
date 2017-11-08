import React from 'react';
import Editor from 'draft-js-plugins-editor';
import createFocusPlugin from 'draft-js-focus-plugin';
import { createPlugin } from 'app/utils/draft';
import PropTypes from 'prop-types';

import Modal from 'components/modal';
import Barchart from './components/barchart';
import Picker from './components/widget-picker';

import styles from './editor-styles';
import focusTheme from './focus-theme';

const focusPlugin = createFocusPlugin({
  theme: focusTheme
});

const barchartPlugin = createPlugin({
  decorator: focusPlugin.decorator,
  component: Barchart,
  type: 'barchart'
});

const plugins = [focusPlugin, barchartPlugin];

const StoryEditor = ({
  showPicker,
  editorState,
  onChange,
  pickVisualiation,
  hidePicker,
  getEditorRef,
  pickerIsOpen
}) => (
  <div className={styles.container}>
    <h1>Editor</h1>
    <Modal isOpen={pickerIsOpen} onRequestClose={hidePicker}>
      <Picker onHidePicker={hidePicker} onSelectVis={pickVisualiation} />
    </Modal>
    <Editor
      editorState={editorState}
      onChange={onChange}
      ref={getEditorRef}
      spellCheck
      plugins={plugins}
    />
    <button onClick={showPicker}>Select visualisation</button>
  </div>
);

StoryEditor.propTypes = {
  showPicker: PropTypes.func.isRequired,
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  pickVisualiation: PropTypes.func.isRequired,
  hidePicker: PropTypes.func.isRequired,
  getEditorRef: PropTypes.func.isRequired,
  pickerIsOpen: PropTypes.bool.isRequired
};

export default StoryEditor;
