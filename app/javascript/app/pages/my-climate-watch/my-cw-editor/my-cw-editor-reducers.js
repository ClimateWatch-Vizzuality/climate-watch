import { fromRaw } from 'utils/draft';
import * as vizzCreatorActions from 'components/my-climate-watch/viz-creator/viz-creator-actions';
import * as actions from './my-cw-editor-actions';
import initialState from './my-cw-editor-initial-state';

const closePicker = state => ({ ...state, pickerIsOpen: false });

export default {
  [actions.openPicker]: state => ({ ...state, pickerIsOpen: true }),
  [actions.closePicker]: closePicker,

  [vizzCreatorActions.openCreator]: state =>
    closePicker({ ...state, creatorIsOpen: true }),
  [vizzCreatorActions.closeCreator]: state => ({
    ...state,
    creatorIsOpen: false
  }),

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
  [actions.fetchInsight]: state => ({
    ...state,
    insight: { ...state.insight, loading: true }
  }),
  [actions.fetchInsightReady]: (state, { payload }) => ({
    ...state,
    content: fromRaw(payload.body),
    title: payload.title,
    insight: {
      ...state.insight,
      loading: false,
      loaded: true,
      insight: payload
    }
  }),
  [actions.fetchInsightFail]: state => ({
    ...state,
    insight: {
      ...state.insight,
      loading: false,
      error: true
    }
  }),
  [actions.saveInsight]: state => ({
    ...state,
    insight: {
      ...state.insight,
      saving: true
    }
  }),
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
  [actions.deleteInsight]: state => ({
    ...state,
    insight: {
      ...state.insight,
      deleting: true
    }
  }),
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
