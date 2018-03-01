import {
  EditorState,
  AtomicBlockUtils,
  convertToRaw,
  convertFromRaw,
  RichUtils,
  SelectionState
} from 'draft-js';

export const toRaw = convertToRaw;
export const fromRaw = raw => EditorState.createWithContent(
  convertFromRaw(raw)
);

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

export default {};
