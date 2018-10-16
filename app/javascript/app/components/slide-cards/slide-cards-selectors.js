import { createStructuredSelector } from 'reselect';

const sampleArray = [
  { name: 'orange', description: 'oranges are orange' },
  { name: 'apple', description: 'apples are great' },
  { name: 'strawberry', description: 'strawberries dont grow on trees' },
  { name: 'berry', description: 'chuck berry?' },
  {
    name: 'blueberry',
    description: 'blueberries are my favourite wild forest fruits'
  },
  { name: 'else', description: 'eslse' },
  { name: 'different', description: 'lala' }
];

const CARDS_IN_ROW = 2;
const getCardsAmountInRow = () => CARDS_IN_ROW;

const getArray = () => sampleArray;

export const getCards = createStructuredSelector({
  cards: getArray,
  cardsInRow: getCardsAmountInRow
});
