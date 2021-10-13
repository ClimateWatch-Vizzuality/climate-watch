import arcOfAmbitionImage1 from 'assets/home/arc-of-ambition-1.png';
import arcOfAmbitionImage2 from 'assets/home/arc-of-ambition-2.png';
import arcOfAmbitionImage3 from 'assets/home/arc-of-ambition-3.png';
import arcOfAmbitionImage4 from 'assets/home/arc-of-ambition-4.png';
import arcOfAmbitionImage5 from 'assets/home/arc-of-ambition-5.png';

export const slidesData = [
  {
    pagingTitle: 'Arc of Ambition',
    title: 'Arc of Ambition',
    text: [
      'The Paris Agreement is a legally binding international treaty on Climate Change. It was adopted by 196 Parties at COP 21 in Paris, December 2015, and entered into force on 4 November 2016. It’s goal is to limit global warming to well below 2, preferably to 1.5 degrees Celsius, compared to preindustrial levels.'
    ],
    smImage: arcOfAmbitionImage1,
    bgImage: arcOfAmbitionImage1,
    altText: 'Arc of Ambition',
    buttons: [
      {
        text: 'NDC Enhancement Tracker',
        link: '/2020-ndc-tracker',
        variant: 'primary',
        type: 'button'
      },
      {
        text: 'Greenhouse Gas Emissions',
        link: '/ghg',
        variant: 'primary',
        type: 'button'
      }
    ]
  },
  {
    pagingTitle: 'NDCs',
    title: 'Nationally Determined Contributions (NDCs)',
    text: [
      'The Paris Agreement works on a 5-year cycle of increasingly ambitious climate action carried out by countries. In every cycle, countries submit their Nationally Determined Contributions (NDCs), communicating the actions they will take to reduce their Greenhouse Gas emissions in order to reach the goals of the Paris Agreement.'
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
        text: 'Greenhouse Gas Emissions',
        link: '/ghg',
        variant: 'primary',
        type: 'button'
      }
    ],
    smImage: arcOfAmbitionImage2,
    bgImage: arcOfAmbitionImage2,
    altText: 'Nationally Determined Contributions (NDCs)'
  },
  {
    pagingTitle: 'LTS',
    title: 'Long-Term Strategies (LTS)',
    text: [
      'To better frame the efforts towards the long-term goal, the Paris Agreement invites countries to formulate and submit by 2020 long-term low greenhouse gas emission development strategies (LT-LEDS).'
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
      'In addition to NDCs and LTS, countries are encouraged to adopt a Net-Zero target by mid century.'
    ],
    buttons: [
      {
        text: 'Net-Zero Tracker',
        link: '/net-zero-tracker',
        variant: 'primary',
        type: 'button'
      },
      {
        text: 'NDCs Explorer',
        link: '/ndcs-explore',
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
      'Human-caused greenhouse gas (GHG) emissions drive climate change. About 60% of GHG emissions come from just 10 countries, while the 100 least-emitting contributed less than 3%.'
    ],
    buttons: [
      {
        text: 'Historic GHG Emissions',
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
