export const getDataTourByRoute = route =>
  ({
    'DOWNLOAD & VISUALIZE': 'home-02',
    COMMITMENTS: 'commitments-02'
  }[route]);

export default { getDataTourByRoute };
