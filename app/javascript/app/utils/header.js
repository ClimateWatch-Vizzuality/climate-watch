import home from 'assets/headers/home.jpg';
import ndc from 'assets/headers/ndc.jpg';
import ndcSdg from 'assets/headers/ndc-sdg.jpg';
import about from 'assets/headers/about.jpg';
import countries from 'assets/headers/countries.jpg';
import emissions from 'assets/headers/emissions.jpg';
import emissionsPathways from 'assets/headers/emission-pathways.jpg';

const bg = {
  home,
  ndc,
  ndcSdg,
  about,
  countries,
  emissions,
  emissionsPathways
};

export default function getHeaderBg(header) {
  return bg[header] ? bg[header] : bg.home;
}
