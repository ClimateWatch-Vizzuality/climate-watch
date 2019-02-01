import { createElement, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';

import { actions as creatorActions } from 'components/my-climate-watch/viz-creator';
import * as actions from './my-cw-editor-actions';
import reducers from './my-cw-editor-reducers';
import initialState from './my-cw-editor-initial-state';
import EditorComponent from './my-cw-editor-component';

import sideToolbarPlugin from './plugins/side-toolbar-plugin';
import createMultichartPlugin from './plugins/multi-chart-plugin';

class Editor extends Component {
  constructor(props) {
    super(props);
    const { deleteAtomic } = props;
    // instantiate and cache plugins when we need them to be redux aware i.e. deleteAtomic action
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    const multichartPlugin = createMultichartPlugin({ deleteAtomic });
    const { SideToolbar } = sideToolbarPlugin;
    const { InlineToolbar } = inlineToolbarPlugin;
    this.plugins = [inlineToolbarPlugin, sideToolbarPlugin, multichartPlugin];
    this.pluginComps = {
      SideToolbar,
      InlineToolbar
    };
  }
  componentWillReceiveProps({
    editorIsFocused,
    titleIsFocused,
    insight,
    insightId,
    fetchInsight,
    clearInsight,
    ...props
  }) {
    if (editorIsFocused && this.editor) setTimeout(() => this.focusEditor(), 0);
    if (titleIsFocused && this.editor) setTimeout(() => this.focusTitle(), 0);
    if (insight.saved) props.history.push('/my-climate-watch');
    if (insightId && !insight.loading && !insight.loaded) {
      if (insightId !== insight.insight) {
        fetchInsight(insightId);
      } else {
        clearInsight();
      }
    }
  }

  componentWillUnmount() {
    this.props.clearInsight();
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
      plugins: this.plugins,
      pluginComps: this.pluginComps,
      ...props
    });
  }
}

Editor.propTypes = {
  updateContent: PropTypes.func.isRequired,
  content: PropTypes.object.isRequired,
  insight: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  pickVisualiation: PropTypes.func.isRequired,
  openPicker: PropTypes.func.isRequired,
  closePicker: PropTypes.func.isRequired,
  openCreator: PropTypes.func.isRequired,
  closeCreator: PropTypes.func.isRequired,
  pickerIsOpen: PropTypes.bool.isRequired,
  updateTitle: PropTypes.func.isRequired,
  logState: PropTypes.func,
  deleteAtomic: PropTypes.func,
  clearInsight: PropTypes.func,
  titlePlaceholder: PropTypes.string
};

const mapStateToProps = ({ myCWEditor }, router) => ({
  ...myCWEditor,
  insightId: router.match.params.insightId
});

export { actions, reducers, initialState };

export default connect(mapStateToProps, { ...actions, ...creatorActions })(
  Editor
);
