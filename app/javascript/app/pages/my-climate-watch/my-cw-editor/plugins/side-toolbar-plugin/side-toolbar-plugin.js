import createSideToolbarPlugin from './draft-js-side-toolbar-plugin';
import SideToolbarPluginComponent from './sidebar-toolbar-plugin-component';
import theme from './side-toolbar-theme';

const sideToolbarPlugin = createSideToolbarPlugin({
  structure: [SideToolbarPluginComponent],
  theme: { toolbarStyles: theme }
});

export default sideToolbarPlugin;
