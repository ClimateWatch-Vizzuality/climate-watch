import { createSelector } from 'reselect';

const SUBMISSION_SLUGS = [
  'lts_document',
  'lts_vision',
  'lts_date',
  'lts_target',
  'lts_m_tt',
  'lts_zero',
  'lts_m_sce_yn',
  'lts_m_model'
];

const getIndicators = ({ state }) =>
  state &&
  state.ndcCountryAccordion &&
  state.ndcCountryAccordion.data &&
  state.ndcCountryAccordion.data.indicators;
const getIso = ({ iso }) => iso || null;

export const getCardsData = createSelector(
  [getIndicators, getIso],
  (indicators, iso) => {
    if (!indicators || !indicators.length || !iso) return null;

    const filteredIndicators = indicators.filter(({ slug }) =>
      SUBMISSION_SLUGS.includes(slug)
    );

    const cardData = filteredIndicators.reduce((acc, nextIndicator) => {
      const { slug, name, locations } = nextIndicator;
      return {
        ...acc,
        [slug]: {
          title: name,
          value: locations[iso] && locations[iso][0] && locations[iso][0].value
        }
      };
    }, {});
    return cardData;
  }
);

export default {
  getCardsData
};
