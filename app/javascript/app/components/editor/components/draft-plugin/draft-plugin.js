import { compose, mapProps, withProps } from 'recompose';
import omit from 'lodash/fp/omit';

import { EditorState, AtomicBlockUtils } from 'draft-js';

const filterProps = compose(mapProps, omit);

const modifier = urlType => (editorState, mode = 'IMMUTABLE', data) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(urlType, mode, data);
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    ' '
  );
  return EditorState.forceSelection(
    newEditorState,
    editorState.getCurrentContent().getSelectionAfter()
  );
};

const blockRendererFn = (component, entityType) => (
  block,
  { getEditorState }
) => {
  if (block.getType() === 'atomic') {
    const contentState = getEditorState().getCurrentContent();
    const entity = contentState.getEntity(block.getEntityAt(0));
    const type = entity.getType();
    const data = entity.data;
    if (type === entityType) {
      return {
        component: withProps({ data })(component),
        editable: false
      };
    }
  }
  return null;
};

const createBarchartPlugin = (config = {}) => {
  const Chart = filterProps([
    'block',
    'blockProps',
    'customStyleMap',
    'customStyleFn',
    'decorator',
    'forceSelection',
    'offsetKey',
    'selection',
    'tree',
    'contentState'
  ])(config.component || (() => null));

  const component = config.decorator ? config.decorator(Chart) : Chart;
  return {
    blockRendererFn: blockRendererFn(component, config.type),
    modifier: modifier(config.type)
  };
};

export default createBarchartPlugin;
