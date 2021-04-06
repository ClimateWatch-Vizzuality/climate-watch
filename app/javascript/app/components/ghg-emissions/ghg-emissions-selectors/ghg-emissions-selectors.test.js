import { getData } from './ghg-emissions-selectors-get';

describe('Get selectors', () => {
  const state = { emissions: { data: 1 } };
  it('Gets data', () => {
    expect(getData(state)).toBe(1);
  });
});
