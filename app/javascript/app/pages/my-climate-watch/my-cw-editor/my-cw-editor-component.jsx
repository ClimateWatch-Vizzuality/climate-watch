import React from 'react';
import PropTypes from 'prop-types';
import Editor from 'draft-js-plugins-editor';

import createFocusPlugin from 'draft-js-focus-plugin';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import { createPlugin } from 'app/utils/draft';

import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js-focus-plugin/lib/plugin.css';

import Modal, { ModalHeader } from 'components/modal';
import Icon from 'components/icon';
import iconBarchart from 'assets/icons/barchart.svg';

import createSideToolbarPlugin from './draft-js-side-toolbar-plugin';
import Barchart from './components/barchart';
import Picker from './components/widget-picker';
import VizCreator from 'components/my-climate-watch/viz-creator';

import styles from './my-cw-editor-styles';
import focusTheme from './themes/focus-theme';

const inlineToolbarPlugin = createInlineToolbarPlugin();
const sideToolbarPlugin = createSideToolbarPlugin({
  structure: [
    ({ trigerTool }) => (
      <button onClick={trigerTool}>
        <Icon icon={iconBarchart} />
      </button>
    )
  ]
});

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

const modalStyles = {
  content: {
    width: '90vw',
    maxHeight: '90vh',
    height: '90vh'
  }
};

const StoryEditor = ({
  showPicker,
  editorState,
  onChange,
  pickVisualiation,
  hidePicker,
  creatorIsOpen,
  hideCreator,
  showCreator,
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
    <Modal
      styles={modalStyles}
      isOpen={pickerIsOpen}
      onRequestClose={hidePicker}
      header={<ModalHeader title="Select a visualisation" />}
    >
      <Picker
        onHidePicker={hidePicker}
        onOpenCreator={showCreator}
        onSelectVis={pickVisualiation}
      />
    </Modal>
    <Modal
      styles={modalStyles}
      isOpen={creatorIsOpen}
      onRequestClose={hideCreator}
      header={<ModalHeader title="Create a visualisation" />}
    >
      <VizCreator onHideCreator={hideCreator} />
    </Modal>
    <input
      type="text"
      onKeyUp={e => {
        if (e.keyCode === 13) {
          focusEditor();
        }
      }}
      onClick={focusTitle}
      ref={getTitleRef}
      className={styles.title}
      placeholder={titlePlaceholder}
      onChange={e => updateTitle(e.target.value)}
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
      <SideToolbar trigerTool={() => showPicker()} />
    </div>
  </div>
);

StoryEditor.propTypes = {
  showPicker: PropTypes.func.isRequired,
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  pickVisualiation: PropTypes.func.isRequired,
  getEditorRef: PropTypes.func.isRequired,
  getTitleRef: PropTypes.func.isRequired,
  pickerIsOpen: PropTypes.bool.isRequired,
  hidePicker: PropTypes.func.isRequired,
  creatorIsOpen: PropTypes.bool.isRequired,
  hideCreator: PropTypes.func.isRequired,
  showCreator: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  focusTitle: PropTypes.func.isRequired,
  focusEditor: PropTypes.func.isRequired,
  title: PropTypes.string,
  titlePlaceholder: PropTypes.string
};

export default StoryEditor;
