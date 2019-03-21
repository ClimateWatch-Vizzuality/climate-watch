import countryBgImage from 'assets/home/CW_homemockups_country_profile@2x';
import ndcsBgImage from 'assets/home/CW_homemockups_NDC@2x';
import ndcsdgBgImage from 'assets/home/CW_homemockups_NDC_SDG@2x';
import ghgBgImage from 'assets/home/CW_homemockups_GHG@2x';
import pathwaysBgImage from 'assets/home/CW_homemockups_pathways@2x';
import dataExplorerBgImage from 'assets/home/CW_homemockups_dataexplorer@2x';

export const slidesData = [
  {
    pagingTitle: 'Country profiles',
    title: 'Country profiles',
    text: [
      'Gain insights by country on historical and target emissions, national climate commitments, climate vulnerability and readiness, and linkages between climate and sustainable development goals.'
    ],
    buttons: [
      {
        text: 'Explore your country',
        link: '/countries',
        color: 'yellow',
        type: 'geolocator'
      },
      { text: 'Select another country', type: 'dropdown' }
    ],
    smImage: countryBgImage,
    bgImage: countryBgImage,
    altText: 'Climate goals chart'
  },
  {
    pagingTitle: 'NDCs',
    title: 'Nationally Determined Contributions',
    text: [
      'Nationally determined contributions (NDCs) are countries’ commitments under the Paris Agreement to reduce emissions and adapt to the impacts of climate change. To date, 192 countries submitted NDCs, covering 96% of global greenhouse gas emissions.',
      'Explore NDCs by searching for key terms, and analyze and compare them using over 150 structured indicators.'
    ],
    buttons: [
      {
        text: 'Search NDCs',
        link: '/ndcs-content',
        color: 'yellow',
        type: 'button'
      },
      {
        text: 'Compare NDCs',
        link: '/ndcs/compare',
        color: 'white',
        type: 'button'
      }
    ],
    smImage: ndcsBgImage,
    bgImage: ndcsBgImage,
    altText: 'Climate goals chart'
  },
  {
    pagingTitle: 'NDC-SDG Linkages',
    title: 'Climate and Sustainable Development Linkages',
    text: [
      'Achieving the goals in the Paris Agreement and the Sustainable Development Goals (SDGs) requires an integrated approach. Our research shows that climate actions in NDCs align with at least 154 of the 169 targets of the SDGs, demonstrating the enormous potential for this integration.',
      'Explore alignments between between countries’ NDCs and the sustainable development goals.'
    ],
    buttons: [
      {
        text: 'Discover NDC-SDG linkages',
        link: '/ndcs-sdg',
        color: 'yellow',
        type: 'button'
      }
    ],
    smImage: ndcsdgBgImage,
    bgImage: ndcsdgBgImage,
    altText: 'Climate goals chart'
  },
  {
    pagingTitle: 'Historical GHG Emissions',
    title: 'Greenhouse Gas Emissions',
    text: [
      'Sixty percent of global greenhouse gas (GHG) emissions in 2014 came from just 10 countries, while the 100 least-emitting countries contributed less than 3 percent.',
      'Visualize and download over 160 years of data on the GHG emissions of 196 countries and the EU.'
    ],
    buttons: [
      {
        text: 'Explore emissions',
        link: '/ghg-emissions',
        color: 'yellow',
        type: 'button'
      }
    ],
    smImage: ghgBgImage,
    bgImage: ghgBgImage,
    altText: 'Climate goals chart'
  },
  {
    pagingTitle: 'Pathways',
    title: 'Decarbonization Pathways',
    text: [
      'Where are global emissions and global temperatures headed? That all depends on the paths we take.',
      'Draw insights into the potential emissions and economic pathways of countries, regions and sectors by exploring 30 scenarios developed by modeling teams from around the world.'
    ],
    buttons: [
      {
        text: 'Explore pathways',
        link: '/pathways',
        color: 'yellow',
        type: 'button'
      }
    ],
    smImage: pathwaysBgImage,
    bgImage: pathwaysBgImage,
    altText: 'Emission pathways'
  },
  {
    pagingTitle: 'Data Explorer',
    title: 'Data Explorer',
    text: [
      'Dive deep into the raw data of Climate Watch. Explore, filter and download all of our open data for your own use.'
    ],
    buttons: [
      {
        text: 'Download and Explore Data',
        link: '/data-explorer',
        color: 'yellow',
        type: 'button'
      }
    ],
    smImage: dataExplorerBgImage,
    bgImage: dataExplorerBgImage,
    altText: 'Data Explorer'
  }
];
