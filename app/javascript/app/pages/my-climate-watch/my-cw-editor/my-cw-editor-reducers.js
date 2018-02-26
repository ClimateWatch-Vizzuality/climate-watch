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
  [actions.getInsightInit]: state => ({ ...state, story: { ...state.story, loading: true } }),
  [actions.getInsightReady]: (state, { payload }) => ({
    ...state,
    story: { ...state.story,
      loading: false,
      loaded: true,
      insight: payload
    }
  }),
  [actions.getInsightFail]: state => ({
    ...state,
    story: { ...state.story,
      loading: false,
      error: true
    }
  }),
  [actions.saveInsightInit]: state => ({ ...state, saving: true }),
  [actions.saveInsightReady]: (state, { payload }) => ({
    ...state,
    story: { ...state.story,
      saving: false,
      saved: true,
      insight: payload
    }
  }),
  [actions.saveInsightFail]: state => ({ ...state, story: { ...state.story, saving: false, error: true } })
};
