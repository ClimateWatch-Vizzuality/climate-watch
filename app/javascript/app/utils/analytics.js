import ReactGA from 'react-ga';

export const handleAnalytics = (category, action, label) => {
  ReactGA.event({ category, action, label });
};

export default {
  handleAnalytics
};
