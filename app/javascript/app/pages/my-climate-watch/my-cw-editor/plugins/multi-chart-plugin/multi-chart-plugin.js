import MultiChartPlugin from './multi-chart-plugin-component';

const makeMultiChartPlugin = (config = {}) => {
  let Comp = MultiChartPlugin;
  if (config.decorator) {
    Comp = config.decorator(Comp);
  }

  return {
    blockRendererFn: (block, { getEditorState }) => {
      if (block.getType() === 'atomic') {
        // TODO subject to change for draft-js next release
        const contentState = getEditorState().getCurrentContent();
        const entity = contentState.getEntity(block.getEntityAt(0));
        const type = entity.getType();
        const data = entity.getData();
        if (type === 'multichart') {
          return {
            component: Comp,
            editable: false,
            props: data
          };
        }
      }

      return null;
    }
  };
};

export default makeMultiChartPlugin;
