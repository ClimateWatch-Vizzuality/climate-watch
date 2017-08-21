const setMapZoom = (zoom, state) => ({
  ...state,
  zoom
});

export default {
  setMapZoom: (state, { payload }) => setMapZoom(payload, state)
};
