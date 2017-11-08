import { EditorState, AtomicBlockUtils, convertToRaw } from 'draft-js';
import { compose, mapProps, withProps } from 'recompose';
import omit from 'lodash/fp/omit';

export const updateEditorContent = ({ editorState, type, mode, data }) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(type, mode, data);
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity
  });
  return {
    entityKey,
    newEditorState
  };
};

export const insertAtomicBlock = ({ editorState, entityKey, char }) =>
  AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, char);

export const logEditorState = editorState =>
  convertToRaw(editorState.getCurrentContent());

const filterProps = compose(mapProps, omit);

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

export const createPlugin = (config = {}) => {
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
    blockRendererFn: blockRendererFn(component, config.type)
  };
};

export default {};
