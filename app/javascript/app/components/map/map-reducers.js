export const initialState = {
  center: [20, 10],
  zoom: 1
};

const setMapZoom = (state, { payload }) => ({
  ...state,
  zoom: payload
});

const setMapCenter = (state, { payload }) => ({
  ...state,
  center: payload
});

const setMapParams = (state, { payload }) => ({
  ...state,
  zoom: payload.zoom,
  center: payload.center
});

export default {
  setMapZoom,
  setMapCenter,
  setMapParams
};
