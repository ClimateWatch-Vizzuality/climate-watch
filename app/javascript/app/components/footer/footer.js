import { PureComponent, createElement } from 'react';
import { withRouter } from 'react-router';

import PropTypes from 'prop-types';

import googleImage from 'assets/partners/google.png';
import ndcImage from 'assets/partners/ndcp.png';
import wriImage from 'assets/partners/wri.png';
import climateAnalyticsImage from 'assets/partners/climate-analytics.png';
import climateActionTrackerImage from 'assets/partners/climate-action-tracker.png';
import worldBankImage from 'assets/partners/the-world-bank.png';
import ccImage from 'assets/partners/unfccc.jpg';
import gizImage from 'assets/partners/giz.png';
import actsImage from 'assets/partners/acts.png';
import dieImage from 'assets/partners/die.jpg';
import seiImage from 'assets/partners/sei.png';
import lseImage from 'assets/partners/lse-logo.png';

import Component from './footer-component';

const basePartners = [
  {
    link: 'http://climateactiontracker.org/',
    orderingString: 'climateaction',
    img: {
      alt: 'Climate action',
      src: climateActionTrackerImage,
      customClass: 'rectangularL'
    }
  },
  {
    link: 'http://climateanalytics.org/',
    orderingString: 'climateanalytics',
    img: {
      alt: 'Climate analytics',
      src: climateAnalyticsImage,
      customClass: 'narrow'
    }
  },
  {
    link: 'https://www.giz.de/en/html/index.html',
    orderingString: 'deutch-giz',
    img: {
      alt: 'Giz',
      src: gizImage,
      customClass: 'narrower'
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
      customClass: 'narrower'
    }
  },
  {
    link: 'http://www.worldbank.org/',
    orderingString: 'worldbank',
    img: {
      alt: 'The World Bank',
      src: worldBankImage,
      customClass: 'narrower'
    }
  },
  {
    link: 'http://www.wri.org/',
    orderingString: 'worldresources',
    img: {
      alt: 'WRI',
      src: wriImage,
      customClass: 'narrower'
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
      customClass: 'rectangularXl'
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
      customClass: 'narrower'
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

const countryOnlyPartners = [
  {
    link: 'http://www.lse.ac.uk/GranthamInstitute',
    orderingString: 'lse',
    img: {
      alt: 'London School of Economics & Grantham Research Institute',
      src: lseImage,
      customClass: 'rectangularXxl'
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
  if (pathname.includes('/ndcs')) {
    return 'ndcs';
  }
  if (pathname.includes('/countries')) {
    return 'countries';
  }
  if (pathname.includes('/pathways')) return 'pathways';
  return 'default';
};

const getLogos = pathname => {
  const path = parsedPath(pathname);
  switch (path) {
    case 'ghg & ndcs-sdg':
      return [...basePartners];
    case 'ndcs':
      return [...basePartners, ...ndcPartners].sort(alphabetically);
    case 'countries':
      return [...basePartners, ...ndcPartners, ...countryOnlyPartners].sort(
        alphabetically
      );
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
