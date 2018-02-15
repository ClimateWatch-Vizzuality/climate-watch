import Root from 'layouts/root';
import App from 'layouts/app';
import Contained from 'layouts/contained';
import Embed from 'layouts/embed';

import embedRoutes from './embed-routes';
import appRoutes from './app-routes';

const containedParam = 'contained';
// We only need the basename when the page is contained to include the prefix in every link
export const basename =
  window.location.pathname.split('/')[1] === containedParam
    ? containedParam
    : '';
export function isPageContained() {
  return basename === containedParam;
}

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
        component: isPageContained() ? Contained : App,
        path: '/',
        routes: appRoutes
      }
    ]
  }
];
