import React from 'react';
import PropTypes from 'prop-types';
import Editor from 'draft-js-plugins-editor';

import createFocusPlugin from 'draft-js-focus-plugin';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import { createPlugin } from 'app/utils/draft';

import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js-side-toolbar-plugin/lib/plugin.css';
import 'draft-js-focus-plugin/lib/plugin.css';

import Modal from 'components/modal';
import Barchart from './components/barchart';
import Picker from './components/widget-picker';

import styles from './editor-styles';
import focusTheme from './focus-theme';

const inlineToolbarPlugin = createInlineToolbarPlugin();
const sideToolbarPlugin = createSideToolbarPlugin();

const { SideToolbar } = sideToolbarPlugin;
const { InlineToolbar } = inlineToolbarPlugin;
const focusPlugin = createFocusPlugin({
  theme: focusTheme
});

const barchartPlugin = createPlugin({
  decorator: focusPlugin.decorator,
  component: Barchart,
  type: 'barchart'
});

const plugins = [
  focusPlugin,
  barchartPlugin,
  inlineToolbarPlugin,
  sideToolbarPlugin
];

const StoryEditor = ({
  showPicker,
  editorState,
  onChange,
  pickVisualiation,
  hidePicker,
  getEditorRef,
  getTitleRef,
  pickerIsOpen,
  updateTitle,
  title,
  titlePlaceholder,
  focusEditor,
  focusTitle
}) => (
  <div className={styles.container}>
    <Modal isOpen={pickerIsOpen} onRequestClose={hidePicker}>
      <Picker onHidePicker={hidePicker} onSelectVis={pickVisualiation} />
    </Modal>
    <input
      type="text"
      onKeyUp={e => (e.keyCode === 13 ? focusEditor() : false)}
      onClick={focusTitle}
      ref={getTitleRef}
      className={styles.title}
      placeholder={titlePlaceholder}
      onChange={updateTitle}
      value={title}
    />
    <div className={styles.editor}>
      <Editor
        onClick={focusEditor}
        editorState={editorState}
        onChange={onChange}
        ref={getEditorRef}
        spellCheck
        plugins={plugins}
      />
      <InlineToolbar />
      <SideToolbar />
      <button onClick={showPicker}>Select visualisation</button>
    </div>
  </div>
);

StoryEditor.propTypes = {
  showPicker: PropTypes.func.isRequired,
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  pickVisualiation: PropTypes.func.isRequired,
  hidePicker: PropTypes.func.isRequired,
  getEditorRef: PropTypes.func.isRequired,
  getTitleRef: PropTypes.func.isRequired,
  pickerIsOpen: PropTypes.bool.isRequired,
  updateTitle: PropTypes.func.isRequired,
  focusTitle: PropTypes.func.isRequired,
  focusEditor: PropTypes.func.isRequired,
  title: PropTypes.string,
  titlePlaceholder: PropTypes.string
};

export default StoryEditor;
