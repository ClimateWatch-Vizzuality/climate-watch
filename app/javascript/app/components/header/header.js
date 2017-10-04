import { withProps } from 'recompose';

import home from 'assets/headers/home.jpg';
import ndc from 'assets/headers/ndc.jpg';
import ndcSdg from 'assets/headers/ndc-sdg.jpg';
import about from 'assets/headers/about.jpg';
import countries from 'assets/headers/countries.jpg';
import emissions from 'assets/headers/emissions.jpg';
import emissionsPathways from 'assets/headers/emission-pathways.jpg';

import HeaderComponent from './header-component';

const bg = {
  home,
  ndc,
  ndcSdg,
  about,
  countries,
  emissions,
  emissionsPathways
};

const withBgByRoute = withProps(({ route }) => {
  if (!route || !route.headerImage) return null;

  return {
    image: bg[route.headerImage] ? bg[route.headerImage] : bg.home
  };
});

export default withBgByRoute(HeaderComponent);
