import { createElement } from 'react';

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
  title: 'Climate Watch is a joint initiative of',
  partners: [
    {
      img: {
        alt: 'NDC Partnership',
        src: ndcImage
      }
    },
    {
      img: {
        alt: 'WRI',
        src: wriImage
      }
    }
  ]
};

const partnershipWith = {
  title: 'In partnership with',
  partners: [
    {
      img: {
        alt: 'Climate analytics',
        src: climateAnalyticsImage
      }
    },
    {
      img: {
        alt: 'Climate action',
        src: climateActionTrackerImage
      }
    },
    {
      img: {
        alt: 'The world bank',
        src: worldBankImage
      }
    },
    {
      img: {
        alt: 'CC',
        src: ccImage
      }
    },
    {
      img: {
        alt: 'Giz',
        src: gizImage
      }
    },
    {
      img: {
        alt: 'Google',
        src: googleImage
      }
    },
    {
      img: {
        alt: 'JGCRI',
        src: jgcriImage
      }
    }
  ]
};

const adicionalData = {
  title: 'Additional data provided by',
  partners: [
    {
      text: 'Energy innnovation'
    },
    {
      text: 'CPR India'
    },
    {
      text: 'UCC Ireland'
    },
    {
      text: 'PSI'
    },
    {
      text: 'US EIA'
    },
    {
      text: 'University of Lisbon'
    }
  ]
};

const foundingBy = {
  title: 'Funding provided by',
  partners: [
    {
      img: {
        alt: 'FMENCBNS',
        src: fmencbnsImage
      }
    },
    {
      img: {
        alt: 'DBEIS',
        src: dbeisImage
      }
    },
    {
      img: {
        alt: 'Google',
        src: googleImage
      }
    },
    {
      img: {
        alt: 'SWISS',
        src: swissImage
      }
    }
  ]
};

const sections = [jointInitiative, partnershipWith, adicionalData, foundingBy];

export default () => createElement(Component, { sections });
