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
    img: {
      alt: 'Climate action',
      src: climateActionTrackerImage,
      customClass: 'rectangular'
    }
  },
  {
    link: 'http://climateanalytics.org/',
    img: {
      alt: 'Climate analytics',
      src: climateAnalyticsImage,
      customClass: 'narrow'
    }
  },
  {
    link: 'https://www.giz.de/en/html/index.html',
    img: {
      alt: 'Giz',
      src: gizImage
    }
  },
  {
    link: 'http://www.ndcpartnership.org/',
    img: {
      alt: 'NDC Partnership',
      src: ndcImage,
      customClass: 'narrow'
    }
  },
  {
    link: 'http://newsroom.unfccc.int/',
    img: {
      alt: 'UNFCCC',
      src: ccImage,
      customClass: 'rectangular'
    }
  },
  {
    link: 'http://www.worldbank.org/',
    img: {
      alt: 'The world bank',
      src: worldBankImage
    }
  },
  {
    link: 'http://www.wri.org/',
    img: {
      alt: 'WRI',
      src: wriImage
    }
  }
];

const ndcPartners = [
  {
    link: 'http://www.acts-net.org/',
    img: {
      alt: 'African Center for Technology Studies',
      src: actsImage,
      customClass: 'rectangular'
    }
  },
  {
    link: 'https://www.sei-international.org/',
    img: {
      alt: 'Stockholm Environment Institute',
      src: seiImage,
      customClass: 'narrower'
    }
  },
  {
    link: 'https://www.die-gdi.de',
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
    img: {
      alt: 'Google',
      src: googleImage,
      customClass: 'narrow'
    }
  }
];

const getLogos = pathname => {
  const parsedPath = pathname.includes('/countries') ? '/countries' : pathname;
  switch (parsedPath) {
    case '/ghg-emissions':
    case '/ndcs-sdg':
      return [...basePartners];
    case '/ndcs':
    case '/countries':
      return [...basePartners, ...ndcPartners];
    case '/emission-pathways':
      return [...basePartners, ...espPartners];
    default:
      return [...basePartners, ...ndcPartners, ...espPartners];
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
