import Root from 'layouts/root';
import App from 'layouts/app';
import Contained from 'layouts/contained';
import Embed from 'layouts/embed';
import { isPageContained } from 'utils/navigation';
import { CONTAINED_PATHNAME } from 'data/constants';
import embedRoutes from './embed-routes';
import appRoutes from './app-routes';

// We only need the basename when the page is contained to include the prefix in every link
export const basename = isPageContained ? CONTAINED_PATHNAME : '';
export default [
  {
    component: Root,
    routes: [
      {
        component: Embed,
        path: '/embed',
        routes: embedRoutes
      },
      {
        component: isPageContained ? Contained : App,
        path: '/',
        routes: appRoutes
      }
    ]
  }
];
