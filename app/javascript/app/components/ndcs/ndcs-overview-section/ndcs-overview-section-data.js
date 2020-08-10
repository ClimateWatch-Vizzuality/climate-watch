/* eslint-disable max-len */
export const commitmentsData = [
  {
    title: 'Climate commitments under the Paris Agreement',
    description:
      'Countries that are Parties to the Paris Agreement are required to outline their post-2020 climate actions, known as Nationally Determined Contributions (NDCs). NDCs embody efforts by each country to reduce national emissions and adapt to the impacts of climate change. Countries are also invited to communicate “mid-century long-term low GHG emissions development strategies” (long-term strategies, or LTS). NDCs and LTS are central to achieving the Paris Agreement’s goal of limiting global warming to well below 2°C and pursuing efforts to limit the increase to 1.5°C.',
    hint:
      'See how many countries have submitted certain types of commitments and explore the details by clicking on each box.',
    color: '#FF6C2F',
    questions: [
      {
        questionText: 'How many Parties ratified the Paris Agreement?',
        link: '/ndcs-explore?indicator=pa_status',
        slug: 'pa_ratified',
        metadataSlug: 'ndc_cw',
        answerLabel: 'Yes'
      },
      {
        questionText:
          'How many Parties submitted first Nationally Determined Contributions?',
        link: '/ndcs-explore?indicator=submission',
        metadataSlug: 'ndc_cw',
        source: 'countriesDocuments',
        answerLabel: 'first_ndc'
      },
      {
        questionText: 'How many Parties submitted Long-Term Strategies?',
        link: '/lts-explore?indicator=lts_submission ',
        slug: 'lts_submission',
        metadataSlug: 'ndc_lts',
        answerLabel: 'Long-term Strategy Submitted'
      }
    ]
  },
  {
    title: 'Increasing ambition of climate commitments',
    description:
      'Under the Paris Agreement, Parties are requested to submit new or updated NDCs every five years, starting in 2020. The Paris Agreement is built on the idea of increasing ambition of NDCs to meet its temperature goals.',
    hint:
      'See how many countries have submitted certain commitments and explore the details by clicking on each box.',
    color: '#0845CB',
    questions: [
      {
        questionText:
          'How many Parties intend to enhance ambition or action in their NDCs?',
        link: '/2020-ndc-tracker',
        slug: 'ndce_status_2020',
        metadataSlug: 'ndc_cw',
        answerLabel: 'Intends to Enhance Ambition or Action in 2020 NDC'
      },
      {
        questionText: 'How many Parties submitted an updated or second NDC?',
        link: '/2020-ndc-tracker',
        slug: 'ndce_status_2020',
        metadataSlug: 'ndc_cw',
        answerLabel: '2020 NDC Submitted'
      }
    ]
  },
  {
    title: 'Other climate commitments',
    description:
      'Aside from commitments made through NDCs and LTS, some Parties also have net zero emission targets. Many have also enacted national climate policies and laws, which may incorporate economy-wide and/or sectoral targets. While these commitments are not official submissions to the Paris Agreement, they indicate Parties’ commitment to climate action and may align with commitments under the Paris Agreement.',
    hint:
      'See how many Parties have submitted additional commitments and explore the details by clicking on each box.',
    color: '#2EC9DF',
    questions: [
      {
        questionText: 'How many Parties have a net zero emission target?',
        answerLabel: ['In Policy Document', 'In Law'],
        link: 'https://eciu.net/netzerotracker',
        slug: 'nz_status',
        metadataSlug: 'eciu',
        hasExternalLink: true
      },
      {
        questionText:
          'How many Parties have an economy-wide target in a national law or policy?',
        link: 'https://climate-laws.org/',
        source: 'lse',
        metadataSlug: 'national_laws_politices',
        hasExternalLink: true
      }
    ]
  }
];
