const sampleCards = [
  {
    title: {
      name: 'Action Programme on Climate Protection 2020',
      url: 'google.com'
    },
    content: [
      {
        title: 'Targets Type',
        description: 'Trajectory target'
      },
      {
        title: 'Targets',
        subtitle: 'Renewable Energy',
        description: '40% cut in GHG emissions in 2050'
      }
    ]
  },
  {
    title: {
      name:
        'Energy Concept for an Environmentally Sound, Reliable and Affordable Energy Supply',
      url: 'google.com'
    },
    content: [
      {
        title: 'Targets type',
        description: 'Trajectory target'
      },
      {
        title: 'Targets',
        subtitle: 'Renewable Energy',
        description:
          '18% final energy from renewables, then 30%, 45%, 60% in 2020...'
      }
    ]
  },
  {
    title: { name: 'Energy supply', url: 'google.com' },
    content: [
      {
        title: 'Targets type',
        description: 'Trajectory target'
      },
      {
        title: 'Targets',
        subtitle: 'Renewable Energy',
        description:
          '18% final energy from renewables, then 30%, 45%, 60% in 2020...'
      }
    ]
  }
];

const CARDS_IN_ROW = 2;

const getSampleCards = () => sampleCards;

export const getCards = match =>
  // TODO: get cards according to ISO
  // const iso = match && match.params && match.params.iso;

  getSampleCards()
;

export const getCardsInRow = () => CARDS_IN_ROW;
