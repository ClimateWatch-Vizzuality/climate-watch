import { feature } from 'topojson-client';

export const initialState = {
  loading: false,
  loaded: false,
  data: []
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });
const parseCountryesTopo = data =>
  data.map(country => {
    const { topojson } = country;
    if (topojson) {
      const parsedTopo = feature(
        topojson,
        topojson.objects[Object.keys(topojson.objects)[0]]
      );
      return {
        ...country,
        topojson: {
          ...parsedTopo,
          id: country.iso_code3
        }
      };
    }
    return country;
  });

export default {
  getCountriesInit: state => setLoading(true, state),
  getCountriesReady: (state, { payload }) =>
    setLoaded(
      true,
      setLoading(false, { ...state, data: parseCountryesTopo(payload) })
    )
};
