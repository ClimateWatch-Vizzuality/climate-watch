import { withProps } from 'recompose';

import ndcImage from 'assets/partners/ndcp.png';
import wriImage from 'assets/partners/wri.png';

import Component from './initiators-component';

const initiators = [
  {
    link: 'http://www.wri.org/',
    img: {
      alt: 'WRI',
      src: wriImage
    }
  },
  {
    link: 'http://www.ndcpartnership.org/',
    img: {
      alt: 'NDC Partnership',
      src: ndcImage
    }
  }
];

const withSections = withProps(() => ({
  initiators
}));

export default withSections(Component);
