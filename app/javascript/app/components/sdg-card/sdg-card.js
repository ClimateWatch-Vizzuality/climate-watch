import { withProps } from 'recompose';
import SDGCardComponent from './sdg-card-component';

function importAllImagesFromFolder(r) {
  const images = {};
  const keys = r.keys();
  if (keys.length) {
    keys.forEach(item => {
      images[item.replace('./', '').replace('.svg', '')] = r(item).default;
    });
  }
  return images;
}

const icons = importAllImagesFromFolder(
  require.context('assets/sdg-icons', false, /\.(svg)$/)
);

const withIcons = withProps(() => ({
  icons
}));

export default withIcons(SDGCardComponent);
