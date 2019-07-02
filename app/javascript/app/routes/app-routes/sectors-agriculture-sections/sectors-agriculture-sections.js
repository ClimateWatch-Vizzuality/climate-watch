import DriversOfEmissions from 'components/sectors-agriculture/drivers-of-emissions';
import CountriesContext from 'components/sectors-agriculture/countries-context';
import CountriesActions from 'components/sectors-agriculture/countries-actions';
import ResourcesForAction from 'components/sectors-agriculture/resources-for-action';

export default [
  {
    hash: 'drivers-of-emissions',
    label: 'Drivers of Emissions',
    anchor: true,
    component: DriversOfEmissions
  },
  {
    hash: 'understand-countries-contexts',
    label: 'Understand Country Context',
    anchor: true,
    component: CountriesContext
  },
  {
    hash: 'coutries-actions-in-their-ndcs',
    label: 'Countries’ Actions in their NDCs',
    anchor: true,
    component: CountriesActions
  },
  {
    hash: 'resources-for-action',
    label: 'Resources for Action',
    anchor: true,
    component: ResourcesForAction
  }
];
