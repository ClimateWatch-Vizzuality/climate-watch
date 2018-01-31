import { withProps } from 'recompose';
import { themr } from 'react-css-themr';
import HeaderComponent from './header-component';
import styles from './header-styles.scss';

function importAllImagesFromFolder(r) {
  const images = {};
  const keys = r.keys();
  if (keys.length) {
    keys.forEach(item => {
      images[item.replace('./', '').replace('.jpg', '')] = r(item);
    });
  }
  return images;
}

const images = importAllImagesFromFolder(
  require.context('assets/headers', false, /\.(png|jpe?g)$/)
);

const withBgByRoute = withProps(({ route }) => {
  if (!route || !route.headerImage) return null;

  return {
    color: route.headerColor,
    image: images[route.headerImage] ? images[route.headerImage] : images.home
  };
});

export default themr('HeaderComponent', styles)(withBgByRoute(HeaderComponent));
