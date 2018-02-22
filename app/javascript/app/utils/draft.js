import {
  EditorState,
  AtomicBlockUtils,
  convertToRaw,
  RichUtils,
  SelectionState
} from 'draft-js';

// import { compose, mapProps, withProps } from 'recompose';
// import omit from 'lodash/fp/omit';

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

// const filterProps = compose(mapProps, omit);

// const blockRendererFn = (component, entityType) => (
//   block,
//   { getEditorState }
// ) => {
//   if (block.getType() === 'atomic') {
//     const contentState = getEditorState().getCurrentContent();
//     const entity = contentState.getEntity(block.getEntityAt(0));
//     const type = entity.getType();
//     const data = entity.data;
//     if (type === entityType) {
//       return {
//         component: withProps({ data })(component),
//         editable: false
//       };
//     }
//   }
//   return null;
// };

export const deleteAtomicBlock = (atomic, editorState) => {
  const content = editorState.getCurrentContent();
  const atomicKey = atomic.block.getKey();
  const blockBefore = content.getBlockBefore(atomicKey);
  const keyBefore = blockBefore.getKey();
  const lengthBefore = blockBefore.getLength();

  const withSelectionAboveAtomic = EditorState.forceSelection(
    editorState,
    new SelectionState({
      anchorKey: keyBefore,
      anchorOffset: lengthBefore,
      focusKey: keyBefore,
      focusOffset: lengthBefore
    })
  );

  return RichUtils.onDelete(withSelectionAboveAtomic);
};

// export const createPlugin = (config = {}) => {
//   const comp = filterProps([
//     'block',
//     'blockProps',
//     'customStyleMap',
//     'customStyleFn',
//     'decorator',
//     'forceSelection',
//     'offsetKey',
//     'selection',
//     'tree',
//     'contentState'
//   ])(config.component || (() => null));
//   const renderer = config.renderer || blockRendererFn;
//   const component = config.decorator ? config.decorator(comp) : comp;
//   return {
//     blockRendererFn: renderer(component, config.type)
//   };
// };

export default {};
