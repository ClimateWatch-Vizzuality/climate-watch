import { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router';
import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';
import { renderRoutes } from 'react-router-config';
import './root-styles.scss';

// Do not destructure this
const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID;
const GOOGLE_TAG_MANAGER_ID = process.env.GOOGLE_TAG_MANAGER_ID;

const tagManagerArgs = {
  gtmId: GOOGLE_TAG_MANAGER_ID
};

function trackPage(page) {
  ReactGA.set({ page });
  ReactGA.pageview(page);
}

let gaInitialized = false;
let gtmInitialized = false;

function handleTrack(location, prevLocation) {
  if (GOOGLE_ANALYTICS_ID) {
    if (!gaInitialized) {
      TagManager.initialize(tagManagerArgs);
      ReactGA.initialize(GOOGLE_ANALYTICS_ID);
      gaInitialized = true;
    }
    if (!prevLocation) {
      trackPage(location.pathname);
    } else {
      const page = location.pathname;
      const prevPage = prevLocation.pathname;

      if (page !== prevPage) {
        trackPage(page);
      }
    }
  }

  if (GOOGLE_TAG_MANAGER_ID && !gtmInitialized) {
    TagManager.initialize(tagManagerArgs);
    gtmInitialized = true;
  }
}

class Root extends PureComponent {
  componentDidMount() {
    handleTrack(this.props.location);
  }

  componentDidUpdate(prevProps) {
    handleTrack(this.props.location, prevProps.location);
  }

  render() {
    return renderRoutes(this.props.route.routes);
  }
}

Root.propTypes = {
  location: Proptypes.object.isRequired,
  route: Proptypes.object
};

export default withRouter(Root);
