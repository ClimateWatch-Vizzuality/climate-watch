import * as actions from './my-cw-editor-actions';
import initialState from './my-cw-editor-initial-state';

const closePicker = state => ({ ...state, pickerIsOpen: false });

export default {
  [actions.openPicker]: state => ({ ...state, pickerIsOpen: true }),
  [actions.closePicker]: closePicker,

  [actions.openCreator]: state =>
    closePicker({ ...state, creatorIsOpen: true }),
  [actions.closeCreator]: state => ({ ...state, creatorIsOpen: false }),

  [actions.updateContent]: (state, { payload }) => ({
    ...state,
    content: payload,
    titleIsFocused: false
  }),
  [actions.focusEditor]: state => ({
    ...state,
    editorIsFocused: true,
    titleIsFocused: false
  }),
  [actions.focusTitle]: state => ({
    ...state,
    titleIsFocused: true,
    editorIsFocused: false
  }),
  [actions.updateTitle]: (state, { payload }) => ({
    ...state,
    title: payload,
    editorIsFocused: false
  }),
  [actions.clearInsight]: () => initialState,
  [actions.getInsight]: state => ({
    ...state,
    insight: { ...state.insight, loading: true }
  }),
  [actions.getInsightReady]: (state, { payload }) => ({
    ...state,
    insight: {
      ...state.insight,
      loading: false,
      loaded: true,
      insight: payload
    }
  }),
  [actions.getInsightFail]: state => ({
    ...state,
    insight: {
      ...state.insight,
      loading: false,
      error: true
    }
  }),
  [actions.saveInsight]: state => ({ ...state,
    insight: {
      ...state.insight, saving: true } }),
  [actions.saveInsightReady]: (state, { payload }) => ({
    ...state,
    insight: {
      ...state.insight,
      saving: false,
      saved: true,
      insight: payload
    }
  }),
  [actions.saveInsightFail]: state => ({
    ...state,
    insight: { ...state.insight, saving: false, error: true }
  }),
  [actions.deleteInsight]: state => ({ ...state,
    insight: {
      ...state.insight, deleting: true } }),
  [actions.deleteInsightReady]: state => ({
    ...state,
    insight: {
      ...state.insight,
      deleting: false,
      deleted: true,
      insight: {}
    }
  }),
  [actions.deleteInsightFail]: state => ({
    ...state,
    insight: { ...state.insight, deleting: false, error: true }
  })
};
