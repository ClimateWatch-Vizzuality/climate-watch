import { withState } from 'recompose';
import Component from './collapse-component';

const withOpen = withState('opened', 'handleToggleCollapse', false);

export default withOpen(Component);
