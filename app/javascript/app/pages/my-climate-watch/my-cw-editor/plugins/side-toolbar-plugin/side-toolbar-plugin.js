import createSideToolbarPlugin from './draft-js-side-toolbar-plugin';
import SideToolbarPluginComponent from './sidebar-toolbar-plugin-component';

const sideToolbarPlugin = createSideToolbarPlugin({
  structure: [SideToolbarPluginComponent]
});

export default sideToolbarPlugin;
