import { withProps } from 'recompose';
import { themr } from 'react-css-themr';
import HeaderComponent from './header-component';
import styles from './header-styles.scss';

const withBgByRoute = withProps(({ route }) => {
  if (!route) return null;
  return {
    gradient: route.headerGradient,
    color: route.headerColor
  };
});

export default themr('HeaderComponent', styles)(withBgByRoute(HeaderComponent));
