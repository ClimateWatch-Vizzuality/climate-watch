import { PureComponent, createElement } from 'react';
import { withRouter } from 'react-router';

import PropTypes from 'prop-types';

import googleImage from 'assets/partners/google.png';
import ndcImage from 'assets/partners/ndcp.png';
import wriImage from 'assets/partners/wri_simple.png';
import climateAnalyticsImage from 'assets/partners/climate-analytics.png';
import climateActionTrackerImage from 'assets/partners/climate-action-tracker.png';
import worldBankImage from 'assets/partners/the-world-bank_simple.png';
import ccImage from 'assets/partners/unfccc_simple.jpg';
import gizImage from 'assets/partners/giz_simple.png';
import actsImage from 'assets/partners/acts_simple.png';
import dieImage from 'assets/partners/die_simple.jpg';
import seiImage from 'assets/partners/sei.png';

import Component from './footer-component';

const basePartners = [
  {
    link: 'http://climateactiontracker.org/',
    orderingString: 'action',
    img: {
      alt: 'Climate action',
      src: climateActionTrackerImage,
      customClass: 'rectangular'
    }
  },
  {
    link: 'http://climateanalytics.org/',
    orderingString: 'analytics',
    img: {
      alt: 'Climate analytics',
      src: climateAnalyticsImage,
      customClass: 'narrow'
    }
  },
  {
    link: 'https://www.giz.de/en/html/index.html',
    orderingString: 'giz',
    img: {
      alt: 'Giz',
      src: gizImage
    }
  },
  {
    link: 'http://www.ndcpartnership.org/',
    orderingString: 'ndc',
    img: {
      alt: 'NDC Partnership',
      src: ndcImage,
      customClass: 'narrow'
    }
  },
  {
    link: 'http://newsroom.unfccc.int/',
    orderingString: 'unfcc',
    img: {
      alt: 'UNFCCC',
      src: ccImage,
      customClass: 'rectangular'
    }
  },
  {
    link: 'http://www.worldbank.org/',
    orderingString: 'worldbank',
    img: {
      alt: 'The world bank',
      src: worldBankImage
    }
  },
  {
    link: 'http://www.wri.org/',
    orderingString: 'worldresources',
    img: {
      alt: 'WRI',
      src: wriImage
    }
  }
];

const ndcPartners = [
  {
    link: 'http://www.acts-net.org/',
    orderingString: 'acts',
    img: {
      alt: 'African Center for Technology Studies',
      src: actsImage,
      customClass: 'rectangular'
    }
  },
  {
    link: 'https://www.sei-international.org/',
    orderingString: 'sei',
    img: {
      alt: 'Stockholm Environment Institute',
      src: seiImage,
      customClass: 'narrower'
    }
  },
  {
    link: 'https://www.die-gdi.de',
    orderingString: 'gdi',
    img: {
      alt: 'German Development Institute',
      src: dieImage,
      customClass: 'rectangular'
    }
  }
];

const espPartners = [
  {
    link: 'https://www.google.com/intl/en/about/',
    orderingString: 'google',
    img: {
      alt: 'Google',
      src: googleImage,
      customClass: 'narrow'
    }
  }
];

const alphabetically = (a, b) => {
  if (a.orderingString < b.orderingString) return -1;
  if (a.orderingString > b.orderingString) return 1;
  return 0;
};

const parsedPath = pathname => {
  if (pathname === '/ghg-emissions' || pathname === '/ndcs-sdg') {
    return 'ghg & ndcs-sdg';
  }
  if (pathname.includes('/countries') || pathname.includes('/ndcs')) {
    return 'countries & ndcs';
  }
  if (pathname.includes('/pathways')) return 'pathways';
  return 'default';
};

const getLogos = pathname => {
  const path = parsedPath(pathname);
  switch (path) {
    case 'ghg & ndcs-sdg':
      return [...basePartners];
    case 'countries & ndcs':
      return [...basePartners, ...ndcPartners].sort(alphabetically);
    case 'pathways':
      return [...basePartners, ...espPartners].sort(alphabetically);
    default:
      return [...basePartners, ...ndcPartners, ...espPartners].sort(
        alphabetically
      );
  }
};

class FooterContainer extends PureComponent {
  render() {
    const partners = getLogos(this.props.location.pathname);
    const includePartners = !location.pathname.includes('/about');
    return createElement(Component, {
      ...this.props,
      partners,
      includePartners
    });
  }
}

FooterContainer.propTypes = {
  location: PropTypes.object
};

export default withRouter(FooterContainer);
