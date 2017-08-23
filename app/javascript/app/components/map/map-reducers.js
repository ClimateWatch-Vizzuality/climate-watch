export const initialState = {
  center: [0, 20],
  zoom: 1
};

const setMapZoom = (zoom, state) => ({
  ...state,
  zoom
});

export default {
  setMapZoom: (state, { payload }) => setMapZoom(payload, state)
};
