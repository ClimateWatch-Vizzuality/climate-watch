export const getCountry = (countries, iso) =>
  countries.filter(country => country.value === iso)[0];

export default {
  getCountry
};
