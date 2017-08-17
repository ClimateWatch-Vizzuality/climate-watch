const countrySelectFilter = (query, state) => ({ ...state, query });

export default {
  countrySelectFilter: (state, { payload }) =>
    countrySelectFilter(payload, state)
};
