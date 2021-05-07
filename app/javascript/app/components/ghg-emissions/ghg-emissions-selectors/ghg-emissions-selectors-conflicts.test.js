import { getIncompatibleSectorConflicts } from './ghg-emissions-selectors-conflicts';

describe('getIncompatibleSectorConflicts', () => {
  it('Returns emtpy array if the selected region is not World', () => {
    const sectorsSelected = [];
    const regionsSelected = [{ iso: 'OTHER' }];
    expect(
      getIncompatibleSectorConflicts(sectorsSelected, regionsSelected)
    ).toStrictEqual([]);
  });
  it('Adds a conflict if the region is World and incompatible sectors are selected', () => {
    const sectorsSelected = [{ label: 'Bunker Fuels' }, { label: 'Energy' }];
    const regionsSelected = [{ iso: 'WORLD' }];
    expect(
      getIncompatibleSectorConflicts(sectorsSelected, regionsSelected)
    ).toStrictEqual([
      'Bunker Fuels and Energy sectors are not compatible with World region selected'
    ]);
  });
});
