import { withProps } from 'recompose';
import { importAllImagesFromFolder } from 'app/utils';

import HeaderComponent from './header-component';

const images = importAllImagesFromFolder(
  require.context('assets/headers', false, /\.(png|jpe?g)$/)
);

const withBgByRoute = withProps(({ route }) => {
  if (!route || !route.headerImage) return null;

  return {
    image: images[route.headerImage] ? images[route.headerImage] : images.home
  };
});

export default withBgByRoute(HeaderComponent);
