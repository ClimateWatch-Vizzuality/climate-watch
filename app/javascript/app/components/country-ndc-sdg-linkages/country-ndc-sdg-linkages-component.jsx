import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import SDGCard from 'components/sdg-card';
import ReactTooltip from 'react-tooltip';
import NoContent from 'components/no-content';
import Dropdown from 'components/dropdown';

import styles from './country-ndc-sdg-linkages-styles.scss';

class CountrySDGLinkages extends PureComponent {
  render() {
    const {
      sdgs,
      activeSector,
      sectorOptions,
      handleSectorChange
    } = this.props;
    return (
      <div>
        <h3 className={styles.title}>NDC-SDG Linkages</h3>
        <div className={styles.sdgs}>
          {!isEmpty(sdgs) &&
            Object.keys(sdgs).map(sdg => (
              <div key={sdgs[sdg].title} className={styles.card}>
                <SDGCard sdgIndex={sdg} sdgData={sdgs[sdg]} indicators />
                <ReactTooltip />
              </div>
            ))}
          {isEmpty(sdgs) && <NoContent message="No SDG data available" />}
        </div>
        <ReactTooltip />
        <div className={styles.sectorSelector}>
          <Dropdown
            label="Sector"
            placeholder="Choose a sector"
            options={sectorOptions}
            onChange={handleSectorChange}
            value={activeSector}
          />
        </div>
      </div>
    );
  }
}

CountrySDGLinkages.propTypes = {
  sdgs: Proptypes.object,
  sectorOptions: Proptypes.array,
  handleSectorChange: Proptypes.func,
  activeSector: Proptypes.object
};

export default CountrySDGLinkages;
