import React from 'react';
import PropTypes from 'prop-types';
import Editor from 'draft-js-plugins-editor';
import Sticky from 'react-stickynode';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js-focus-plugin/lib/plugin.css';
import cx from 'classnames';

import Modal, { ModalHeader } from 'components/modal';
import Button from 'components/button';
import Loading from 'components/loading';
import MyViz from 'components/my-climate-watch/my-visualisations';
import VizCreator from 'components/my-climate-watch/viz-creator';
import layoutStyles from 'app/styles/layout';
import styles from './my-cw-editor-styles';

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
  focusTitle,
  saveInsight,
  plugins,
  pluginComps: { InlineToolbar, SideToolbar },
  insight
}) => (
  <div className={styles.container}>
    <Modal
      customStyles={modalStyles}
      isOpen={pickerIsOpen}
      onRequestClose={hidePicker}
      header={<ModalHeader title="Select a visualisation" />}
    >
      <MyViz
        closeCreator={hidePicker}
        openCreator={showCreator}
        onSelectVis={pickVisualiation}
        mode="add"
      />
    </Modal>
    <Modal
      customStyles={modalStyles}
      isOpen={creatorIsOpen}
      onRequestClose={hideCreator}
      header={<ModalHeader title="Create a visualisation" />}
    >
      <VizCreator onHideCreator={hideCreator} />
    </Modal>
    {insight.saving && (
      <div className={layoutStyles.loadingModal} key="loader-block">
        <Loading />
      </div>
    )}
    {[
      <Sticky
        activeClass={cx('sticky', styles.stickyWrapper)}
        key="title-block"
      >
        <div className={styles.headerWrapper}>
          <div className={styles.title}>
            <input
              type="text"
              onKeyUp={e => {
                if (e.keyCode === 13) {
                  focusEditor();
                }
              }}
              onClick={focusTitle}
              ref={getTitleRef}
              className={styles.titleField}
              placeholder={titlePlaceholder}
              onChange={e => updateTitle(e.target.value)}
              value={title}
            />
            <Button
              className={styles.saveBtn}
              onClick={() =>
                saveInsight({
                  title,
                  content: editorState,
                  id: insight.insight.id
                })}
            >
              Save
            </Button>
          </div>
        </div>
      </Sticky>,
      <div className={styles.editor} key="editor-block">
        <Editor
          onClick={focusEditor}
          editorState={editorState}
          onChange={onChange}
          ref={getEditorRef}
          spellCheck
          plugins={plugins}
        />
        <InlineToolbar />
        <SideToolbar
          trigerTool={() => showPicker()}
          structure={[<button>Add Viz</button>]}
        />
      </div>
    ]}
  </div>
);

StoryEditor.propTypes = {
  showPicker: PropTypes.func.isRequired,
  editorState: PropTypes.object.isRequired,
  insight: PropTypes.object.isRequired,
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
  saveInsight: PropTypes.func.isRequired,
  title: PropTypes.string,
  plugins: PropTypes.array,
  pluginComps: PropTypes.object,
  titlePlaceholder: PropTypes.string
};

export default StoryEditor;
