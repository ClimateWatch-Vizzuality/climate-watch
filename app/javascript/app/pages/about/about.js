import { withProps } from 'recompose';

import ndcImage from 'assets/partners/ndcp.png';
import wriImage from 'assets/partners/wri.png';
import climateAnalyticsImage from 'assets/partners/climate-analytics.png';
import climateActionTrackerImage from 'assets/partners/climate-action-tracker.png';
import worldBankImage from 'assets/partners/the-world-bank.png';
import ccImage from 'assets/partners/cc.png';
import gizImage from 'assets/partners/giz.png';
import googleImage from 'assets/partners/google.png';
import jgcriImage from 'assets/partners/jgcri.png';
import fmencbnsImage from 'assets/partners/fmencbns.png';
import dbeisImage from 'assets/partners/dbeis.png';
import swissImage from 'assets/partners/swiss.png';

import Component from './about-component';

const jointInitiative = {
  id: 'joint-initiative',
  title: 'Climate Watch is a joint initiative of',
  partners: [
    {
      link: 'http://www.ndcpartnership.org/',
      img: {
        alt: 'NDC Partnership',
        src: ndcImage
      }
    },
    {
      link: 'http://www.wri.org/',
      img: {
        alt: 'WRI',
        src: wriImage
      }
    }
  ]
};

const partnershipWith = {
  id: 'partnership-with',
  title: 'In partnership with',
  partners: [
    {
      link: 'http://climateanalytics.org/',
      img: {
        alt: 'Climate analytics',
        src: climateAnalyticsImage
      }
    },
    {
      link: 'http://climateactiontracker.org/',
      img: {
        alt: 'Climate action',
        src: climateActionTrackerImage
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
      link: '#',
      img: {
        alt: 'CC',
        src: ccImage
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
      link: 'https://www.google.es',
      img: {
        alt: 'Google',
        src: googleImage
      }
    },
    {
      link: 'http://www.globalchange.umd.edu/',
      img: {
        alt: 'JGCRI',
        src: jgcriImage
      }
    }
  ]
};

const additionalData = {
  id: 'additional-data',
  title: 'Additional data provided by',
  partners: [
    {
      link: 'http://energyinnovation.org/',
      text: 'Energy innnovation'
    },
    {
      link: 'http://www.cprindia.org/',
      text: 'CPR India'
    },
    {
      link: 'https://www.ucc.ie',
      text: 'UCC Ireland'
    },
    {
      link: 'http://www.psi.org/',
      text: 'PSI'
    },
    {
      link: 'https://www.eia.gov/',
      text: 'US EIA'
    },
    {
      link: 'https://www.ulisboa.pt/en',
      text: 'University of Lisbon'
    }
  ]
};

const foundingBy = {
  id: 'founding-by',
  title: 'Funding provided by',
  partners: [
    {
      link: 'http://www.bmub.bund.de/en/',
      img: {
        alt: 'FMENCBNS',
        src: fmencbnsImage
      }
    },
    {
      link:
        'https://www.gov.uk/government/organisations/department-for-business-energy-and-industrial-strategy',
      img: {
        alt: 'DBEIS',
        src: dbeisImage
      }
    },
    {
      link: 'https://www.google.es',
      img: {
        alt: 'Google',
        src: googleImage
      }
    },
    {
      link: 'https://www.bafu.admin.ch/bafu/en/home.html',
      img: {
        alt: 'SWISS',
        src: swissImage
      }
    }
  ]
};

const withSections = withProps(() => ({
  sections: [jointInitiative, partnershipWith, additionalData, foundingBy]
}));

export default withSections(Component);
