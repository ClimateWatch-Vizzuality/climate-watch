export const getDataTourByRoute = route =>
  ({
    'DOWNLOAD & VISUALIZE': 'home-02',
    'GHG EMISSIONS': 'home-03',
    COUNTRIES: 'home-04',
    COMMITMENTS: 'home-05',
    SECTORS: 'home-06',
    PATHWAYS: 'home-07'
  }[route]);

export default { getDataTourByRoute };
