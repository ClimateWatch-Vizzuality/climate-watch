import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import { convertFromRaw } from 'draft-js';

const getInsight = state => state.insight || null;

export const parseInsight = createSelector(getInsight, insight => {
  if (!insight || isEmpty(insight)) return {};
  return {
    ...insight,
    editorContent: insight.body && convertFromRaw(insight.body)
  };
});
