import Root from 'layouts/root';
import App from 'layouts/app';
import Embed from 'layouts/embed';

import embedRoutes from './embed-routes';
import appRoutes from './app-routes';

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
        component: App,
        path: '/',
        routes: appRoutes
      }
    ]
  }
];
