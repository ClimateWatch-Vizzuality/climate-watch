export default {
  creatorIsOpen: false,
  title: '',
  datasets: {
    name: 'datasets',
    selected: null,
    data: [],
    loading: false,
    loaded: false,
    child: {
      name: 'visualisations',
      selected: null,
      data: [],
      loading: false,
      loaded: false,
      child: {
        name: 'locations',
        selected: null,
        data: [],
        loading: false,
        loaded: false,
        child: {
          name: 'models',
          selected: null,
          data: [],
          loading: false,
          loaded: false,
          child: {
            name: 'scenarios',
            selected: null,
            data: [],
            loading: false,
            loaded: false,
            child: {
              name: 'categories',
              selected: null,
              data: [],
              loading: false,
              loaded: false,
              child: {
                name: 'subcategories',
                selected: null,
                data: [],
                loading: false,
                loaded: false,
                child: {
                  name: 'indicators',
                  selected: null,
                  data: [],
                  loading: false,
                  loaded: false,
                  child: {
                    name: 'timeseries',
                    selected: null,
                    data: [],
                    loading: false,
                    loaded: false
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
