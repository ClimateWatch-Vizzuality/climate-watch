export const commitmentsData = [
  {
    title: '1. Climate commitments under the Paris Agreement.',
    description:
      'Countries that are Parties to the Paris Agreement are required to outline their post-2020 climate actions, known as Nationally Determined Contributions (NDCs). NDCs embody efforts by each country to reduce national emissions and adapt to the impacts of climate change. Countries are also invited to communicate “mid-century long-term low GHG emissions development strategies” (long-term strategies, or LTS). NDCs and LTS are central to achieving the Paris Agreement’s goal of limiting global warming to well below 2°C and pursuing efforts to limit the increase to 1.5°C.',
    hint:
      'See how many countries have submitted certain types of commitments and explore the details by clicking on each box.',
    color: '#FF6C2F',
    questions: [
      {
        questionText: 'How many Parties ratified the Paris Agreement?',
        link:
          'https://unfccc.int/process/the-paris-agreement/status-of-ratification',
        slug: 'pa_ratified',
        answerLabel: 'Yes'
      },
      {
        questionText:
          'How many Parties submitted first Nationally Determined Contributions?',
        link: 'https://www4.unfccc.int/sites/NDCStaging/Pages/All.aspx',
        slug: 'submission',
        answerLabel: 'First NDC Submitted'
      },
      {
        questionText: 'How many Parties have submitted Long-term strategies?',
        link: '/lts-tracker',
        slug: 'lts_submission',
        answerLabel: 'Long-term Strategy Submitted'
      }
    ]
  },
  {
    title: '2. Increasing ambition of climate commitments.',
    description:
      'Under the Paris Agreement, Parties are requested to submit new or updated NDCs every five years, starting in 2020. The Paris Agreement is built on the idea of increasing ambition of NDCs to meet its temperature goals.',
    hint:
      'See how many countries have submitted certain commitments and explore the details by clicking on each box.',
    color: '#0845CB',
    questions: [
      {
        questionText:
          'How many Parties intend to enhance ambition or action in their NDCs?',
        link: '/ndc-tracker',
        slug: 'ndce_status_2020',
        linkSlug: 'enhance_2020',
        answerLabel: 'Intends to Enhance Ambition or Action in 2020 NDC'
      },
      {
        questionText:
          'How many Parties have submitted an updated or second NDC?',
        link: '/ndc-tracker',
        slug: 'ndce_status_2020',
        linkSlug: 'submitted_2020',
        answerLabel: '2020 NDC Submitted'
      }
    ]
  },
  {
    title: '3. Other climate commitments.',
    description:
      'Aside from commitments made through NDCs and LTS, some countries also have net-zero emission targets. Many have also enacted national climate policies and laws, which incorporate either economy-wide and/or sectoral targets. While these targets are not explicitly for the Paris Agreement, they indicate countries’ commitment to climate action and may align with commitments under the Paris Agreement.',
    hint:
      'See how many countries have submitted additional commitments and explore the details by clicking on each box.',
    color: '#2EC9DF',
    questions: [
      {
        questionText: 'How many countries have a net zero emission target?',
        link: 'https://eciu.net/netzerotracker'
      },
      {
        questionText:
          'How many countries have an economy-wide target in a national law or policy?',
        link: 'https://climate-laws.org/'
      }
    ]
  }
];
