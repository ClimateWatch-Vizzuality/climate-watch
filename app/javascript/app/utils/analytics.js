import ReactGA from 'react-ga';
import { DATA_EXPLORER_SECTIONS } from 'data/data-explorer-constants';

export const handleAnalytics = (category, action, label) => {
  ReactGA.event({ category, action, label });
};

export const getUrlSection = url => {
  const match = url.split('/')[4].replace('_', '-');
  return Object.keys(DATA_EXPLORER_SECTIONS).includes(match)
    ? match
    : 'Download all data';
};

export default {
  handleAnalytics,
  getUrlSection
};
