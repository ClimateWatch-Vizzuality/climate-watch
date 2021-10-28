import arcOfAmbitionImage1 from 'assets/home/arc-of-ambition-1.png';
import arcOfAmbitionImage2 from 'assets/home/arc-of-ambition-2.png';
import arcOfAmbitionImage3 from 'assets/home/arc-of-ambition-3.png';
import arcOfAmbitionImage4 from 'assets/home/arc-of-ambition-4.png';
import arcOfAmbitionImage5 from 'assets/home/arc-of-ambition-5.png';

export const slidesData = [
  {
    pagingTitle: 'The Paris Climate Agreement',
    title: 'The Paris Climate Agreement',
    text: [
      'The Paris Agreement is a legally binding international treaty on climate change. It was adopted by 196 Parties at COP21 in Paris, December 2015, and entered into force on 4 November 2016. Its goal is to limit global warming to well below 2, preferably to 1.5 degrees Celsius, compared to preindustrial levels.',
      'Explore overviews of key commitments by countries related to the Paris Agreement: '
    ],
    smImage: arcOfAmbitionImage1,
    bgImage: arcOfAmbitionImage1,
    altText: 'Arc of Ambition',
    buttons: [
      {
        text: 'Overview of commitments',
        link: '/ndc-overview',
        variant: 'primary',
        type: 'button'
      },
      {
        text: 'NDC Enhancement Tracker',
        link: '/2020-ndc-tracker',
        variant: 'primary',
        type: 'button'
      },
      {
        text: 'Historical greenhouse emissions',
        link: '/ghg',
        variant: 'primary',
        type: 'button'
      }
    ]
  },
  {
    pagingTitle: 'Nationally Determined Contributions',
    title: 'Nationally Determined Contributions (NDCs)',
    text: [
      'The Paris Agreement requires countries to submit more ambitious climate commitments every five years. In every five-year cycle, countries submit documents called Nationally Determined Contributions (NDCs). These documents communicate the targets and actions they will take to reduce their greenhouse gas emissions and increase resilience to the impacts of climate change, typically within the next 10 years.',
      'Explore and compare the content of countries’ NDCs and track future submissions: '
    ],
    buttons: [
      {
        text: 'NDCs Explorer',
        link: '/ndcs-explore',
        variant: 'primary',
        type: 'button'
      },
      {
        text: 'NDC Enhancement Tracker',
        link: '/2020-ndc-tracker',
        variant: 'primary',
        type: 'button'
      },
      {
        text: 'NDC-SDG Linkages',
        link: '/ndcs-sdg',
        variant: 'primary',
        type: 'button'
      }
    ],
    smImage: arcOfAmbitionImage2,
    bgImage: arcOfAmbitionImage2,
    altText: 'Nationally Determined Contributions (NDCs)'
  },
  {
    pagingTitle: 'Long-term Strategies',
    title: 'Long-Term Strategies (LTS)',
    text: [
      'The Paris Agreement invites countries to submit long-term low greenhouse gas emissions development strategies (LTS). These documents typically target the mid-century (2050) timeframe, presenting long-term targets and pathways for achieving them.',
      'Explore the content of LTS and compare them with NDCs: '
    ],
    buttons: [
      {
        text: 'Explore LTS',
        link: '/lts-explore',
        variant: 'primary',
        type: 'button'
      },
      {
        text: 'Compare All targets',
        link: '/compare-all-targets',
        variant: 'primary',
        type: 'button'
      }
    ],
    smImage: arcOfAmbitionImage3,
    bgImage: arcOfAmbitionImage3,
    altText: 'Long-Term Strategies (LTS)'
  },
  {
    pagingTitle: 'Net-Zero Targets',
    title: 'Net-Zero Targets',
    text: [
      'To achieve the goal of the Paris Agreement, emissions must reach net-zero early in the second half of the century. A growing number of Parties to the Paris Agreement are adopting net-zero emissions targets in line with this goal.',
      'Explore countries’ net-zero targets: '
    ],
    buttons: [
      {
        text: 'Net-Zero Tracker',
        link: '/net-zero-tracker',
        variant: 'primary',
        type: 'button'
      },
      {
        text: 'Compare All Targets',
        link: '/compare-all-targets',
        variant: 'primary',
        type: 'button'
      }
    ],
    smImage: arcOfAmbitionImage4,
    bgImage: arcOfAmbitionImage4,
    altText: 'Net-Zero Targets'
  },
  {
    pagingTitle: 'GHG Emissions',
    title: 'Historic Greenhouse Gas Emissions',
    text: [
      'Human-caused greenhouse gas (GHG) emissions drive climate change. Understanding historical trends and sources of emissions can inform targeted climate actions.',
      'Visualize and download over 160 years of data on the GHG emissions of 196 countries: '
    ],
    buttons: [
      {
        text: 'Historical GHG Emissions',
        link: '/ghg',
        variant: 'primary',
        type: 'button'
      },
      {
        text: 'Pathways',
        link: '/pathways',
        variant: 'primary',
        type: 'button'
      },
      {
        text: 'Key Visualizations',
        link: '/key-visualization',
        variant: 'primary',
        type: 'button'
      }
    ],
    smImage: arcOfAmbitionImage5,
    bgImage: arcOfAmbitionImage5,
    altText: 'GHG Emissions'
  }
];
