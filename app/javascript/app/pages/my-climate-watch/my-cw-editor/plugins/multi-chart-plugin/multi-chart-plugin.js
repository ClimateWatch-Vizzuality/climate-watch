import MultiChartPlugin from './multi-chart-plugin-component';

const makeMultiChartPlugin = (config = {}) => {
  const { deleteAtomic } = config;
  let Comp = MultiChartPlugin;
  if (config.decorator) {
    Comp = config.decorator(Comp);
  }

  return {
    blockRendererFn: (block, { getEditorState }) => {
      if (block.getType() === 'atomic') {
        // TODO subject to change for draft-js next release
        const contentState = getEditorState().getCurrentContent();
        const current = block.getEntityAt(0);
        if (!current) return null;
        const entity = contentState.getEntity(current);
        const type = entity.getType();
        const data = entity.getData();
        if (type === 'multichart') {
          return {
            component: Comp,
            editable: false,
            props: { ...data, deleteAtomic }
          };
        }
      }

      return null;
    }
  };
};

export default makeMultiChartPlugin;
