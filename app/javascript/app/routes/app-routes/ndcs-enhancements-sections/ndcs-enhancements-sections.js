import NDCSEnhancementsViz from 'components/ndcs/ndcs-enhancements-viz';
import NDCSEnhancementsLegacyViz from 'components/ndcs/ndcs-enhancements-legacy-viz';
import NDCSEnhancementsTable from 'components/ndcs/ndcs-enhancements-table';

const FEATURE_NDC_ENHANCEMENTS =
  process.env.FEATURE_NDC_ENHANCEMENTS === 'true';

export default [
  {
    hash: 'map',
    anchor: true,
    label: 'Map',
    component: FEATURE_NDC_ENHANCEMENTS
      ? NDCSEnhancementsViz
      : NDCSEnhancementsLegacyViz
  },
  {
    hash: 'table',
    anchor: true,
    label: 'Table',
    component: NDCSEnhancementsTable
  }
];
