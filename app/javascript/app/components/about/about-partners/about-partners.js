import { withProps } from 'recompose';

import ndcImage from 'assets/partners/ndcp.png';
import wriImage from 'assets/partners/wri.png';
import climateAnalyticsImage from 'assets/partners/climate-analytics.png';
import climateActionTrackerImage from 'assets/partners/climate-action-tracker.png';
import worldBankImage from 'assets/partners/the-world-bank.png';
import vizzualityImage from 'assets/partners/vizzuality.png';
import ccImage from 'assets/partners/unfccc.jpg';
import gizImage from 'assets/partners/giz.png';
import googleImage from 'assets/partners/google.png';
import fmencbnsImage from 'assets/partners/fmencbns.png';
import dbeisImage from 'assets/partners/dbeis.png';
import swissImage from 'assets/partners/swiss.png';
import actsImage from 'assets/partners/acts.png';
import dieImage from 'assets/partners/die.jpg';
import seiImage from 'assets/partners/sei.png';

import Component from './about-partners-component';

const partnershipWith = {
  id: 'partnership-with',
  title:
    'Climate Watch is implemented by World Resources Institute in collaboration with',
  partners: [
    {
      link: 'http://www.acts-net.org/',
      img: {
        alt: 'African Center for Technology Studies',
        src: actsImage
      }
    },
    {
      link: 'http://climateactiontracker.org/',
      img: {
        alt: 'Climate action',
        src: climateActionTrackerImage
      },
      description:
        'joined the Climate Watch development team and provided support in developing concepts for the scope and functions of Climate Watch.'
    },
    {
      link: 'http://climateanalytics.org/',
      img: {
        alt: 'Climate analytics',
        src: climateAnalyticsImage
      },
      description:
        'joined the Climate Watch development team and provided support in developing concepts for the scope and functions of Climate Watch.'
    },
    {
      link: 'https://www.giz.de/en/html/index.html',
      img: {
        alt: 'Giz',
        src: gizImage
      },
      description:
        'joined the Climate Watch development team and provided support in developing concepts for the scope and functions of Climate Watch.'
    },
    {
      link: 'https://www.die-gdi.de',
      img: {
        alt: 'German Development Institute',
        src: dieImage
      }
    },
    {
      link: 'https://www.google.com/intl/en/about/',
      img: {
        alt: 'Google',
        src: googleImage
      },
      description:
        'Google provided support in developing concepts and functions for the Emission Pathways module.'
    },
    {
      link: 'http://www.ndcpartnership.org/',
      img: {
        alt: 'NDC Partnership',
        src: ndcImage
      },
      description:
        'Climate Watch is a flagship initiative of the NDC Partnership.'
    },
    {
      link: 'https://www.sei-international.org/',
      img: {
        alt: 'Stockholm Environment Institute',
        src: seiImage
      }
    },
    {
      link: 'http://newsroom.unfccc.int/',
      img: {
        alt: 'UNFCCC',
        src: ccImage
      },
      description:
        'as a part of the NDC partnership, the United Nations Framework Convention on Climate Change (UNFCCC) provided support in developing the Climate Watch initiative, as well as provided the GHG historical emissions data as reported by Parties.' // eslint-disable-line
    },
    {
      link: 'http://www.worldbank.org/',
      img: {
        alt: 'The world bank',
        src: worldBankImage
      },
      description:
        'joined the Climate Watch development team and provided support in developing concepts for the scope and functions of Climate Watch, as well as provided the NDC-related data for the NDC Content module.' // eslint-disable-line
    },
    {
      link: 'http://www.wri.org/',
      img: {
        alt: 'WRI',
        src: wriImage
      },
      description: 'WRI manages Climate Watch in collaboration with partners.'
    }
  ]
};

const techPartnership = {
  id: 'tech-partnership',
  title: 'Technical partner',
  type: 'onlyLinks',
  partners: [
    {
      link: 'http://www.vizzuality.com/',
      img: {
        alt: 'Vizzuality',
        src: vizzualityImage
      }
    }
  ]
};

const additionalData = {
  id: 'additional-data',
  title: 'Additional data provided by',
  type: 'onlyLinks',
  partners: [
    {
      link: 'http://www.cprindia.org/',
      alt: 'Center for Policy Research India'
    },
    {
      link: 'https://www.ulisboa.pt/en',
      alt:
        'Department of Sciences and Environmental Engineering - New University of Lisbon'
    },
    {
      link: 'http://energyinnovation.org/',
      alt: 'Energy Innovation: Policy and Technology LLC'
    },
    {
      link: 'http://www.eci.ox.ac.uk/',
      alt: 'Environmental Change Institute - University of Oxford'
    },
    {
      link: 'https://www.ucc.ie',
      alt: 'Environmental Research Institute - University College Cork'
    },
    {
      link: 'http://www.globalchange.umd.edu/',
      alt: 'Joint Global Change Research Institute'
    },
    {
      link: 'http://www.psi.org/',
      alt: 'Paul Scherrer Institute'
    },
    {
      link: 'http://tool.globalcalculator.org/',
      alt: 'The Global Calculator'
    },
    {
      link: 'https://www.eia.gov/',
      alt: 'U.S. Energy Information Administration'
    },
    {
      link:
        'http://unfccc.int/national_reports/non-annex_i_parties/biennial_update_reports/items/9186.php',
      alt: 'UNFCCC – Biennial Reports'
    }
  ]
};

const foundingBy = {
  id: 'founding-by',
  title: 'Generous funding for this initiative is provided by',
  type: 'col4',
  partners: [
    {
      link: 'http://www.bmub.bund.de/en/',
      img: {
        alt: 'FMENCBNS',
        src: fmencbnsImage
      },
      description:
        'This initiative is a part of the International Climate Initiative (IKI).'
    },
    {
      link: 'https://www.google.com/intl/en/about/',
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
    },
    {
      link:
        'https://www.gov.uk/government/organisations/department-for-business-energy-and-industrial-strategy',
      img: {
        alt: 'DBEIS',
        src: dbeisImage
      }
    }
  ]
};

const withSections = withProps(() => ({
  sections: [partnershipWith, techPartnership, additionalData, foundingBy]
}));

export default withSections(Component);
